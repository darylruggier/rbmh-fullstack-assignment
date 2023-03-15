import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const schema = z.object({
  email: z.string().email()
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  };

  try {
    const { email } = schema.parse(req.body);
    // ...
  } catch (error) { if (error instanceof z.ZodError) return res.status(400).json({ msg: ""});
    else return res.status(400).json({ message: error });
  }




};
