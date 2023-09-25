import { NextApiRequest, NextApiResponse } from "next";
//@ts-ignore
import contentfulImport from "contentful-import";
import content from "./content";
import APIKeys from "@/lib/config";

const options = {
  spaceId: APIKeys.CONTENTFUL_SPACE_ID,
  content: content,
  managementToken: APIKeys.CONTENTFUL_CMA_KEY,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  contentfulImport(options)
    .then(() => {
      res.status(200).json("Setup completed successfully");
    })
    .catch(() => {
      res.status(500).json({
        message: "error",
      });
    });
}
