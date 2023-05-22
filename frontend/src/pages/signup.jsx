import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";
import Layout from "@app/components/layouts/layout";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { loading, error, isAuthenticated, signup, clearErrors } =
    useContext(AuthContext);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }

    if (isAuthenticated && !loading) {
      router.push("/");
    }
  }, [isAuthenticated, error, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    signup({ email, password });
  };

  return (
    <Layout title="Sign Up">
      <main className="h-screen flex justify-center items-center">
        <form
          method="post"
          onSubmit={handleSubmit}
          className="w-full flex flex-col py-16 bg-gray/20 rounded-3xl max-w-sm md:max-w-md shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] shadow-black/10"
        >
          <div className="text-xl font-medium px-6 text-gray">Sign Up</div>
          <div className="px-6 py-12 flex flex-col space-y-6">
            <div className="relative">
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 p-3 pt-6 placeholder-transparent text-[#313030] bg-[#EAEAEA] border border-gray-200 rounded-md peer focus:outline-none focus:shadow-sm"
                placeholder="email"
                autoComplete="off"
              />
              <label
                htmlFor="email"
                className="absolute top-0 left-0 h-full px-3 py-3 text-sm text-[#858585] transition-all duration-100 ease-in-out origin-left transform scale-75 translate-x-1 -translate-y-3 opacity-75 pointer-events-none peer-placeholder-shown:opacity-100 peer-focus:opacity-75 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 peer-focus:translate-x-1"
              >
                Email
              </label>
            </div>
            <div className="relative">
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 p-3 pt-6 placeholder-transparent text-[#313030] bg-[#EAEAEA] border border-gray-200 rounded-md peer focus:outline-none focus:shadow-sm"
                placeholder="Password"
                autoComplete="off"
              />
              <label
                htmlFor="password"
                className="absolute top-0 left-0 h-full px-3 py-3 text-sm text-[#858585] transition-all duration-100 ease-in-out origin-left transform scale-75 translate-x-1 -translate-y-3 opacity-75 pointer-events-none peer-placeholder-shown:opacity-100 peer-focus:opacity-75 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 peer-focus:translate-x-1"
              >
                Password
              </label>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-6">
            <button
              type="submit"
              className="rounded-lg px-4 py-2 bg-white bg-opacity-80 hover:bg-opacity-70"
            >
              <span className="text-darkBlue font-medium">Sign Up</span>
            </button>
          </div>
        </form>
      </main>
    </Layout>
  );
};

export default Signup;
