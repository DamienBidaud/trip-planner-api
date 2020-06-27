import { Context } from "../index.d";

export const getActivity = async (id: number, context: Context) =>
  await context.prisma.activity.findOne({
    where: {
      id,
    },
  });
