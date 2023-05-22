import RecommenderContext from "@app/context/RecommenderContext";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { toastProps } from "@app/utils/toastProps";

function Suggesions({ id, img, title, text }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkID, setBookmarkID] = useState(null);

  const { saveToBookmarks, deleteBookmark, recommenderType } =
    useContext(RecommenderContext);

  const router = useRouter();
  const { route } = router;

  useEffect(() => {
    if (route === "/bookmarks") {
      setIsBookmarked(true);
    }
  }, []);

  const handleBookmark = async (e) => {
    if (isBookmarked) {
      setIsBookmarked(false);

      const response = await deleteBookmark(id || bookmarkID);

      return toast(response.message, {
        type: "success",
        isLoading: false,
        ...toastProps,
      });
    }

    const type =
      recommenderType.charAt(0).toUpperCase() + recommenderType.slice(1);

    const data = { image: img, title, explanation: text, category: type };

    const response = await saveToBookmarks(data);

    if (response?.success) {
      setIsBookmarked(true);

      setBookmarkID(response.data.id);

      toast(response.message, {
        type: "success",
        isLoading: false,
        ...toastProps,
      });
    } else if (response?.success === false) {
      toast("An error occurred while adding bookmark", {
        type: "error",
        isLoading: false,
        ...toastProps,
      });
    }
  };

  return (
    <div className="flex items-center space-x-3 my-8 md:space-x-5 md:my-12">
      <div className="self-start w-24 h-full md:w-36">
        <Image
          src={img}
          width={100}
          height={150}
          sizes="100vw"
          alt="image"
          className="h-full w-full"
        />
      </div>
      <div className="text-white w-fit">
        <h2 className="font-medium mb-3 leading-none">{title}</h2>
        <p className="leading-tight mr-4">{text}</p>
      </div>
      <button onClick={handleBookmark} className="cursor-pointer">
        {isBookmarked ? (
          <FaBookmark className="fill-lightBlue w-6 h-6" />
        ) : (
          <FaRegBookmark className="fill-lightBlue w-6 h-6" />
        )}
      </button>
    </div>
  );
}

export default Suggesions;
