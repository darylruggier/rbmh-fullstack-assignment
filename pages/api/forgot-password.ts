import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import sendPasswordResetEmail from "../../lib/email";

const schema = z.object({
  email: z.string().email()
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ msg: "Method not allowed" });
  };

  try {
    const { email } = schema.parse(req.body);

    // check if email exists in db
    const user = await prisma.user.findUnique({
      where: { email: email }
    });

    if (!user) {
      return res.status(404).json({ msg: "Email not found" });
    };

    // check if user has non-expired token
    // const existingToken = await prisma.verificationToken.findFirst({
    //   where: {
    //     userId: user.id,
    //     expires: {
    //       gte: new Date()
    //     }
    //   },
    // });
    //
    //
    // if (existingToken) {
    //   return res.status(409).json({ msg: "Non-expired token already exists" });
    // }

    const token = await prisma.verificationToken.create({
      data: {
        token: Math.random().toString(36).substring(7),
        user: {
          connect: {
            id: user.id,
          },
        },
        expires: new Date(new Date().getTime() + 60 * 60 * 1000), // expires in 1 hour
      },
    });

    // send email with token
    await sendPasswordResetEmail(email, token);
    return res.status(200).json({ msg: "Token created successfully" });
  } catch (error: any) {
    return res.status(400).json({ msg: error.message });
  }
};
