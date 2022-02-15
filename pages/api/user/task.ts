import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  switch (method) {
    case "GET":
      return await get(req, res);

    case "POST":
      return await create(req, res);

    case "PUT":
      return await update(req, res);
    default:
      return res.status(405).json({ message: "Method Not Allowed" });
  }
}

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await prisma.task.findMany();
    return res.status(200).json({ data, message: "ok" });
  } catch (error) {
    return res.status(400).json({ messsage: "Unable to get task" });
  }
};

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, description, priority } = req.body;

    const data = await prisma.task.create({
      data: {
        name,
        description,
        priority,
      },
    });
    return res.status(200).json({ data, message: "ok" });
  } catch (error) {
    return res.status(400).json({ messsage: "Unable to create task" });
  }
};

const update = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id, name, description, priority } = req.body;
    const data = await prisma.task.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        priority,
      },
    });
    res.status(200).json({ data, message: "ok" });
  } catch (e) {
    res.status(400).json({ message: "Unable to update task" });
  }
};
