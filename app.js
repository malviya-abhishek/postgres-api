const bodyParser = require("body-parser");
const express = require("express");
const Sequelize = require("sequelize");
const app = express();

const {
  home,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("./users.controllers");

// middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}))

// endPoints
app.get("/", home);
app.get("/users", getUsers );
app.get("/users/:id", getUser );
app.post("/users", createUser);
app.put("/users/:id", updateUser);
app.delete("/users/:id", deleteUser)


app.listen(8080, ()=>{
    console.log("server started at 8080");
});