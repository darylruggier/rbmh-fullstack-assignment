import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import { hashPassword } from '../../lib/hashAndSalt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    if (!req.body.email || !req.body.password || !req.body.first_name || !req.body.country) {
      return res.status(400).json({ msg: "User creation requires email, first_name, country and password to be not null" });
    }
    try {

      // checking if the user with the specified email already exists
      const existingUser = await prisma.User.findUnique({
        where: {
          email: req.body.email
        },
      });

      if (existingUser) {
        return res.status(409).json({ msg: 'User with this email already exists' });
      }

      const createUser = await prisma.User.create({
        data: {
          email: req.body.email,
          first_name: req.body.first_name,
          country: req.body.country,
          password: await hashPassword(req.body.password, 10),
        }
      });

      console.log("user", createUser);
      return res.status(200).json({ msg: "Successfully created user!"});
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  } else {
    return res.status(405).json({ msg: "Method not allowed" });
  }
}
