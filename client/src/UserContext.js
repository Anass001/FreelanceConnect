import { createContext } from 'react';

const UserContext = createContext({
    token: null,
    userId: null,
    username: null,
    profilePicture: null,
});

export default UserContext;