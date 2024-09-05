import React from "react";
import PlanInfo from "../PlanInfo";

const PlansPage = () => {
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
        />
      </div>
    </div>
  );
};

export default PlansPage;
