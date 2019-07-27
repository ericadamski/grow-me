const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  env: {
    BASE_URL:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://grow-me.now.sh",
    CLIENT_ID: `${process.env.GOOGLE_CLIENT_ID}`
  },
  target: "serverless",
});
