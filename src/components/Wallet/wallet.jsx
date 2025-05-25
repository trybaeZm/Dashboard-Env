"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./WalletPage.css";
import { getWithdrawalsByBusinessId, getWalletBalance } from "../../services/api/apiWallet";
import { getOrdersByBusinessId } from "../../services/api/apiOrder";

const businessId = "123e4567-e89b-12d3-a456-426614174005";

const WalletPage = () => {
  const [activeTab, setActiveTab] = useState("transactionHistory");
  const [withdrawals, setWithdrawals] = useState([]);
  const [orders, setOrders] = useState([]);
  const router = useRouter();
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (businessId) {
      getWalletBalance(businessId).then(setBalance);
    }
  }, [businessId]);

  useEffect(() => {
    async function fetchData() {
      const withdrawalData = await getWithdrawalsByBusinessId(businessId);
      const orderData = await getOrdersByBusinessId(businessId);
      if (withdrawalData) setWithdrawals(withdrawalData);
      if (orderData) setOrders(orderData);
    }

    fetchData();
  }, []);

  const openTab = (tab) => setActiveTab(tab);
  const handleOpenWithdraw = () => router.push("/withdraw");

  return (
    <div className="wallet-container pt-20">
      {/* Header */}
      <div className="wallet-header">
        <div className="wallet-info">
          <div className="wallet-label">Available Balance</div>
          <div className="wallet-balance">{balance !== null ? `ZMW ${balance.toFixed(2)}` : "Loading..."}</div>
        </div>
        <div className="action-buttons">
          <button className="btn btn-success" onClick={handleOpenWithdraw}>Request Withdrawal</button>
          {/* <button className="btn btn-outlined">Get Payment Link</button> */}
          <button className="btn btn-outlined" onClick={() => location.reload()}>Refresh</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <div className={`tab ${activeTab === "transactionHistory" ? "active" : ""}`} onClick={() => openTab("transactionHistory")}>Transaction History</div>
        <div className={`tab ${activeTab === "withdrawHistory" ? "active" : ""}`} onClick={() => openTab("withdrawHistory")}>Withdrawal History</div>
      </div>

      {/* Transaction History */}
      <div className={`tab-content ${activeTab === "transactionHistory" ? "active" : ""}`}>
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
              {orders.map((order, i) => (
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
      <div className={`tab-content ${activeTab === "withdrawHistory" ? "active" : ""}`}>
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
              {withdrawals.map((w, i) => (
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
    </div>
  );
};

export default WalletPage;
