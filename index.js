const express = require("express");
const routes = require("./routes/routes.js");

const app = express();
const port = 4000;

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(globalMiddleware);
app.use(routes);

// Global Error Handler
app.use((req, res, next) => {
  // res.status(404).send("Page Not Found");
  const error = new Error(`<h1>Page Not Found</h1>`);
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  console.log("Error", error);
  if (error.status) {
    res.status(error.status).send(`<h1>${error.message}</h1>`);
  }

  res.status(500).send({
    message: "Internal Server Error",
  });
});

function globalMiddleware(req, res, next) {
  console.log("Global middleware executed");
  console.log(`Request Method: ${req.method}`);
  console.log(`Request URL: ${req.url}`);

  console.log(req.query);
  // You can add more logic here if needed
  if (req.query.bad) {
    return res.status(400).send("Bad Request");
  }

  next();
}

function localMiddleware(req, res, next) {
  console.log("Local middleware executed for this route");
  console.log(`Request Method: ${req.method}`);
  console.log(`Request URL: ${req.url}`);
  // You can add more logic here if needed
  if (req.query.error) {
    return res.status(500).send("Internal Server Error");
  }

  next();
}

// function handler(req, res, next) {
//   // read request object
//   // process request
//   // response back the result
// }

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
