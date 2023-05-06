const User = require('../../models/user');
const jwt = require('jsonwebtoken');

module.exports = {
    Query: {
        login: async (_parent, { email, password }) => {
            const user = await User.findOne({ email: email });
            if (!user) {
                throw new Error('User does not exist!');
            }
            if (user.password !== password) {
                throw new Error('Password is incorrect!');
            }
            const token = jwt.sign({
                userId: user.id,
                email: user.email,
            }, 'my-private-key', {
                expiresIn: '2h'
            });
            return {
                userId: user.id,
                token: token,
                tokenExpiration: 2,
            };
        },
    },
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