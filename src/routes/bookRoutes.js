const express = require("express");
const BookController = require("../controllers/bookController");

const router = express.Router();

router.post("/books", BookController.saveBook);
router.post("/migrate", BookController.migrateData);
router.get("/search", BookController.searchBooks);

module.exports = router;
