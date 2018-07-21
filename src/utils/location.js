const findLocation = async (context, location) => await context.prisma.query.location(
  {
    where: {
      city: location.city,
      country: location.country
    }
  },
  `{
    id
    country
    city
    longitude
    latitude
    type
  }`
);

const addLocation = async (context, location) => await context.prisma.mutation.createLocation({
  data: location
}, `{ id }`);

module.exports = {
  findLocation,
  addLocation
};