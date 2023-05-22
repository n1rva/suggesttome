import gpt from "@app/utils/gpt";
import axios from "axios";

const searchMovie = async (object) => {
  let searchResults = [];
  let explanations = [];

  const movies = Object.keys(object).map((movie) => {
    const { title, explanation } = object[movie];
    explanations.push(explanation);
    return title;
  });

  for (let i = 0; i < movies.length; i++) {
    const searchMovie = await axios.get(
      `https://api.themoviedb.org/3/search/movie?language=en-US&page=1&include_adult=false`,
      {
        params: {
          query: movies[i],
          api_key: process.env.TMDB_API,
        },
      }
    );

    searchMovie.data.results.slice(0, 1).map((item) => {
      const { id, original_title, release_date, poster_path } = item;

      const releaseYear = release_date.split("-")[0];

      searchResults.push({
        id,
        name: original_title,
        info: releaseYear,
        image: `https://image.tmdb.org/t/p/w500${poster_path}`,
        text: explanations[i],
      });
    });
  }

  return searchResults;
};

export default async (req, res) => {
  if (req.method === "POST") {
    const sysPrompt =
      "Act like a movie expert. After every movie I write, you'll suggest three movies I might like and explain why i might like it and give it as JSON with 'movie1', 'movie2', 'movie3' keys and inside that keys 'title', 'year' and 'explanation' keys, answer with only one JSON. ";

    const { userPrompt } = req.body;

    try {
      const response = await gpt({ systemPrompt: sysPrompt, userPrompt });

      const object = JSON.parse(response);

      const movies = await searchMovie(object);

      return res.status(200).json({
        data: movies,
        message: "Successful",
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: error,
        success: false,
      });
    }
  }
};
