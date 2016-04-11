var getBabelRelayPlugin = require('babel-relay-plugin');

// update this path to where our schema file
var schema = require('../dist/graphql/schema.json');

module.exports = getBabelRelayPlugin(schema.data);
