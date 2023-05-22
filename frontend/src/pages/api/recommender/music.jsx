import gpt from "@app/utils/gpt";
import axios from "axios";
import cookie from "cookie";

const searchMusic = async (object, accessToken) => {
  let searchResults = [];
  let explanations = [];

  const songs = Object.keys(object).map((song) => {
    const { title, artist, explanation } = object[song];
    explanations.push(explanation);
    return title + " " + artist;
  });

  for (let i = 0; i < songs.length; i++) {
    const searchMusic = await axios.get(
      `https://api.spotify.com/v1/search?type=track&limit=1`,
      {
        params: {
          q: songs[i],
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    searchMusic.data.tracks.items.map((item) => {
      const { id, name, artists, album } = item;

      searchResults.push({
        id,
        name,
        info: artists[0].name,
        image: album.images[0].url,
        text: explanations[i],
      });
    });
  }

  return searchResults;
};

export default async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie || "");

  const accessToken = cookies.spotifyAccessToken || false;

  if (!accessToken) {
    return res.status(401).json({
      message: "Reload the page",
    });
  }

  if (req.method === "POST") {
    const sysPrompt =
      "Act like a music expert. After every music I write, you'll suggest three music I might like and explain why i might like it and give it as JSON with 'music1', 'music2', 'music3' keys and inside that keys 'artist', 'title' and 'explanation' keys, answer with only one JSON.";

    const { userPrompt } = req.body;

    try {
      const response = await gpt({ systemPrompt: sysPrompt, userPrompt });

      const object = JSON.parse(response);

      const songs = await searchMusic(object, accessToken);

      return res.status(200).json({
        data: songs,
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
