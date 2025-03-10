const BookService = require("../services/bookService");

class BookController {
  static async saveBook(req, res) {
    try {
      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required" });
      }
      const book = await BookService.saveBook(title, content);
      res.status(201).json(book);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async migrateData(req, res) {
    try {
      const result = await BookService.migrateToElasticSearch();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async searchBooks(req, res) {
    try {
      const { query } = req.query;
      if (!query) {
        return res.status(400).json({ error: "Search query is required" });
      }
      const books = await BookService.searchBooks(query);
      res.json({ books })
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = BookController;
