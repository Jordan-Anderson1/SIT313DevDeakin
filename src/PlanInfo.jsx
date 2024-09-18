import React from "react";
import { useNavigate } from "react-router-dom";

const PlanInfo = ({
  title,
  price,
  features,
  colour,
  premium,
  handleCheckout,
}) => {
  const navigate = useNavigate();
  return (
    <div className={`rounded-xl border p-4 ${colour}`}>
      <h1 className="text-center text-2xl font-semibold underline">{title}</h1>
      <h1>{price}</h1>
      <ul className="ml-4 list-disc">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      {premium && (
        <button
          onClick={handleCheckout}
          className="mt-8 w-full rounded-xl border border-white p-4 text-center font-semibold"
        >
          Upgrade to Premium
        </button>
      )}
    </div>
  );
};

export default PlanInfo;
