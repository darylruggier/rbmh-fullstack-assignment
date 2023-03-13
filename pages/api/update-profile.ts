import { getSession } from "next-auth/react";
import { prisma } from "../../lib/prisma";
import { hashPassword } from "../../lib/hashAndSalt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).send({msg: "Unauthorized"});
  }


  try {
    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        first_name: req.body.first_name,
        country: req.body.country,
        password: req.body.new_password ? await hashPassword(req.body.new_password, 10) : undefined,
      } 
    });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }

  return res.status(200).send({msg: "Profile updated successfully"});
}
