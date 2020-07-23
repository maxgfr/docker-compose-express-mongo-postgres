const express = require('express')
const app = express()
const port = 3000
const {
  Pool
} = require("pg");
const pool = new Pool({
  user: "root",
  password: "root",
  host: "postgres",
  port: 5432,
  database: "db",
});

pool.connect().then(() => {
  console.log('connected to postgre')
});

app.get('/', (req, res) => {
  res.json({
    success: true
  })
})

app.get('/', (req, res) => {
  res.json({
    success: true
  })
})

app.listen(port, () => console.log(`App listening at this ${port}`))