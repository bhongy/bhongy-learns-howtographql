const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { env } = require('../utils');

function post(parent, args, context, info) {
  const { description, url } = args;
  return context.db.mutation.createLink({ data: { description, url } }, info);
}

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const data = { ...args, password };
  const user = await context.db.mutation.createUser({ data });
  const token = jwt.sign({ userId: user.id }, env.APP_SECRET);
  return { user, token };
}

async function login(parent, args, context, info) {
  const where = { email: args.email };
  const user = await context.db.query.user({ where });
  if (user == null) {
    throw new Error(`Could not find user with email: ${args.email}`);
  }

  const validPassword = await bcrypt.compare(args.password, user.password);
  if (!validPassword) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, env.APP_SECRET);
  return { user, token };
}

module.exports = {
  post,
  signup,
  login,
};
