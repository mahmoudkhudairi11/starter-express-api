const express = require("express");
const ShahidDRM = require("./routes/ShahidDRM.js");
const app = express();

app.use("/widevine-drm/shahid", ShahidDRM);

app.listen(5000 || process.env.PORT);