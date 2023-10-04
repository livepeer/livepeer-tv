import APIKeys from "@/lib/config";
import { Magic } from "@magic-sdk/admin";
import { NextApiRequest, NextApiResponse } from "next";

let mAdmin = new Magic(APIKeys.MAGIC_SECRET_KEY);

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    const didToken = mAdmin.utils.parseAuthorizationHeader(
      req.headers.authorization as string
    );
    await mAdmin.token.validate(didToken);
    res.status(200).json({ authenticated: true });
  } catch (error: any) {
    res.status(500).json({ error: error?.message });
  }
}
