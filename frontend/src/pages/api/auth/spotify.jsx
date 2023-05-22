import axios from "axios";
import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      const params = new URLSearchParams();
      params.append("grant_type", "client_credentials");
      params.append("client_id", process.env.SPOTIFY_CLIENT_ID);
      params.append("client_secret", process.env.SPOTIFY_CLIENT_SECRET);

      const response = await axios.post(
        `https://accounts.spotify.com/api/token`,
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const data = await response.data;

      if (data.access_token) {
        res.setHeader("Set-Cookie", [
          cookie.serialize("spotifyAccessToken", data.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60,
            sameSite: "Lax",
            path: "/",
          }),
        ]);

        return res.status(200).json({
          success: true,
        });
      } else {
        res.status(response.status).json({
          error: "Authentication failed",
          success: false,
        });
      }
    } catch (error) {
      return res.json({
        message: error,
        success: false,
      });
    }
  }
};
