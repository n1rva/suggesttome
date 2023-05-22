import Main from "@app/components/layouts/main";
import Suggesions from "@app/components/suggestions";
import RecommenderContext from "@app/context/RecommenderContext";
import axios from "axios";
import cookie from "cookie";
import { useContext, useEffect, useState } from "react";

function Bookmarks({ bookmarkItems }) {
  const [items, setItems] = useState([]);
  const { recommenderType } = useContext(RecommenderContext);

  useEffect(() => {
    bookmarkItems.map((i) => {
      i[recommenderType] && setItems(i[recommenderType]);
    });
  }, [recommenderType]);

  return (
    <Main title="Bookmarks | Suggest Me">
      <div className="flex flex-col">
        {items.length
          ? items.map((item) => {
              const { id, image, explanation, title } = item;
              return (
                <Suggesions
                  key={id}
                  id={id}
                  title={title}
                  img={image}
                  text={explanation}
                />
              );
            })
          : ""}
      </div>
    </Main>
  );
}

export async function getServerSideProps({ req }) {
  const cookies = cookie.parse(req.headers.cookie || "");

  const access = cookies.access || false;

  if (!access) {
    return res.status(401).json({
      message: "You must login to see bookmarks.",
    });
  }

  const bookmarkTypes = ["books", "musics", "movies"];
  const bookmarkItems = [];

  for (let i = 0; i < bookmarkTypes.length; i++) {
    try {
      const response = await axios.get(
        `${process.env.API_URL}/api/bookmark/${bookmarkTypes[i]}/`,
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
      bookmarkItems.push(response.data);
    } catch (error) {}
  }

  return {
    props: {
      bookmarkItems,
    },
  };
}

export default Bookmarks;
