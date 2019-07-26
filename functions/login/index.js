// #region imports
const { json } = require("micro");
const querystring = require("querystring");
const { google } = require("googleapis");
const uuid = require("uuid");
const redirect = require("micro-redirect");
const { MongoClient: Mongo } = require("mongodb");
// #endregion imports

const { OAuth2 } = google.auth;
const plus = google.plus("v1");

function getToken(client, code) {
  return new Promise((resolve, reject) => {
    client.getToken(code, (err, tokens) => {
      if (err) {
        return reject(err);
      }

      client.setCredentials(tokens);

      resolve(tokens);
    });
  });
}

const client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI,
);

module.exports = async (req, res) => {
  const { code } = await json(req);

  const tokens = await getToken(client, code);

  if (!tokens.error) {
    const { access_token, refresh_token } = tokens;

    return res.end(
      JSON.stringify({
        access_token,
        refresh_token,
      }),
    );
  }

  throw new Error("Invalid Code");
};
