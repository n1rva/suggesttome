import useDebounce from "@app/utils/useDebounce";
import axios from "axios";
import { useState, useEffect, createContext } from "react";

const RecommenderContext = createContext();

export const RecommenderProvider = ({ children }) => {
  const [recommenderType, setRecommenderType] = useState("movie");
  const [placeholder, setPlaceholder] = useState("Fight Club");

  const [searchTerm, setSearchTerm] = useState("");
  const [recommendedItems, setRecommendedItems] = useState([]);

  const [searchResults, setSearchResults] = useState([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 200);

  useEffect(() => {
    switch (recommenderType) {
      case "movie":
        setPlaceholder("Fight Club");
        break;
      case "book":
        setPlaceholder("The Hitchhiker's Guide to the Galaxy");
        break;
      case "music":
        setPlaceholder("Here She Comes Again");
        break;

      default:
        break;
    }
  }, [recommenderType]);

  const saveToBookmarks = async (data) => {
    const response = await axios.post("api/bookmark/new", data);

    return response.data;
  };
  const deleteBookmark = async (id) => {
    const response = await axios.delete(`api/bookmark/delete/${id}`);

    return response.data;
  };

  return (
    <RecommenderContext.Provider
      value={{
        recommenderType,
        placeholder,
        searchResults,
        recommendedItems,
        searchTerm,
        debouncedSearchTerm,
        setRecommenderType,
        setPlaceholder,
        setSearchResults,
        saveToBookmarks,
        deleteBookmark,
        setRecommendedItems,
        setSearchTerm,
      }}
    >
      {children}
    </RecommenderContext.Provider>
  );
};

export default RecommenderContext;
