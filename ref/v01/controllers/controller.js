const fs = require("fs");
const path = require("path");
exports.homeController = (req, res) => {
  //   console.log("Request object:", req.url);
  //   console.log("Request method:", req.originalUrl);
  console.log("Root endpoint accessed");
  const rootPath = path.join(__dirname, "../pages/index.html");
  fs.readFile(rootPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.send(data);
  });
};

exports.aboutController = (req, res) => {
  console.log("About page accessed");
  const aboutPath = path.join(__dirname, "../pages/about.html");
  fs.readFile(aboutPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.send(data);
  });
};
