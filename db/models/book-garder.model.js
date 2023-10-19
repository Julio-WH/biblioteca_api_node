const { Model, DataTypes, Sequelize } = require('sequelize');

const { BOOK_TABLE } = require("./book.model");
const { GENDER_TABLE } = require("./genders.model");

const BOOK_GENDER_TABLE = "books_genders";

const BookGenderSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    bookId: {
        field: 'book_id',
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
            model: BOOK_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    genderId: {
        field: 'gender_id',
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
            model: GENDER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
}

class BookGender extends Model {
    static associate(){
        //
    }
    static config(sequelize){
        return {
            sequelize,
            tableName: BOOK_GENDER_TABLE,
            modelName: 'BookGender',
            timestamps: false
        }
    }
}
module.exports = { BookGender, BookGenderSchema, BOOK_GENDER_TABLE };
