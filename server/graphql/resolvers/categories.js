const Category = require('../../models/category');

module.exports = {
    Query: {
        categories: async () => {
            try {
                const categories = await Category.find();
                return categories.map(category => {
                    return { ...category._doc, _id: category.id };
                });
            } catch (err) {
                throw err;
            }
        },
    },
    Mutation: {
        createCategory: async (_parent, { category }) => {
            const newCategory = new Category({
                name: category.name,
                description: category.description,
            });
            try {
                const result = await newCategory.save();
                console.log(result);
                return result;
            } catch (err) {
                console.log(err);
                throw err;
            }
        }
    }
}