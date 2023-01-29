import { PrismaClient } from "@prisma/client";
import { NextApiHandler } from "next";

const getHandler: NextApiHandler = async (req, res) => {
  let statusCode = 200;
  const prisma = new PrismaClient();
  const data = await prisma.user
    .findMany()
    .catch((err) => {
      statusCode = 500;
      return { error: `Failed to selet user: err(${err})` };
    })
    .finally(async () => await prisma.$disconnect());
  res.status(statusCode).json(data);
};

const handler: NextApiHandler = (req, res) => {
  switch (req.method) {
    case "GET":
      getHandler(req, res);
      break;
    default:
      return res.status(405).json({ error: "Method not allowed." });
  }
};

export default handler;
