"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./WalletPage.css";
import { getWithdrawalsByBusinessId, getWalletBalance } from "../../services/api/apiWallet";
import { getOrdersByBusinessId } from "../../services/api/apiOrder";
import { getOrgData } from "@/lib/createCookie";
import { BusinessType } from "@/types/businesses";


const WalletPage = () => {
  const [activeTab, setActiveTab] = useState<any>("transactionHistory");
  const [withdrawals, setWithdrawals] = useState<any>([]);
  const [orders, setOrders] = useState<any>([]);
  const router = useRouter();
  const [balance, setBalance] = useState<any>(null);
  const [loading, setLoading] = useState(false)
  const businessData: BusinessType | null | undefined = getOrgData() // Replace with actual business ID


  const getBusinessData = React.useCallback(() => {
    setLoading(true)
    getWalletBalance(businessData?.id)
      .then((res) => setBalance(res))
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      });
  }, [businessData?.id]);

  useEffect(() => {
    getBusinessData()

    async function fetchData() {
      const withdrawalData = await getWithdrawalsByBusinessId(businessData?.id);
      const orderData = await getOrdersByBusinessId(businessData?.id);
      if (withdrawalData) setWithdrawals(withdrawalData);
      if (orderData) setOrders(orderData);
    }

    fetchData();
  }, [businessData?.id, getBusinessData]);


  const openTab = (tab: any) => setActiveTab(tab);
  const handleOpenWithdraw = () => router.push("/withdraw");

  return (
    <>
      <div className="grid p-20 grid-cols-12">
        <div className="col-span-2"></div>
        <div className=" col-span-8 rounded-md p-[30px] bg-gray-700">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="wallet-info">
              <div className="wallet-label text-white">Available Balance</div>
              <div className="wallet-balance">{!loading ? `ZMW ${balance ? balance?.toFixed(2) : 0.00}` : "Loading..."}</div>
            </div>
            <div className="action-buttons">
              <button className="btn btn-success" onClick={handleOpenWithdraw}>Request Withdrawal</button>
              {/* <button className="btn btn-outlined">Get Payment Link</button> */}
              <button className="btn btn-outlined" onClick={() => getBusinessData()}>Refresh</button>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs">
            <div className={`tab  ${activeTab === "transactionHistory" ? "active" : " text-white"}`} onClick={() => openTab("transactionHistory")}>Transaction History</div>
            <div className={`tab text-white ${activeTab === "withdrawHistory" ? "active" : ""}`} onClick={() => openTab("withdrawHistory")}>Withdrawal History</div>
          </div>

          {
            !loading ?
              <>
                {/* Transaction History */}
                <div className={`tab-content text-white ${activeTab === "transactionHistory" ? "active" : ""}`}>
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Customer</th>
                          <th>Amount</th>
                          <th>Product/Service</th>
                          <th>Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order: any, i: any) => (
                          <tr key={i}>
                            <td>{order.customers?.name || "Unknown"}</td>
                            <td>ZMW {order.total_amount.toFixed(2)}</td>
                            <td>Order</td>
                            <td>{new Date(order.created_at).toLocaleDateString()}</td>
                            <td>
                              <span className={`status-badge status-${order.order_status?.toLowerCase()}`}>
                                {order.order_status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Withdrawal History */}
                <div className={`tab-content text-white ${activeTab === "withdrawHistory" ? "active" : ""}`}>
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
                        {withdrawals.map((w: any, i: any) => (
                          <tr key={i}>
                            <td>ZMW {parseFloat(w.amount).toFixed(2)}</td>
                            <td>{w.method === "mobile" ? "Mobile Money" : "Bank Transfer"}</td>
                            <td>{w.account_details}</td>
                            <td>{new Date(w.requested_at).toLocaleDateString()}</td>
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
              </>
              :
              <>
              </>
          }
        </div>
        <div className="col-span-2"></div>
      </div>
    </>
  );
};

export default WalletPage;
