const {Model, DataTypes, Sequelize} = require('sequelize')

const AUTHOR_TABLE = 'authors';

const AuthorSchema = {
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
    lastName:{
        type: DataTypes.STRING,
        allowNull: false,
        field: 'last_name',
    },
    createdAt:{
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
    }
}

class Author extends Model {
    static associate(models){
        this.hasMany(models.Book, {
            as: 'books',
            foreignKey: 'authorId'
        });
    }
    static  config(sequelize) {
        return {
            sequelize,
            tableName:AUTHOR_TABLE,
            modelName:'Author',
            timestamps:false
        }
    }
}

module.exports = {AUTHOR_TABLE, AuthorSchema, Author}