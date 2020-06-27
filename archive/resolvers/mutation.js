const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getActivity, getTrip } = require("../utils");

const signup = async (_, args, context) => {
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

const login = async (_, args, context) => {
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

const createActivity = async (_, args, context, info) => {
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

const createTrip = async (_, args, context, info) => {
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

const updateActivity = async (_, args, context, info) => {
  const { activityID, title, locations, price, startDate, endDate, type, description } = args;

  return context.prisma.mutation.updateActivity(
    {
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
    },
    info
  );
};

const deleteActivity = async (_, args, context, info) => {
  return context.prisma.mutation.deleteActivity(
    {
      where: {
        id: args.activityID
      }
    },
    info
  );
};

const manageParticipants = async (_, args, context, info) => {
  const { tripID, participants } = args;

  return context.prisma.mutation.updateTrip(
    {
      data: {
        participants: {
          set: participants
        }
      },
      where: {
        id: tripID
      }
    },
    info
  );
};

module.exports = {
  signup,
  login,
  createActivity,
  updateActivity,
  deleteActivity,
  createTrip,
  manageParticipants
};
