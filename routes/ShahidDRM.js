const https = require("https");

module.exports = (_, res) => {

  https.get(
    "https://api2.shahid.net/proxy/v2.1/playout/new/drm?request=%7B%22assetId%22%3A980214%7D",
    {
      headers: {
        browser_name: "CHROME",
        browser_version: 113,
        shahid_os: "WINDOWS",
        token: "eyJhbGciOiJIUzI1NiJ9.eyJjYWNoZSI6IlVzZXJfYzE4MDZhZDRiNzAzNDg0ZWE1MDJlZWM3ODc5Zjk3M2UiLCJ1aWQiOiJhcHIxU2hhaGlkRW5RWUpQTUsyTmxCb25xVnZqejJFV3QiLCJkaWQiOiJXZWIiLCJzdWJpZCI6ImMxODA2YWQ0YjcwMzQ4NGVhNTAyZWVjNzg3OWY5NzNlIiwic3ViIjoic2hhaGlkLXRva2VuLWVuY29kZSIsImlzcyI6InNoYWhpZC10b2tlbi1lbmNvZGUiLCJpYXQiOjE2ODU5MTc4ODksImV4cCI6MTcxNzU0MDI4OX0.4uc_coKEwQPQn8y0T3nOml0sg6PK5cQ2lpq9opK64FE"
      }
    },
    (drmResponse) => {
      let data = "";
      drmResponse.on("data", (chunk) => data += chunk.toString());
      drmResponse.on("close", () => {
        try {
          console.log(data);
          const drm = JSON.parse(data);
          if (!("signature" in drm)) throw null;
          res.status(307).setHeader("location", drm.signature).end();
        } catch (e) {
          res.status(503).end("Failed to Create License");
        }
      });
    }
  );

}