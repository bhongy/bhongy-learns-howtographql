const newLink = {
  subscribe(parent, args, context, info) {
    return context.db.subscription.link({}, info);
  },
};

const newVote = {
  subscribe(parent, args, context, info) {
    return context.db.subscription.vote({}, info);
  },
};

module.exports = {
  newLink,
  newVote,
};
