const {Book,BookSchema} = require("./book.model")
const {Author,AuthorSchema} = require("./author.model")
const {Gender,GenderSchema} = require("./genders.model")
const {BookGender,BookGenderSchema} = require("./book-garder.model")

// Aqui se incrementaria los modelos
function setupModels(sequelize){
    Author.init(AuthorSchema,Author.config(sequelize));
    Gender.init(GenderSchema,Gender.config(sequelize));
    BookGender.init(BookGenderSchema,BookGender.config(sequelize));
    Book.init(BookSchema,Book.config(sequelize));

    Author.associate(sequelize.models);
    Book.associate(sequelize.models);
    BookGender.associate(sequelize.models);
}

module.exports = setupModels;