/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    API_URL: "http://127.0.0.1:8000",
  },
  images: {
    domains: ["image.tmdb.org", "i.scdn.co", "books.google.com"],
  },
};

module.exports = nextConfig;
