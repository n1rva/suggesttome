import Main from "@app/components/layouts/main";
import Placeholder from "@app/components/placeholder";
import Suggesions from "@app/components/suggestions";
import RecommenderContext from "@app/context/RecommenderContext";
import { isAuthenticatedUser } from "@app/utils/isAuthenticated";
import searchItem from "@app/utils/searchItem";
import spotifyAuth from "@app/utils/spotifyAuth";
import { toastProps } from "@app/utils/toastProps";

import axios from "axios";

import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [searchIsLoading, setSearchIsLoading] = useState(false); //arama loading'i

  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");

  const [resultLoading, setResultLoading] = useState(false);

  const {
    placeholder,
    recommenderType,
    recommendedItems,
    searchTerm,
    debouncedSearchTerm,
    setSearchTerm,
    setRecommendedItems,
  } = useContext(RecommenderContext);

  useEffect(() => {
    spotifyAuth();
  }, []);

  const handleSearch = async (query) => {
    const results = await searchItem({
      query,
      recommender: recommenderType,
    });
    console.log(results);

    if (results.success) setSearchResults(results.data);
    else
      toast("Search Failed", {
        type: "error",
        isLoading: false,
        ...toastProps,
      });
  };

  const handleChange = (e) => {
    setSearchIsLoading(true);
    const query = e.target.value;
    setSearchTerm(query);
  };

  const textStyle = (name, info) => {
    return recommenderType == "movie"
      ? `${name} (${info})`
      : `${name} - ${info}`;
  };

  const handleSelectedItem = async (item) => {
    const { name, info } = item;
    setRecommendedItems([]);
    setResultLoading(true);

    setSelectedItem(textStyle(name, info));
    setSearchTerm(textStyle(name, info));
    setSearchResults([]);

    const response = await axios.post(`/api/recommender/${recommenderType}`, {
      userPrompt: textStyle(name, info),
    });

    const { data, success } = response.data;

    if (response) {
      setResultLoading(false);

      success
        ? setRecommendedItems(data)
        : toast("An Error Occured", {
            type: "error",
            isLoading: false,
            ...toastProps,
          });
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm.length > 2 && searchTerm !== selectedItem) {
      handleSearch(debouncedSearchTerm);
      setSearchIsLoading(false);
    } else {
      setSearchIsLoading(false);
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <Main>
      <div className="flex space-x-2 justify-center mb-8 md:mb-12">
        <div className="flex flex-col">
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            className="searchInput w-60 h-10 outline-none border border-lightBlue bg-gray/30 text-white px-2 rounded-xl md:w-96 md:text-lg"
            placeholder={placeholder}
          />
          <div className="absolute mt-10 z-20 bg-darkBlue text-white rounded-lg">
            {searchResults?.map((item) => {
              const { id, name, info } = item;
              return (
                <div
                  onClick={() => handleSelectedItem(item)}
                  key={id}
                  className="flex w-60 h-8 pt-1 border-sec md:w-96 md:h-fit hover:bg-lightBlue/30 hover:rounded-md  cursor-pointer"
                >
                  <h2 className="px-2 md:text-lg">{textStyle(name, info)}</h2>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        {resultLoading && !recommendedItems.length
          ? [1, 2, 3].map((i) => {
              return <Placeholder key={i} />;
            })
          : recommendedItems?.map((item) => {
              const { id, image, name, info, text } = item;
              return (
                <Suggesions
                  key={id}
                  title={textStyle(name, info)}
                  img={image}
                  text={text}
                />
              );
            })}
      </div>
    </Main>
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
    props: {},
  };
}
