import axios from "axios";
import cookie from "cookie";

export default async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie || "");

  const access = cookies.access || false;

  if (!access) {
    return res.status(401).json({
      message: "You must login to get bookmarks.",
    });
  }

  if (req.method === "GET") {
    try {
      const response = await axios.get(
        `${process.env.API_URL}/api/bookmark/books/`,
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      const bookmarkItems = response.data;

      return res.status(200).json({
        data: bookmarkItems.data,
        message: bookmarkItems.message,
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
