const jwt = require("jsonwebtoken");
const { getActivity, getTrip } = require("../utils");

const validateAuth = (_, args, context, info) => {
  const { token } = args;
  try {
    var decoded = jwt.verify(token, process.env.APP_SECRET);
    return decoded.authorId;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const activity = (_, args, context, info) => getActivity(args.activityID, context, info);

const trip = (_, args, context, info) => getTrip(args.tripId, context, info)

const locations = (_, args, context, info) => {
  return context.prisma.query.locations({}, info);
}

const author = (_, args, context, info) => {
  const authorId = validateAuth(_, args, context, info);
  if(!!authorId) {
    return context.prisma.query.author(
      {
        where: {
          id: authorId
        }
      },
      info
    );
  }
  return null;
}

module.exports = {
  validateAuth,
  activity,
  locations,
  author,
  trip
};
