const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findLocation, addLocation, getActivity, getTrip } = require("../utils");

const signup = async (root, args, context, info) => {
  const password = await bcrypt.hash(args.password, 10);
  const author = await context.prisma.mutation.createAuthor(
    {
      data: {
        ...args,
        password
      }
    },
    `{ id }`
  );

  const token = jwt.sign(
    {
      authorId: author.id
    },
    process.env.APP_SECRET
  );

  return {
    token,
    author
  };
};

const login = async (root, args, context, info) => {
  const author = await context.prisma.query.author(
    {
      where: {
        email: args.email
      }
    },
    `{ id password }`
  );

  if (!author) {
    throw new Error(`No author with the email ${args.email}.`);
  }

  const valid = await bcrypt.compare(args.password, author.password);

  if (!valid) {
    throw new Error(`The password is incorrect.`);
  }

  const token = jwt.sign(
    {
      authorId: author.id
    },
    process.env.APP_SECRET
  );

  return {
    token,
    author
  };
};

const createActivity = async (root, args, context, info) => {
  const { tripID, title, locations, price, startDate, endDate, type } = args;
  const trip = await context.prisma.query.trip(
    {
      where: {
        id: tripID
      }
    },
    `{id}`
  );

  if (!trip) {
    throw new Error(`No trip with id ${tripID}`);
  }

  const newActivity = await context.prisma.mutation.createActivity(
    {
      data: {
        title,
        locations,
        price,
        startDate,
        endDate,
        type
      }
    },
    `{ id }`
  );
  context.prisma.mutation.updateTrip({
    data: {
      activities: {
        connect: {
          id: newActivity.id
        }
      }
    },
    where: {
      id: tripID
    }
  });

  return getActivity(newActivity.id, context, info);
};

const createTrip = async (root, args, context, info) => {
  const { authorId, title } = args;
  const author = await context.prisma.query.author(
    {
      where: {
        id: authorId
      }
    },
    `{id}`
  );

  if (!author) {
    throw new Error(`No author with id ${authorId}`);
  }

  const newTrip = await context.prisma.mutation.createTrip(
    {
      data: {
        title
      }
    },
    `{ id }`
  );
  context.prisma.mutation.updateAuthor({
    data: {
      trips: {
        connect: {
          id: newTrip.id
        }
      }
    },
    where: {
      id: authorId
    }
  });

  return getTrip(newTrip.id, context, info);
};

const updateActivity = async (root, args, context, info) => {
  const {
    activityID,
    title,
    locations,
    price,
    startDate,
    endDate,
    type,
    description
  } = args;

  return context.prisma.mutation.updateActivity({
    data: {
      title,
      locations,
      price,
      startDate,
      endDate,
      type,
      description
    },
    where: {
      id: activityID
    }
  }, info)
};

const deleteActivity = async (root, args, context, info) => {
  return context.prisma.mutation.deleteActivity({
    where: {
      id: args.activityID
    }
  }, info)
};

const requestFriendship = async (root, args, context, info) => {
  const { authorId, authorRequestedId } = args;

  context.prisma.mutation.updateAuthor({
    data: {
      friends: {
        connect: {
          id: authorRequestedId
        }
      }
    },
    where: {
      id: authorId
    }
  });

  context.prisma.mutation.updateAuthor({
    data: {
      friendshipRequested: {
        connect: {
          id: authorId
        }
      }
    },
    where: {
      id: authorRequestedId
    }
  });
};

module.exports = {
  signup,
  login,
  createActivity,
  updateActivity,
  deleteActivity,
  createTrip,
  requestFriendship
};
