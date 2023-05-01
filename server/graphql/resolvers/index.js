const authResolver = require('./auth');
const servicesResolver = require('./services');
const categoriesResolver = require('./categories');
const merge = require('lodash/merge');

const resolvers = merge(authResolver, servicesResolver, categoriesResolver);

module.exports = resolvers;
