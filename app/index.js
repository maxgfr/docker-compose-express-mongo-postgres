const express = require("express");
const config = require("config");
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
    console.log("MongoDB - inialized");
  })
  .catch(() => {
    console.log("MongoDB - error during initialization");
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
  user.save(function (err) {
    if (err) console.log(err);
    console.log("ok");
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
        error: "error",
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

app.listen(port, () => console.log(`App listening at this ${port}`));
