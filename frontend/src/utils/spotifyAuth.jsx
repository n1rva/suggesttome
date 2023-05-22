import axios from "axios";

async function spotifyAuth() {
  const res = await axios.get("/api/auth/spotify");
  if (!res.data.success) return res.data.message;
}

export default spotifyAuth;
