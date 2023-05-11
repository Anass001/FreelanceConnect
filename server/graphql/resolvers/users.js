const User = require('../../models/user');
const jwt = require('jsonwebtoken');

module.exports = {
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