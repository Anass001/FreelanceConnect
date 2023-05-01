const User = require('../../models/user');

module.exports = {
    Mutation: {
        createUser: async (_parent, { user }) => {
            const newUser = new User({
                email: user.email,
                username: user.username,
                password: user.password,
                full_name: user.full_name,
                bio: user.bio,
                profile_picture: user.profile_picture,
                joined_date: Date.now(),
            });
            try {
                const result = await newUser.save();
                console.log(result);
                return result;
            } catch (err) {
                console.log(err);
                throw err;
            }
        }
    }
}