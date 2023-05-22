import RecommenderContext from "@app/context/RecommenderContext";
import Link from "next/link";
import React, { useContext, useLayoutEffect } from "react";

function Recommenderbar() {
  const { setRecommendedItems, setRecommenderType } =
    useContext(RecommenderContext);

  useLayoutEffect(() => {
    let marker = document.querySelector(".marker");
    let items = document.querySelectorAll(".item");

    const indicator = (e) => {
      marker.style.left = e.offsetLeft + "px";
      marker.style.width = e.offsetWidth + "px";
    };

    indicator(items[1]);

    items.forEach((item) => {
      item.addEventListener("click", (e) => {
        setRecommendedItems([]);
        setRecommenderType(e.target.innerHTML);
        indicator(e.target);
      });
    });
  }, []);
  return (
    <div className="relative flex items-center justify-center h-12 mt-4">
      <div className="relative flex items-center rounded-3xl text-gray bg-gray/10">
        <div className="absolute left-0 h-full w-0 bg-lightBlue rounded-3xl marker" />
        <button className="item font-medium capitalize rounded-3xl px-8 py-1 lg:px-14 lg:py-2 z-10">
          book
        </button>
        <button className="item font-medium capitalize rounded-3xl px-8 py-1 lg:px-14 lg:py-2 lg:mx-16 z-10 ">
          movie
        </button>
        <button className="item font-medium capitalize rounded-3xl px-8 py-1 lg:px-14 lg:py-2 z-10">
          music
        </button>
      </div>
    </div>
  );
}

export default Recommenderbar;
