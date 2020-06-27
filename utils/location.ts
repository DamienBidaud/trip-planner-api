import { Context } from "../index.d";
import { Location } from "@prisma/client";

export const findLocation = async (
  context: Context,
  location: { city: string; country: string }
) =>
  await context.prisma.location.findMany({
    where: {
      city: location.city,
      country: location.country,
    },
  });

export const addLocation = async (context: Context, location: Location) =>
  await context.prisma.location.create({
    data: location,
  });
