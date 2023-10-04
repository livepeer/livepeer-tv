import { LIVEPEER_STUDIO_BASE_URL } from "@/client/livepeer";
import config from "@/lib/config";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = JSON.parse(req.body);

  const multistream = data?.fields?.multistreamShow?.["en-US"];
  const streamId = data?.fields?.streamId?.["en-US"];

  if (multistream.length > 0) {
    multistream.map(async (url: string) => {
      const { data } = await axios.patch(
        LIVEPEER_STUDIO_BASE_URL + "/stream/" + streamId,
        {
          multistream: {
            targets: [
              {
                profile: "source",
                videoOnly: false,
                spec: {
                  name: url,
                  url: url,
                },
              },
            ],
          },
        },
        {
          headers: {
            Authorization: "Bearer " + config.LIVEPEER_STUDIO_KEY,
          },
        }
      );
    });
  }
  res.status(200).json({
    message: "success",
  });
}
