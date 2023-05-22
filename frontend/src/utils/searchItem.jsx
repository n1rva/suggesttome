import axios from "axios";

async function searchItem({ query, recommender }) {
  try {
    const response = await axios.post(`/api/search/${recommender}`, {
      query,
    });

    const { data, message, success } = response.data;

    const items = data.slice(0, 5);

    return { data: items, message, success };
  } catch (error) {
    return { message: error, success: false };
  }
}

export default searchItem;
