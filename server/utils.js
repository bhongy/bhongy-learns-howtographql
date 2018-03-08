// Don't really like the indirection but I like that
// it's clear where/when we parse the `.env`
// all modules import this file will know that it's safe to use
require('dotenv').config();

// don't like how unnecessary complicate this is
// but like that it's easy for others to know if the .env
// is missing the expected properties
exports.env = [
  'APP_SECRET',
].reduce(
  (prev, key) => {
    const src = process.env[key];
    if (typeof src === 'undefined') {
      throw new Error(
        `Key: "${key}" not found in process.env. Please check .env file.`
      );
    }
    return Object.assign(
      {
        [key]: src,
      },
      prev
    );
  },
  {}
);
