module.exports = (_, res) => {

  fetch(
    "https://api2.shahid.net/proxy/v2.1/playout/new/drm?request=%7B%22assetId%22%3A%20830217%7D",
    {
      headers: {
        browser_name: "CHROME",
        browser_version: 113,
        shahid_os: "WINDOWS"
      }
    }
  ).then((res) => res.json()).then((drm) => res.status(307).setHeader("location", drm.signature).end());

}