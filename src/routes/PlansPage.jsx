import React from "react";
import PlanInfo from "../PlanInfo";
import getStripe from "../getStripe";

const PlansPage = () => {
  async function handleCheckout() {
    const stripe = await getStripe();
    if (stripe) {
      const { error } = await stripe.redirectToCheckout({
        lineItems: [
          {
            price: "price_1Q0FLB07oXviHGsCZ0o7gr4m",
            quantity: 1,
          },
        ],
        mode: "payment",
        successUrl: `http://localhost:5173/success`,
        cancelUrl: `http://localhost:3000/cancel`,
        customerEmail: "customer@email.com",
      });
      console.warn(error.message);
    }
  }

  return (
    <div className="p-2">
      <h1 className="my-4 text-center text-4xl">DEV@Deakin Plans</h1>
      <div className="flex flex-col justify-evenly gap-8 p-4 md:grid md:min-h-[300px] md:grid-cols-2 md:p-12">
        <PlanInfo
          title="Free"
          price="$0"
          features={["standard access", "forums", "articles and questions"]}
          colour="border-2 border-emerald-900 text-xl"
        />

        <PlanInfo
          title="Premium"
          price="$12/mo"
          features={[
            "premium access",
            "personalised study plans",
            "offline access",
          ]}
          colour="bg-emerald-900 text-white text-xl"
          premium="true"
          handleCheckout={handleCheckout}
        />
      </div>
    </div>
  );
};

export default PlansPage;
