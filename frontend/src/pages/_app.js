import Navbar from "@app/components/navbar";
import { AuthProvider } from "../context/AuthContext";
import { RecommenderProvider } from "@app/context/RecommenderContext";
import "@app/styles/globals.css";
import Head from "next/head";
import Recommenderbar from "@app/components/recommenderbar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <RecommenderProvider>
        <Head />
        <div className="bg-darkBlue">
          <Component {...pageProps} />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </RecommenderProvider>
    </AuthProvider>
  );
}
