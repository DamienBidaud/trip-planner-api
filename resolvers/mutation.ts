import { sign } from "jsonwebtoken";
import { hash, compare } from "bcryptjs";
import { Context } from "../index.d";

const signup = async (
  _: unknown,
  args: { email: string; password: string; username: string },
  context: Context
) => {
  const password = await hash(args.password, 10);
  const author = await context.prisma.author.create({
    data: {
      ...args,
      password,
    },
  });

  const token = sign(
    {
      authorId: author.id,
    },
    "DEV_ENV"
  );

  return {
    token,
    author,
  };
};

const login = async (_: unknown, args: { email: string; password: string}, context: Context) => {
  const author = await context.prisma.author.findOne(
    {
      where: {
        email: args.email,
      },
    }
  );

  if (!author) {
    throw new Error(`No author with the email ${args.email}.`);
  }

  const valid = await compare(args.password, author.password);

  if (!valid) {
    throw new Error(`The password is incorrect.`);
  }

  const token = sign(
    {
      authorId: author.id,
    },
    "DEV_ENV"
  );

  return {
    token,
    author,
  };
};

export default { signup, login };
