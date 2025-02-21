'use client'
import React from "react";
import PaymentButton from "@/components/PaymentButton";

const PaymentPage = () => {
  return (
    <div>
      <h1>Payment Page</h1>
      <PaymentButton amount={1000} /> {/* Amount in INR */}
    </div>
  );
};

export default PaymentPage;