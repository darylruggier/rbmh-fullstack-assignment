import { getSession } from "next-auth/react";
import { prisma } from "../../lib/prisma";
import { hashPassword } from "../../lib/hashAndSalt";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).send({ msg: "Method not allowed"});
  };

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).send({ msg: "Unauthorized" });
  };

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return res.status(404).send({ msg: "User not found"});
  };

  let passwordMatches = false;
  if (user.password) {
    passwordMatches = bcrypt.compareSync(req.body.current_password, user.password);
  };

  if (!passwordMatches) {
    return res.status(401).send({msg: "Incorrect password"});
  };

  return res.status(200).send({msg: "Password verified successfully"});
}
