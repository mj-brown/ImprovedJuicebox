const express = require("express");
const usersRouter = express.Router();
const {
  createUser,
  getAllUsers,
  getUserByUsername,
  deleteUser,
  getUserById,
} = require("../db/dbMethods");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { requireUser } = require("./utils")

// GET /api/users
usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    console.log(users);
    res.send({ users });
  } catch ({ error }) {
    next({ error });
  }
});

// GET /api/users/:userid
usersRouter.get("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    console.log(typeof +userId, req.user.id)
    
    if (+userId !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
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

    if (!user || password !== user.password) {
      return res.status(404).json({ message: "Invalid username or passoword" });
    }
    const token = jwt.sign({ id: user.id, username: username }, JWT_SECRET, {
      expiresIn: "1w",
    });
    res.status(200).send({ message: "You're logged in!", token });
  } catch ({ name, message }) {
    console.error(name, message);
    next(name, message);
  }
});

usersRouter.get("/me", requireUser, async (req, res, next) => {
  try {
    
    res.send(req.user);
  } catch (error) {
    next (error);
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
      res.status(200).send({ message: "Thank you for signing up", user: user });
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
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = usersRouter;
