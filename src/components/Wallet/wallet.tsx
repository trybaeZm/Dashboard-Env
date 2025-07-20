"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./WalletPage.css";
import { getWithdrawalsByBusinessId, getWalletBalance, Withdrawal } from "../../services/api/apiWallet";
import { getOrdersByBusinessId } from "../../services/api/apiOrder";
import { getOrgData } from "@/lib/createCookie";
import { BusinessType } from "@/types/businesses";
import WithdrawForm from "./withdraw";


const WalletPage = () => {
  const [activeTab, setActiveTab] = useState<any>("transactionHistory");
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const router = useRouter();
  const [balance, setBalance] = useState<number>(0);
  const [withdrawalsState, setWithdrawalsState] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const businessData: BusinessType | null | undefined = getOrgData() // Replace with actual business ID


  const fetchData = React.useCallback(async () => {
    setLoading(true)
    try {
      const withdrawalData = await getWithdrawalsByBusinessId(businessData?.id);
      console.log(withdrawalData)
      if (withdrawalData?.withdrawData) setWithdrawals(withdrawalData.withdrawData);
      if (withdrawalData?.balance) setBalance(withdrawalData.balance)

    } catch (err) {
      setLoading(false)
      console.log(err)
    } finally {
      setLoading(false)
    }
  }, [businessData?.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  const openTab = (tab: any) => setActiveTab(tab);
  const handleOpenWithdraw = (value: boolean) => {
    setWithdrawalsState(value)
  }

  return (
    <>
      {
        withdrawalsState ?
          <WithdrawForm balance={balance} fetchData={fetchData} setWithdrawalsState={handleOpenWithdraw} />
          :
          <></>
      }
      <div className=" items-center flex justify-center p-3 py-20 ">
        <div className=""></div>
        <div className="md:w-1/2 lg:w-3/4 rounded-md p-[30px] shadow-md dark:bg-gray-700 bg-gray-200">
          {/* Header */}
          <div className="flex flex-wrap gap-5 justify-between items-center">
            <div className="wallet-info">
              <div className="wallet-label  dark:text-white">Available Balance</div>
              <div className="wallet-balance">{!loading ? `ZMW ${balance ? balance?.toFixed(2) : 0.00}` : "Loading..."}</div>
            </div>
            <div className="action-buttons">
              <button className="btn btn-success" onClick={() => handleOpenWithdraw(true)}>Request Withdrawal</button>
              {/* <button className="btn btn-outlined">Get Payment Link</button> */}
              <button className="btn btn-outlined" onClick={() => fetchData()}>Refresh</button>
            </div>
          </div>
          {/* Tabs */}
          <div className="tabs">
            <div className={`py-5 dark:text-white ${activeTab === "withdrawHistory" ? "active" : ""}`} onClick={() => openTab("withdrawHistory")}>Withdrawal History</div>
          </div>

          {
            loading ?
              <>
                loading...
              </>
              :
              <div>
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Amount</th>
                        <th>Method</th>
                        <th>Account Details</th>
                        <th>Request Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {withdrawals?.map((w, key) => (
                        <tr key={key}>
                          <td>ZMW {w.amount.toFixed(2)}</td>
                          <td>{w.method}</td>
                          <td>{w.account_details}</td>
                          <td>
                            {w.requested_at
                              ? new Date(w.requested_at).toISOString().slice(0, 10)
                              : ''}
                          </td>
                          <td>
                            <span className={`status-badge status-${w.status?.toLowerCase()}`}>
                              {w.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

          }

        </div>
        <div className=""></div>
      </div>
    </>
  );
};

export default WalletPage;
