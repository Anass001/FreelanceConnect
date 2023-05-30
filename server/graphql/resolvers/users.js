import User from '../../models/user.js';

const UsersResolver = {
    Query: {
        user: async (_parent, { userId }) => {
            try {
                const user = await User.findById(userId);
                return { ...user._doc, _id: user.id };
            }
            catch (err) {
                throw err;
            }
        },
    }
}

export default UsersResolver;