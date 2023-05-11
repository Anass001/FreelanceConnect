const authResolver = require('./auth');
const servicesResolver = require('./services');
const categoriesResolver = require('./categories');
const reviewsResolver = require('./reviews');
const usersResolver = require('./users');
const merge = require('lodash/merge');

const resolvers = merge(authResolver, servicesResolver, categoriesResolver, reviewsResolver, usersResolver);

module.exports = resolvers;
