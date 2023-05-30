import User from '../../models/user.js';
import jwt from 'jsonwebtoken';

const AuthResolver = {
    Query: {
        login: async (_parent, { email, password }, _, info) => {
            const user = await User.findOne({ email: email });
            if (!user || user.password !== password)
                throw new Error('Invalid credentials');

            const token = jwt.sign({
                userId: user.id,
                email: user.email,
            }, process.env.JWT_KEY, {
                expiresIn: '2 days'
            });

            return {
                userId: user.id,
                token: token,
                tokenExpiration: 2,
            };
        },
        getUserByToken: async (_parent, { token }, _, info) => {
            try {
                const decoded = jwt.verify(token, process.env.JWT_KEY);
                const user = await User.findById(decoded.userId);
                if (!user) {
                    throw new Error('User not found');
                }
                return user;
            } catch (err) {
                console.log(err);
                throw err;
            }
        }
    },
    Mutation: {
        createUser: async (_parent, { user }) => {
            try {
                const existingUser = await User.findOne({
                    $or: [
                        { email: user.email },
                        { username: user.username }
                    ]
                });
                if (existingUser) {
                    if (existingUser.email === user.email) {
                        throw new Error('Email already in use');
                    } else if (existingUser.username === user.username) {
                        throw new Error('Username already taken');
                    }
                }
                const newUser = new User({
                    email: user.email,
                    username: user.username,
                    password: user.password,
                    full_name: user.full_name,
                    bio: user.bio,
                    profile_picture: user.profile_picture,
                    joined_date: Date.now(),
                });
                const result = await newUser.save();
                console.log(result);
                return result;
            } catch (err) {
                console.log(err);
                throw err;
            }
        },
    }
}

export default AuthResolver;