import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let emailExists = null;
  try {
    emailExists = await prisma.user.findMany({
      where: { email: req.body.email },
    });
    
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }

  if (emailExists.length > 0) {
    return res.status(409).json({ msg: "Email already exists" });
  } else {
    return res.status(200).json({ msg: "Email is available" });
  }
}
