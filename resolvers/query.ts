import { PrismaClient, PrismaClientOptions, Author } from "@prisma/client";
import { verify } from "jsonwebtoken";
import { getActivity } from "../utils/activity";
type Context = {
  prisma: PrismaClient<PrismaClientOptions, never>;
};

const validateAuth = (_: any, args: { token: string }, context: Context) => {
  const { token } = args;
  try {
    const decoded = verify(token, "DEV_ENV") as {
      authorId: number;
      iat: number;
    };
    return decoded.authorId;
  } catch (err) {
    console.error(err);

    return null;
  }
};

const trip = async (
  _parent: unknown,
  args: { tripId: string },
  context: Context
) => {
  try {
    const allTrips = await context.prisma.trip.findOne({
      where: { id: parseInt(args.tripId, 10) },
    });
    return allTrips;
  } catch (error) {
    console.error(error);
    // throw error;
  }
};

const author = async (_: any, args: { token: string }, context: Context) => {
  const authorId = validateAuth(_, args, context);
  if (authorId) {
    return await context.prisma.author.findOne({
      where: {
        id: authorId,
      },
    });
  }

  return null;
};

const activity = (_: any, args: {activityID: string}, context: Context) =>
  getActivity(parseInt(args.activityID, 10), context);

const locations = (_: any, args: object, context: Context) => {
    return context.prisma.location.findMany();
};

export default {
  validateAuth,
  trip,
  author,
  activity,
  locations
};
