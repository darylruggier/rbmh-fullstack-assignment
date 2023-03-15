import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import bcrypt from 'bcrypt';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string()
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { email, password } = schema.parse(req.body);

      const user = await prisma.user.findUnique({
        where: {
          email: email
        }
      });

      if (!user) {
        return res.status(401).json({ msg: "Invalid email or password" });
      };


      let isPasswordValid = false;
      if (user.password) {
        isPasswordValid = bcrypt.compareSync(password, user.password);
      };

      if (!isPasswordValid) {
        return res.status(401).json({ msg: "Invalid email or password" });
      } else {
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
