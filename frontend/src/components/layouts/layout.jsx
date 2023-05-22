import Head from "next/head";
import React from "react";
import Navbar from "../navbar";

function Layout({ children, title = "Suggest Me" }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      {children}
    </>
  );
}

export default Layout;
