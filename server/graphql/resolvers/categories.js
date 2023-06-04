import Category from '../../models/category.js';

const CategoriesResolver = {
    Query: {
        categories: async (_parent, args, req) => {
            try {
                const categories = await Category.find();
                return categories.map(category => {
                    return { ...category._doc, _id: category._id };
                });
            } catch (err) {
                throw err;
            }
        },
    },
    Mutation: {
        createCategory: async (_parent, { category }, context) => {

            if (!context.isAuth) {
                throw new Error('Unauthenticated!');
            }

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

export default CategoriesResolver;