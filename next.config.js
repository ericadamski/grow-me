const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  env: {
    BASE_URL:
      process.env.NODE_ENV === "development" ? "http://localhost:3000" : "",
  },
  target: "serverless",
});
