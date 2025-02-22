'use client'
import React from "react";
import Script from "next/script";

const PaymentButton = ({ amount }: { amount: number }) => {
  const handlePayment = async () => {
    try {
      // Call the API to create an order
      const response = await fetch("/api/orders/createrazor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      const order = await response.json();

      // Load Razorpay script dynamically
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: process.env.NEXT_PUBLIC_PAYMENT_PUBLIC, // Use your Razorpay key ID
          amount: order.order.amount*100,
          currency: order.order.currency,
          name: "Your Company Name",
          description: "Test Transaction",
          image: "https://example.com/your_logo.png",
          order_id: order.order.id,
          callback_url: 'user/orders',
          handler: function (response: any) {
            alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          },
          prefill: {
            name: "John Doe",
            email: "john.doe@example.com",
            contact: "9999999999",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      };
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <button onClick={handlePayment}>Pay Now</button>
    </>
  );
};

export default PaymentButton;