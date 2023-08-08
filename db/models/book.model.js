const {Model, DataTypes, Sequelize} = require('sequelize')

const { AUTHOR_TABLE } = require('./author.model')

const BOOK_TABLE = 'books';

const BookSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey:true,
        type: DataTypes.INTEGER
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: "enable"
    },
    authorId: {
        field: 'author_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: AUTHOR_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    createdAt:{
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
    }
}

class Book extends Model {
    static associate(models){
        this.belongsTo(models.Author, {as: 'author'});
        this.belongsToMany(models.Gender,{
            through: models.BookGender,
            as: "genders",
            foreignKey: "bookId",
            otherKey: "genderId",
        })
    }
    static  config(sequelize) {
        return {
            sequelize,
            tableName:BOOK_TABLE,
            modelName:'Book',
            timestamps:false
        }
    }
}

module.exports = { BOOK_TABLE, BookSchema, Book };
