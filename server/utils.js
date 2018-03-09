// Don't really like the indirection but I like that
// it's clear where/when we parse the `.env`
// all modules import this file will know that it's safe to use
require('dotenv').config();
const lodash = require('lodash');
const jwt = require('jsonwebtoken');

// don't like how unnecessary complicate this is
// but like that it's easy for others to know if the .env
// is missing the expected properties
function verifyEnv(keys, env) {
  keys.forEach(k => {
    if (typeof env[k] === 'undefined') {
      throw new Error(
        `Key: "${k}" not found in process.env. Please check .env file.`
      );
    }
  });
  return lodash.pick(env, keys);
}

const { APP_SECRET } = verifyEnv(['APP_SECRET'], process.env);

function getUserId(context) {
  const authorization = context.request.get('Authorization');
  if (authorization) {
    const token = authorization.replace('Bearer ', '');
    // because we `jwt.sign` with `{ userId }`
    // `jwt.verify` will throw if the token is invalid
    try {
      const { userId } = jwt.verify(token, APP_SECRET);
      return userId;
    } catch (ex) {
      // toying with custom error message
      throw new Error('Invalid JSON Web Token');
    }
  }
  throw new Error('Not authenticated');
}

module.exports = {
  APP_SECRET,
  getUserId,
};
