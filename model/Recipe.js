const { Schema, model } = require("mongoose");


const recipeSchema = new Schema({
    name: String,
    description: String,
    createdAt: String,
    thumbsUp: Number,
    thumbsDown: Number,

})

module.exports = model('Recipe', recipeSchema)