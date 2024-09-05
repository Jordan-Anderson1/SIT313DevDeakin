import React, { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`signed up to newsletter with email: ${email}`);

    //post
    try {
      const response = await fetch("http://localhost:3000/", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      });

      if (response.ok) {
        console.log("Subscription successful");
        setEmail("");
        setSubscribed(true);
      } else {
        const errorText = await response.text();
        console.error("Subscription failed:", errorText);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="bg-emerald-900 p-4">
      {/* medium and above screens */}
      <div className="hidden md:inline">
        <form
          onSubmit={handleSubmit}
          className="align-center flex justify-center"
          action="/"
          method="post"
        >
          <label className="text-5xl text-white" htmlFor="email">
            Sign Up For Our Daily Insider
          </label>
          <input
            className="mx-6 flex-1 rounded-lg p-2 text-2xl"
            type="email"
            placeholder={`${
              subscribed ? "Thanks for subscribing!" : "Enter your email"
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={subscribed}
          />
          <button
            className="ml-auto w-[200px] rounded-lg bg-emerald-600 text-3xl text-white"
            type="submit"
            disabled={subscribed}
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* mobile screens up to medium */}
      <div className="md:hidden">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2"
          action="/"
          method="post"
        >
          <label className="text-center text-3xl text-white" htmlFor="email">
            Sign Up For Our Daily Insider!
          </label>
          <input
            className="flex-1 rounded-lg p-2 text-2xl"
            type="email"
            placeholder={`${
              subscribed ? "Thanks for subscribing!" : "Enter your email"
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={subscribed}
          />
          <button
            className="rounded-lg bg-emerald-600 p-2 text-2xl text-white"
            type="submit"
            disabled={subscribed}
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
