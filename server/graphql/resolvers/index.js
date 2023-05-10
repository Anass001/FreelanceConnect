const authResolver = require('./auth');
const servicesResolver = require('./services');
const categoriesResolver = require('./categories');
const reviewsResolver = require('./reviews');
const merge = require('lodash/merge');

const resolvers = merge(authResolver, servicesResolver, categoriesResolver, reviewsResolver);

module.exports = resolvers;
