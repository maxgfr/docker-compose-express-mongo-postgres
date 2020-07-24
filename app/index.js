const express = require("express");
const config = require("config");
const winston = require("winston");
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({ filename: "./log/all.log" }),
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});
winston.add(logger);
const app = express();
const port = process.env.port || 3000;
const mongoose = require("mongoose");
const User = require("./model/user.js");
const { Pool } = require("pg");
const pool = new Pool(config.get("postgresql"));

mongoose
  .connect(config.get("mongodb.url"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    winston.info("MongoDB - initialized");
  })
  .catch(() => {
    winston.error("MongoDB - error during initialization");
  });

mongoose.connection.on("connected", () => {
  winston.info("Mongoose connected!");
});

mongoose.connection.on("disconnected", () => {
  winston.error("Mongoose disconnected!");
});

app.get("/", (req, res) => {
  res.json({
    success: true,
  });
});

app.get("/mongodb", (req, res) => {
  var user = new User({
    name: "max",
  });
  user
    .save()
    .then(res => {
      res.json({
        success: true,
        data: res,
      });
    })
    .catch(err => {
      res.json({
        success: false,
        error: err,
      });
    });
});

app.get("/postgres", (req, res) => {
  pool.connect().then(client => {
    return client
      .query("SELECT * FROM users")
      .then(result => {
        client.release();
        res.json({
          success: true,
          data: result.rows,
        });
      })
      .catch(err => {
        client.release();
        res.json({
          success: false,
          error: err.stack,
        });
      });
  });
});

app.listen(port, () => winston.info(`App listening at this port : ${port}`));
