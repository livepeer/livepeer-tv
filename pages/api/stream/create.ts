import client from "@/client/contentful";
import { LIVEPEER_STUDIO_BASE_URL } from "@/client/livepeer";
import config from "@/lib/config";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = JSON.parse(req.body);

  if (Number(data?.sys?.revision) > 1) {
    console.log("ignore, not a new entry");
  } else {
    const createdAt = data?.sys?.createdAt;
    axios
      .post(
        LIVEPEER_STUDIO_BASE_URL + "/stream",
        {
          name: createdAt,
          record: true,
        },
        {
          headers: {
            Authorization: "Bearer " + config.LIVEPEER_STUDIO_KEY,
          },
        }
      )
      .then(async ({ data: stream }) => {
        const { data: room } = await axios.post(
          "https://livepeer.studio/api/room",
          {},
          {
            headers: {
              Authorization: `Bearer ${config.LIVEPEER_STUDIO_KEY}`,
            },
          }
        );
        client.getSpace(config.CONTENTFUL_SPACE_ID as string).then((space) => {
          space.getEnvironment("master").then((environment) => {
            environment.getEntry(data?.sys?.id).then((entry) => {
              entry.fields.playbackId["en-US"] = stream.playbackId;
              entry.fields.inviteLink[
                "en-US"
              ] = `${config.BASE_URL}/invite/${stream.playbackId}`;
              entry.fields.roomId["en-US"] = room.id;
              entry.fields.streamId["en-US"] = stream.id;
              entry.update();

              res.status(200).json({
                message: "success",
              });
            });
          });
        });
      });
  }
}
