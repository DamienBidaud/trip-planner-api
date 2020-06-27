import { PrismaClient, PrismaClientOptions } from "@prisma/client";

export type Context = {
  prisma: PrismaClient<PrismaClientOptions, never>;
};
