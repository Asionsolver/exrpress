const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();
const pollController = require("./controllers/pollController");
app.use(morgan("dev"));
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // res.json("Hello! programmer. I am a root route.");
  res.render("home");
});

app.get("/create", pollController.createPollGetController);
app.get("/polls", pollController.getAllPolls);
app.post("/create", pollController.createPollPostController);
app.get("/polls/:id", pollController.viewPollGetController);
app.post("/polls/:id", pollController.viewPollPostController);

mongoose
  .connect("mongodb://localhost:27017/poll")
  .then(() => {
    app.listen(8000, () => {
      console.log("Application is ready to serve on port 8000");
    });
  })
  .catch((e) => {
    console.log(e);
  });
