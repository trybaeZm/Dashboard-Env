'use client'
import React, { useState, useEffect } from "react";
import { createWithdrawal, getWalletBalance } from "../../services/api/apiWallet"
import { useRouter } from "next/navigation";
import "./WithdrawForm.css";

const businessId = "123e4567-e89b-12d3-a456-426614174005";

const WithdrawForm = () => {
  const [form, setForm] = useState({
    amount: "",
    method: "",
    account_details: "",
    business_id: businessId
  });
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (businessId) {
      getWalletBalance(businessId).then(setBalance);
    }
  }, [businessId]);

  const validate = () => {
    const newErrors = {};
    const amount = parseFloat(form.amount);

    if (!form.amount || isNaN(amount) || amount <= 0) {
      newErrors.amount = "Please enter a positive amount";
    } else if (amount > balance) {
      newErrors.amount = `Amount cannot exceed your available balance of ZMW ${balance.toFixed(2)}`;
    }

    if (!form.method) {
      newErrors.method = "Please select a withdrawal method";
    }

    if (!form.account_details.trim()) {
      newErrors.account_details = "Please enter your account details";
    } else if (
      form.method === "mobile" &&
      !/^0[79][0-9]{8}$/.test(form.account_details.trim())
    ) {
      newErrors.account_details = "Please enter a valid Zambian mobile number (e.g., 097XXXXXXX)";
    } else if (
      form.method === "bank" &&
      form.account_details.trim().length < 5
    ) {
      newErrors.account_details = "Please enter complete bank account details";
    }

    console.log(newErrors)
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: ""
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const res = await createWithdrawal(form);
    setLoading(false);

    if (res) {
      console.log("Company Withdrawals:", res);
      router.push("/wallet")
    }

    setTimeout(() => {
      setSuccess(false);
      setForm({ amount: "", method: "", account_details: "" });
    }, 5000);
  };

  return (
    <div className="withdraw-container">
      <h1>Request Withdrawal</h1>

      <div className="form-header">
        <div className="available-balance">
          Available Balance: {balance !== null ? `ZMW ${balance.toFixed(2)}` : "Loading..."}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="amount">Amount (ZMW)</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            min="1"
            step="0.01"
            placeholder="Enter amount"
            className={errors.amount ? "error" : ""}
          />
          {errors.amount && <div className="error-message">{errors.amount}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="method">Withdrawal Method</label>
          <select
            name="method"
            value={form.method}
            onChange={handleChange}
            className={errors.method ? "error" : ""}
          >
            <option value="">Select a method</option>
            <option value="mobile">Mobile Money</option>
            <option value="bank">Bank Transfer</option>
          </select>
          {errors.method && <div className="error-message">{errors.method}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="account_details">
            {form.method === "mobile"
              ? "Mobile Money Number"
              : form.method === "bank"
                ? "Bank Account Details"
                : "Account Details"}
          </label>
          <input
            type="text"
            name="account_details"
            placeholder={
              form.method === "mobile"
                ? "e.g. 097XXXXXXX"
                : form.method === "bank"
                  ? "Account number and bank name"
                  : "Enter account details"
            }
            value={form.account_details}
            onChange={handleChange}
            className={errors.account_details ? "error" : ""}
          />
          {errors.account_details && (
            <div className="error-message">{errors.account_details}</div>
          )}
        </div>

        <button className="submit-btn" type="submit">{loading ? 'loading...' : 'Submit Withdrawal Request'}</button>
      </form>

      {success && (
        <div className="success-message">
          Your withdrawal request has been submitted successfully! TryBae will contact you shortly.
        </div>
      )}

      <div className="form-info">
        <p><strong>Note:</strong> After submitting your withdrawal request, the TryBae team will review it and contact you to confirm before processing.</p>
        <p>Processing time is typically 1-3 business days after confirmation.</p>
      </div>
    </div>
  );
};

export default WithdrawForm;
