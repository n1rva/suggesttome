import gpt from "@app/utils/gpt";
import axios from "axios";

const searchBook = async (object) => {
  let searchResults = [];
  let explanations = [];

  const books = Object.keys(object).map((book) => {
    const { title, author, explanation } = object[book];
    explanations.push(explanation);
    return title + author;
  });

  for (let i = 0; i < books.length; i++) {
    const searchBook = await axios.get(
      `https://www.googleapis.com/books/v1/volumes`,
      {
        params: {
          q: books[i],
        },
      }
    );

    searchBook.data.items.slice(0, 1).map((item) => {
      const { id, volumeInfo } = item;

      searchResults.push({
        id,
        name: volumeInfo.title,
        info: volumeInfo.authors[0],
        image: volumeInfo.imageLinks.thumbnail,
        text: explanations[i],
      });
    });
  }

  return searchResults;
};

export default async (req, res) => {
  if (req.method === "POST") {
    const sysPrompt =
      "Act like a book expert. After every book I write, you'll suggest three books I might like and explain why i might like it and give it as JSON with 'book1', 'book2', 'book3' keys and inside that keys 'title', 'author' and 'explanation' keys, answer with only one JSON.";

    const { userPrompt } = req.body;

    try {
      const response = await gpt({ systemPrompt: sysPrompt, userPrompt });

      const object = JSON.parse(response);

      const books = await searchBook(object);

      return res.status(200).json({
        data: books,
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
