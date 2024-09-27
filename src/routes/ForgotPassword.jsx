import React, { useState } from "react";
import { resetPassword } from "../utils/firebase";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      await resetPassword(email);
      alert("Check your email for further instructions!");
    } catch (e) {
      alert(e.message);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex min-w-[500px] flex-col gap-2"
      >
        <label className="text-center" htmlFor="email">
          Email:
        </label>
        <input
          type="text"
          id="email"
          className="rounded-xl border border-emerald-900 p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="w-full rounded-xl bg-emerald-900 p-2 text-white">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
