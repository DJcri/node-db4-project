const express = require("express");
const { validateId } = require("./recipe_middleware");

const router = express.Router();

router.get("/:recipe_id", validateId, (req, res, next) => {
  try {
    res.status(200).json(req.recipe);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    sageAdvice: "Finding the real error is 90% of the bug fix",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
