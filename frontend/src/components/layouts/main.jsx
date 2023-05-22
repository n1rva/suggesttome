import React from "react";
import Navbar from "../navbar";
import Recommenderbar from "../recommenderbar";
import Head from "next/head";

function Main({ children, title = "Suggest Me" }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <Recommenderbar />
      <main className="container mx-auto p-4 min-h-screen max-w-6xl lg:mt-36">
        <div className="container bg-gray/10 rounded-3xl px-3 py-6 min-h-[500px] mx-auto md:px-20 lg:px-40 md:max-w-2xl lg:max-w-5xl">
          {children}
        </div>
      </main>
    </>
  );
}

export default Main;
