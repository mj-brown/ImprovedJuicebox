const express = require("express");
const tagsRouter = express.Router();
const { getPostsByTagName, getAllTags } = require("../db/dbMethods");

// GET /api/tags
tagsRouter.get("/", async (req, res, next) => {
  try {
    const tags = await getAllTags();
    res.send({ tags });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/tags/:tagName/posts
tagsRouter.get("/:tagName/posts", async (req, res, next) => {
  let { tagName } = req.params;

  tagName = decodeURIComponent(tagName);

  try {
    const posts = await getPostsByTagName(tagName);
    res.send({ posts });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = tagsRouter;
