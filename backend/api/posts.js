const express = require("express");
const postsRouter = express.Router();
const { requireUser, requiredNotSent } = require("./utils");
const { createPost, getAllPosts, updatePost, getPostById, deletePost } = require("../db/dbMethods");

// GET /api/posts
postsRouter.get("/", async (req, res, next) => {
  try {
    const posts = await getAllPosts();
    res.send(posts);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// POST /api/posts
postsRouter.post(
  "/",
  requireUser,
  requiredNotSent({ requiredParams: ["title", "content"] }),
  async (req, res, next) => {
    try {
      const { title, content = "" } = req.body;
      const postData = { authorId: req.user.id, title, content };
      const post = await createPost(postData);
      if (post) {
        res.send(post);
      } else {
        next({ name: "PostCreationError", message: "Error creating post" });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

// PATCH /api/posts/:postId
postsRouter.patch("/:postId", requireUser, async (req, res, next) => {
  const { postId } = req.params;
  const { title, content, tags } = req.body;
  const updateFields = {};

  if (tags && tags.length > 0) {
    updateFields.tags = tags.trim().split(/\s+/);
  }
  if (title) {
    updateFields.title = title;
  }
  if (content) {
    updateFields.content = content;
  }

  try {
    const originalPost = await getPostById(postId);
    if (originalPost.author.id === req.user.id) {
      const updatedPost = await updatePost(postId, updateFields);
      res.send({ post: updatedPost });
    } else {
      next({
        name: "UnauthorizedUserError",
        message: "You cannot update a post that is not yours",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// DELETE /api/posts/:postId
postsRouter.delete("/:postId", requireUser, async (req, res, next) => {
    try {
    const originalPost = await getPostById(postId);
    if (originalPost.author.id === req.user.id) {
      const post = await deletePost(req.params.postId);
      res.status(404).send({ message: "Post deleted successfully" });
    } else {
      next({
        name: "UnauthorizedUserError",
        message: "You cannot delete a post that is not yours",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = postsRouter;
