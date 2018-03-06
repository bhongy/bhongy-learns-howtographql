function post(parent, args, context, info) {
  const { description, url } = args;
  return context.db.mutation.createLink({ data: { description, url } }, info);
}

module.exports = {
  post
};
