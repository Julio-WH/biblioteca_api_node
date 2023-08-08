'use strict';

const {BOOK_TABLE, BookSchema} = require("../models/book.model")
const {AUTHOR_TABLE, AuthorSchema} = require("../models/author.model")
const {GENDER_TABLE, GenderSchema} = require("../models/genders.model")
const {BOOK_GENDER_TABLE,BookGenderSchema} = require("../models/book-garder.model")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(AUTHOR_TABLE, AuthorSchema);
    await queryInterface.createTable(GENDER_TABLE, GenderSchema);
    await queryInterface.createTable(BOOK_TABLE, BookSchema);
    await queryInterface.createTable(BOOK_GENDER_TABLE, BookGenderSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(BOOK_TABLE);
    await queryInterface.dropTable(AUTHOR_TABLE);
    await queryInterface.dropTable(GENDER_TABLE);
    await queryInterface.dropTable(BOOK_GENDER_TABLE);
  }
};
