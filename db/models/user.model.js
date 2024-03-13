const {Model, DataTypes, Sequelize} = require('sequelize')
const bcrypt = require('bcryptjs');

const USER_TABLE = 'users';

const UserSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey:true,
        type: DataTypes.INTEGER
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            // Utiliza bcrypt para hashear la contraseña antes de guardarla
            const hashedPassword = bcrypt.hashSync(value, 10); // Genera un hash con 10 rounds de hashing
            this.setDataValue('password', hashedPassword);
          }
    },
    role: {
        type: DataTypes.ENUM('admin', 'user', 'librarian', 'visitor'),
        defaultValue: 'user' // Valor por defecto si no se especifica
    },
    createdAt:{
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt:{
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }

}

class User extends Model {
    static associate(){
        //
    }
    static config(sequelize){
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: true
        }
    }

}
module.exports = { USER_TABLE, UserSchema, User };