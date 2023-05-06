const Category = require('../../models/category');

module.exports = {
    Query: {
        categories: async (_parent, args, req) => {
            try {
                const categories = await Category.find();
                console.log(categories)
                return categories.map(category => {
                    return { ...category._doc, _id: category.id };
                });
            } catch (err) {
                throw err;
            }
        },
    },
    Mutation: {
        createCategory: async (_parent, { category }, req) => {
            if (!req.isAuth) throw new Error('Unauthenticated');
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