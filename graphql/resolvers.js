const Recipe = require("../model/Recipe");

module.exports = {
    Query: {
        async recipe(_, { ID }) {
            return await Recipe.findById(ID);
        },

        async getRecipes(_, { amount }) {
            return await Recipe.find().sort({ createdAt: -1 }).limit(amount);
        }
    },
    Mutation: {
        async createRecipe(_, { recipeInput: { name, description } }) {
            const newRecipe = new Recipe({
                name,
                description,
                createdAt: new Date().toISOString(), // Correct field name
                thumbsUp: 0,
                thumbsDown: 0,
            });

            const res = await newRecipe.save();

            return {
                id: res.id,
                ...res._doc // Spread all the document fields correctly
            };
        },

        async deleteRecipe(_, { ID }) {
            const wasDeleted = (await Recipe.deleteOne({ _id: ID })).deletedCount;
            return wasDeleted > 0;
        },

        async editRecipe(_, { ID, recipeInput: { name, description } }) {
            const updatedRecipe = await Recipe.findByIdAndUpdate(
                ID,
                { name, description },
                { new: true }
            );
            return updatedRecipe;
        }
    }
};
