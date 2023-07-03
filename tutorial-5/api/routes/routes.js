const express = require("express");

const usersObj = require("../database/users");

var uuid = require("uuid");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.get("/users", (req, res) => {
  try {
    if (!usersObj || !usersObj.length) {
      return res
        .status(404)
        .json({ success: false, data: "Users not found!!" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error!" });
  }
  const newUsersObj = usersObj.map(({ email, firstName, id }) => ({
    email,
    firstName,
    id,
  }));
  return res
    .status(200)
    .json({ message: "Users retrieved", success: true, users: newUsersObj });
});

router.put("/update/:id", (req, res) => {
  const userId = req.params.id;
  const body = req.body;
  let userFound = false;

  if (Object.keys(body).length === 0) {
    return res.status(400).json({ success: false, data: "Incorrect Request!" });
  }

  try {
    for (let i = 0; i < usersObj.length; i++) {
      if (usersObj[i].id === userId) {
        userFound = true;
        if (body.email) {
          usersObj[i].email = body.email;
        }
        if (body.firstName) {
          usersObj[i].firstName = body.firstName;
        }
        return res.status(200).json({ message: "User updated", success: true });
      }
    }
    if (!userFound) {
      return res.status(404).json({ success: false, data: "User not found!" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error!" });
  }
});

router.post("/add", (req, res) => {
  const body = req.body;
  const id = uuid.v4();

  if (Object.keys(body).length === 0) {
    return res.status(400).json({ success: false, data: "Incorrect Request!" });
  }

  try {
    body.id = id;
    usersObj.push(body);
    return res.status(200).json({ message: "User added", success: true });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error!" });
  }
});

router.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  const userFound = usersObj.find((user) => user.id === userId);

  try {
    if (userFound) {
      const { email, firstName, id } = userFound;
      const userObj = { email, firstName, id };
      res.status(200).json({ success: true, user: userObj });
    } else {
      res.status(404).json({ success: false, data: "User not found!" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error!" });
  }
});

module.exports = router;
