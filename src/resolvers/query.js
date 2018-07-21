const jwt = require("jsonwebtoken");
const { getActivity } = require("../utils");

const activities = (_, args, context, info) => {
  return context.prisma.query.activities({}, info);
};

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

const activity = (_, args, context, info) => console.log(info) || getActivity(args.activityID, context, info);

const locations = (_, args, context, info) => {
  return context.prisma.query.locations({}, info);
}

module.exports = {
  activities,
  validateAuth,
  activity,
  locations
};
