import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import { hashPassword } from '../../lib/hashAndSalt';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  first_name: z.string().optional(),
  country: z.string().optional(),
  password: z.string().min(5, { message: "Password must be at least 5 characters long" }),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { email, first_name, country, password } = schema.parse(req.body);
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) return res.status(400).json({ msg: "Email is not valid" });

      // checking if the user with the specified email already exists
      const existingUser = await prisma.user.findUnique({
        where: {
          email: email
        },
      });

      if (existingUser) {
        return res.status(409).json({ msg: 'User with this email already exists' });
      }

      await prisma.user.create({
        data: {
          email: email,
          first_name: first_name ?? null,
          country: country ?? null,
          password: await hashPassword(password, 10),
        }
      });

      return res.status(200).json({ msg: "Successfully created user!"});
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  } else {
    return res.status(405).json({ msg: "Method not allowed" });
  };
};
