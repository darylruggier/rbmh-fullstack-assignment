import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import { hashPassword } from '../../lib/hashAndSalt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ msg: "User creation requires email, first_name, country and password to be not null" });
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) return res.status(400).json({ msg: "Email is not valid" });

    try {
      // checking if the user with the specified email already exists
      const existingUser = await prisma.user.findUnique({
        where: {
          email: req.body.email
        },
      });

      if (existingUser) {
        return res.status(409).json({ msg: 'User with this email already exists' });
      }

      await prisma.user.create({
        data: {
          email: req.body.email,
          first_name: req.body.first_name ?? null,
          country: req.body.country ?? null,
          password: await hashPassword(req.body.password, 10),
        }
      });

      return res.status(200).json({ msg: "Successfully created user!"});
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  } else {
    return res.status(405).json({ msg: "Method not allowed" });
  }
}
