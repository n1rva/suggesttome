import axios from "axios";

export default async (req, res) => {
  if (req.method === "POST") {
    const { query } = req.body;

    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes`,
        {
          params: {
            q: query,
          },
        }
      );

      const data = response.data.items.map((item) => {
        const { id, volumeInfo } = item;

        const author = volumeInfo.authors ? volumeInfo.authors[0] : "Unknown";

        return {
          id,
          name: volumeInfo.title,
          info: author,
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
