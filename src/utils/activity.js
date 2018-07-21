const getActivity = (id, context, info) =>
  context.prisma.query.activity(
    {
      where: {
        id
      }
    },
    info
  );

module.exports = {
  getActivity
};
