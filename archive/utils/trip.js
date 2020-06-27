const getTrip = (id, context, info) =>
  context.prisma.query.trip(
    {
      where: {
        id
      }
    },
    info
  );

module.exports = {
  getTrip
};
