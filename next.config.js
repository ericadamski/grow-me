const withOffline = require("next-offline");
const withCSS = require("@zeit/next-css");

module.exports = withOffline(
  withCSS({
    transformManifest: manifest => ["/"].concat(manifest),
    env: {
      CLIENT_ID: `${process.env.GOOGLE_CLIENT_ID}`,
    },
    target: "serverless",
    workboxOpts: {
      swDest: "static/service-worker.js",
      runtimeCaching: [
        {
          urlPattern: /^https?.*/,
          handler: "NetworkFirst",
          options: {
            cacheName: "https-calls",
            networkTimeoutSeconds: 15,
            expiration: {
              maxEntries: 150,
              maxAgeSeconds: 24 * 60 * 60, // 1 day
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
  }),
);
