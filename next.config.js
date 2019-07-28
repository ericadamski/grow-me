const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  env: {
    CLIENT_ID: `${process.env.GOOGLE_CLIENT_ID}`
  },
  target: "serverless",
});
