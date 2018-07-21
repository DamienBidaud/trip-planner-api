const jwt = require("jsonwebtoken");
const { getActivity } = require("../utils");

const validateAuth = (_, args, context, info) => {
  const { token } = args;
  try {
    console.log(token)
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
  author
};
