import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import bcrypt from 'bcrypt';
import { hashPassword } from '../../lib/hashAndSalt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const user = await prisma.User.findUnique({
        where: {
          email: req.body.email,
        }
      });

      if (!user) {
        return res.status(401).json({ msg: "Invalid email or password" });
      };

      const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ msg: "Invalid email or password" });
      } else {
        // set session
        return res.status(200).json({ 
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          country: user.country,
        });
      }

    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  } else {
    return res.status(405).json({ msg: "Method not allowed" });
  }
}
