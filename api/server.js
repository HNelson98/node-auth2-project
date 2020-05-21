const express = require("express");
const authRouter = require("../auth/router.js");
const userRouter = require("../users/users-router")

const server = express();

server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
    res.json({ api: "up" });
  });
  
  module.exports = server;