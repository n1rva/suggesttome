import axios from "axios";

export default async (req, res) => {
  if (req.method === "POST") {
    const { query } = req.body;

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?language=en-US&page=1&include_adult=false`,
        {
          params: {
            query,
            api_key: process.env.TMDB_API,
          },
        }
      );

      const data = response.data.results.map((item) => {
        const { id, original_title, release_date } = item;

        const releaseYear = release_date.split("-")[0];

        return {
          id,
          name: original_title,
          info: releaseYear,
        };
      });
      return res.json({
        data,
        message: "Successful",
        success: true,
      });
    } catch (error) {
      return res.json({
        message: error,
        success: false,
      });
    }
  }
};
