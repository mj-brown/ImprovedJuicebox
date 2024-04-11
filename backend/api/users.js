const express = require("express");
const usersRouter = express.Router();
const {
  createUser,
  getAllUsers,
  getUserByUsername,
  deleteUser,
} = require("../db");
const jwt = require("jsonwebtoken");
const { getUserById } = require("../db/dbMethods");

// GET /api/users
usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send({ users });
  } catch ({ error }) {
    next({ error });
  }
});

// GET /api/users/:userid
usersRouter.get("/:userid", async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (userId !== req.user.userId) {
      return res.status(403).json({ messag: "Unauthorized access" });
    }

    const user = await getUserById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
  } catch ({ name, message }) {
    console.error(name, message);
    next(name, message);
  }
});

// POST /api/users/login
usersRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await getUserByUsername(username);

    if (user && user.password === password) {
      const token = jwt.sign(
        { id: user.id, username: username },
        process.env.JWT_SECRET,
        { expiresIn: "1w" }
      );
      res.send({ message: "You're logged in!", token });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch ({ name, message }) {
    console.error(name, message);
    next(name, message);
  }
});

// POST /api/users/register
usersRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password, name, location } = req.body;
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      next({
        name: "UserExistsError",
        message: "A user with that username already exists",
      });
    } else {
      const user = await createUser({ username, password, name, location });
      res.send({ message: "Thank you for signing up", user: user });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// DELETE /api/users/delete
usersRouter.delete("/delete", async (req, res, next) => {
  try {
    const { username } = req.body;
    await deleteUser(username);
    res.send({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = usersRouter;
