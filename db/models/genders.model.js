const {Model, DataTypes, Sequelize} = require('sequelize')

const GENDER_TABLE = 'genders';

const GenderSchema = {
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
        allowNull: false
    },
}

class Gender extends Model {
    static associate(){
    }
    static  config(sequelize) {
        return {
            sequelize,
            tableName:GENDER_TABLE,
            modelName:'Gender',
            timestamps:false
        }
    }

}

module.exports = { GENDER_TABLE, GenderSchema, Gender }