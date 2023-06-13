const https = require("https");

module.exports = (_, res) => {

  res.end("Hello");return;

  https.get(
    "https://api2.shahid.net/proxy/v2.1/playout/new/drm?request=%7B%22assetId%22%3A%20830217%7D",
    {
      headers: {
        browser_name: "CHROME",
        browser_version: 113,
        shahid_os: "WINDOWS"
      }
    },
    (drmResponse) => {
      let data = "";
      drmResponse.on("data", (chunk) => data += chunk.toString());
      drmResponse.on("close", () => {
        try {
          const drm = JSON.parse(data);
          if (!("signature" in drm)) throw null;
          res.status(307).setHeader("location", drm.signature).end();
        } catch (e) {
          res.status(503).end();
        }
      });
    }
  );

}