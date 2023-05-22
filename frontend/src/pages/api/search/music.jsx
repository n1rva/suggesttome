import axios from "axios";
import cookie from "cookie";

export default async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie || "");

  const accessToken = cookies.spotifyAccessToken || false;

  if (!accessToken) {
    return res.status(401).json({
      message: "Reload the page",
    });
  }

  if (req.method === "POST") {
    const { query } = req.body;

    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?type=track&limit=5`,
        {
          params: {
            q: query,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = response.data.tracks.items.map((item) => {
        const { id, name, artists } = item;
        return {
          id,
          name,
          info: artists[0].name,
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
