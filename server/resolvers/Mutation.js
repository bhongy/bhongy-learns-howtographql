const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

function post(parent, args, context, info) {
  const { description, url } = args;
  // TODO: toy with an idea of having `context.viewer` or `context.me`
  //   and avoid more imperative "getUserId" just post as "me"
  //   the idea is once the user is in the system they are authenticated
  //   if auth status changes, context.me should change
  //   make sure call sites don't have to null check though
  //   maybe can define getter that throws then users can catch it
  const userId = getUserId(context);
  const data = {
    description,
    url,
    postedBy: {
      connect: { id: userId },
    },
  };
  return context.db.mutation.createLink({ data }, info);
}

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const data = { ...args, password };
  const user = await context.db.mutation.createUser({ data });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
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

  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return { user, token };
}

async function vote(parent, args, context, info) {
  const userId = getUserId(context);
  const { linkId } = args;
  // ? check if the user is allowed to write to the link here ?
  //   e.g. the link with id: `linkId` exists or authorization for this link
  //   it currently throw at createVote - doing the check here
  //   can provide better, more focused error
  //   but we might have to read from db (adding load)
  //
  // const linkExists = await context.db.exits.Link({ id: linkID });
  const alreadyVoted = await context.db.exists.Vote({
    user: { id: userId },
    link: { id: linkId },
  });

  if (alreadyVoted) {
    throw new Error(`Already voted for link: ${linkId}`);
  }

  // if the link for `linkId` doesn't exist - it will throw here
  return context.db.mutation.createVote(
    {
      data: {
        user: { connect: { id: userId } },
        link: { connect: { id: linkId } },
      },
    },
    info
  );
}

module.exports = {
  post,
  signup,
  login,
  vote,
};
