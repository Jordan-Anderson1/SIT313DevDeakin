import React, { useRef, useEffect } from "react";

const PaymentPage = () => {
  const paypal = useRef();
  useEffect(() => {
    window.paypal.Buttons({}).render(paypal.current);
  }, []);
  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
};

export default PaymentPage;
