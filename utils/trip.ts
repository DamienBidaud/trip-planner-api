import { Context } from "../index.d";

export const getTrip = async (id: number, context: Context) =>
  await context.prisma.trip.findOne({
    where: {
      id,
    },
  });
