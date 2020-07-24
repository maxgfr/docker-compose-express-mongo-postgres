var db = connect("mongodb://root:root@localhost:27017/admin");

db = db.getSiblingDB('db');

db.createUser({
  user: "user",
  pwd: "pass",
  roles: [{
    role: "readWrite",
    db: "db"
  }],
  passwordDigestor: "server",
})