import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { hashPassword } from "../../lib/hashAndSalt";

const schema = z.object({
  token: z.string(),
  password: z.string().min(5)
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  };

  try {
    const { token, password } = schema.parse(req.body);

    // check if token exists in db & that it is not expired
    const existingToken = await prisma.verificationToken.findUnique({
      where: {
        token: token,
      },
      include: {
        user: true,
      },
    });

    if (!existingToken) {
      return res.status(404).json({ message: "Token not found" });
    };

    if (existingToken.expires < new Date()) {
      console.log("token expires", existingToken.expires, "new date", new Date(), "token expired", existingToken.expires < new Date());
      return res.status(400).json({ message: "Token expired" });
    };

    // update user password
    await prisma.user.update({
      where: {
        id: existingToken.userId,
      },
      data: {
        password: await hashPassword(password, 10),
      },
    });

    // delete token
    await prisma.verificationToken.delete({
      where: {
        token: token,
      },
    });

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) { if (error instanceof z.ZodError) return res.status(400).json({ msg: ""});
    else return res.status(500).json({ message: error });
  }




};
