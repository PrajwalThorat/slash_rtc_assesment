
const Book = require("../models/book");
const esClient = require("../config/elastic");
require("dotenv").config();

class BookService {
  static async saveBook(title, content) {
    try {
      const book = await Book.create({ title, content });
      return book;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async migrateToElasticSearch() {
    try {
      const books = await Book.findAll();
    //   console.log("book list : ",books);
      for (let book of books) {
        book = book.dataValues;
        await esClient.index({
          index: process.env.ES_INDEX,
          id: book.id,
          body: { title: book.title, content: book.content },
        });
      }
      return { message: "Data migrated successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async searchBooks(keyword) {
    try {
      const result = await esClient.search({
        index: process.env.ES_INDEX,
        body: {
          query: {
            match: { content: keyword },
          },
        },
      });

      const books = result.hits.hits.map((book) => ({
        title: book._source.title,
    }));

    return books; 
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = BookService;
