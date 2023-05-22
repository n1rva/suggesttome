import axios from "axios";
import cookie from "cookie";

export default async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie || "");

  const access = cookies.access || false;

  if (!access) {
    return res.status(401).json({
      message: "You must login to add new bookmark.",
    });
  }

  if (req.method === "POST") {
    try {
      const data = req.body;

      const response = await axios.post(
        `${process.env.API_URL}/api/bookmark/new/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      const newBookmark = response.data;

      return res.status(200).json({
        data: newBookmark.data,
        message: newBookmark.message,
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
