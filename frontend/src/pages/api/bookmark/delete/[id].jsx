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

  if (req.method === "DELETE") {
    try {
      const { id } = req.query;

      const response = await axios.delete(
        `${process.env.API_URL}/api/bookmark/${id}/delete/`,

        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      const { message } = response.data;

      return res.status(200).json({
        message,
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
