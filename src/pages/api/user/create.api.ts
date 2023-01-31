import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiHandler } from "next";

interface user {
  name: string;
  age: number;
}

const postHandler: NextApiHandler = async (req, res) => {
  const { name, age }: user = req.body;
  if (!name || !age) {
    return res.status(400).json({ error: "Bad Request" });
  }

  let statusCode = 200;
  const data: Prisma.UserCreateInput = {
    name,
    age,
  };
  const prisma = new PrismaClient();
  await prisma.user
    .create({ data })
    .catch((err) => {
      statusCode = 500;
      return { error: `Failed to create user: err(${err})` };
    })
    .finally(async () => await prisma.$disconnect());
  res.status(statusCode);
};

const handler: NextApiHandler = (req, res) => {
  switch (req.method) {
    case "POST":
      postHandler(req, res);
      break;
    default:
      return res.status(405).json({ error: "Method not allowed." });
  }
};

export default handler;
