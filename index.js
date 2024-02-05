require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const server = express();

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

server.use(cors());

server.use(express.json());

server.use(morgan("combined"));

server.use(express.static(process.env.BUILD_DIR));

server.use("/products", productRouter);
server.use("/users", userRouter);
server.use("/task", taskRouter);

server.get("/query", (req, res) => {
  console.log(req.query);
  const name = req.query.name;
  const age = req.query.age;
  const subject = req.query.subject;
  console.log(
    `${name} is ${age} years old and completed studies in ${subject}`
  );
  res.send(req.query);
});

server.get("/dParams/:name/:age/:subject", (req, res) => {
  const name = req.params.name;
  const age = req.params.age;
  const subject = req.params.subject;

  const result = `${name} is ${age} years old and completed studies in ${subject}`;

  console.log(result);
  res.send(req.params);
});

const auth = (req, res, next) => {
  if (req.body.password == "123") {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

server.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

server.listen(process.env.PORT, () => {
  console.log(`server started at http://localhost:${process.env.PORT}`);
});
