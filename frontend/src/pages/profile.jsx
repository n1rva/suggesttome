import { useContext, useEffect, useState } from "react";

import AuthContext from "@app/context/AuthContext";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastProps } from "@app/utils/toastProps";

import Navbar from "@app/components/navbar";
import { isAuthenticatedUser } from "@app/utils/isAuthenticated";
import Layout from "@app/components/layouts/layout";

function UpdateUser({ access_token }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    updated,
    loading,
    error,
    user,
    clearErrors,
    updateProfile,
    setUpdated,
  } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }

    if (error) {
      toast.error(error);
      clearErrors();
    }

    if (updated) {
      setUpdated(false);
      toast("User Successfully Updated", {
        isLoading: false,
        type: "success",
        ...toastProps,
      });
    }
  }, [error, user, updated]);

  const handleSubmit = (e) => {
    e.preventDefault();

    updateProfile({ email, password }, access_token);
  };
  return (
    <Layout title="Profile | Suggest Me">
      <main className="h-screen flex justify-center items-center">
        <form
          method="post"
          onSubmit={handleSubmit}
          className="w-full flex flex-col py-16 bg-gray/20 rounded-3xl max-w-sm md:max-w-md shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] shadow-black/10"
        >
          <div className="text-xl font-medium px-6 text-gray">Update User</div>
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
              className="rounded-lg px-4 py-2 bg-lightBlue bg-opacity-80 hover:bg-opacity-70"
            >
              <span className="text-gray font-medium">Update</span>
            </button>
          </div>
        </form>
      </main>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  const access_token = req.cookies.access;

  const user = await isAuthenticatedUser(access_token);

  if (!user) {
    return {
      redirect: {
        destination: "/signin",
        parmanent: false,
      },
    };
  }

  return {
    props: { access_token },
  };
}

export default UpdateUser;
