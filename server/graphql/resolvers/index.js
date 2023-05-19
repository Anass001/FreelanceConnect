const authResolver = require('./auth');
const servicesResolver = require('./services');
const categoriesResolver = require('./categories');
const reviewsResolver = require('./reviews');
const usersResolver = require('./users');
const uploadResolver = require('./upload');
const ordersResolver = require('./orders');

const merge = require('lodash/merge');

const resolvers = merge(authResolver, servicesResolver, categoriesResolver, reviewsResolver, usersResolver, uploadResolver, ordersResolver);

module.exports = resolvers;
