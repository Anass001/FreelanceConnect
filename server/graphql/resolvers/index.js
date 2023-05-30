import authResolver from './auth.js';
import servicesResolver from './services.js';
import categoriesResolver from './categories.js';
import reviewsResolver from './reviews.js';
import usersResolver from './users.js';
import uploadResolver from './upload.js';
import ordersResolver from './orders.js';
import chatsResolver from './chat.js';

import merge from 'lodash/merge.js';

const resolvers = merge(
    authResolver,
    servicesResolver,
    categoriesResolver,
    reviewsResolver,
    usersResolver,
    uploadResolver,
    ordersResolver,
    chatsResolver
);

export default resolvers;
