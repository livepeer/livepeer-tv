import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "@/components/nav";
import { getConfig, getShowFromPlaybackId } from "@/lib/api";
import { Show as TypeShow } from "@/types";
import RoomPage from "@/components/show/room";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";
import Sidebar from "@/components/show/sidebar";
import APIKeys from "@/lib/config";

const SpeakerShow = ({ show, config }: { show: TypeShow; config: any }) => {
  const [playbackId] = useState(show.playbackId);
  const [token, setToken] = useState<undefined | string>(undefined);
  const [isLive, setIsLive] = useState(false);
  const [streamId, setStreamId] = useState("");

  const { query } = useRouter();

  const getStreamId = async () => {
    const { data: stream } = await axios.get(
      `https://livepeer.studio/api/stream/playback/${playbackId}`,
      {
        headers: {
          Authorization: `Bearer ${APIKeys.LIVEPEER_STUDIO_KEY}`,
        },
      }
    );

    return stream.parentId ?? stream.id;
  };

  const joinRoom = async () => {
    const { data: roomData } = await axios.post(
      `https://livepeer.studio/api/room/${show.roomId}/user`,
      {
        name: query.from === "invite" ? query.name : "Host",
      },
      {
        headers: {
          Authorization: `Bearer ${APIKeys.LIVEPEER_STUDIO_KEY}`,
        },
      }
    );
    const id = await getStreamId();
    setStreamId(id);
    setToken(roomData.token);
  };

  useEffect(() => {
    joinRoom();
  }, []);

  const goLive = async () => {
    const { data: stream } = await axios.post(
      `https://livepeer.studio/api/room/${show.roomId}/egress`,
      {
        streamId,
      },
      {
        headers: {
          Authorization: `Bearer ${APIKeys.LIVEPEER_STUDIO_KEY}`,
        },
      }
    );
    toast({
      title: "Stream started",
    });
    setIsLive(true);
  };

  const stopLive = async () => {
    const { data: stream } = await axios.delete(
      `https://livepeer.studio/api/room/${show.roomId}/egress`,
      {
        headers: {
          Authorization: `Bearer ${APIKeys.LIVEPEER_STUDIO_KEY}`,
        },
      }
    );

    setIsLive(false);
    toast({
      title: "Stream stopped",
    });
  };

  const copyInviteLink = async () => {
    await navigator.clipboard.writeText(show.inviteLink);
    toast({
      title: "Invite link copied",
    });
  };

  return (
    <div className="w-full  h-screen">
      <Nav
        fromShow
        config={config.fields}
        onInviteGuestClick={copyInviteLink}
        onGoLiveClick={goLive}
        isLive={isLive}
        onEndLiveClick={stopLive}
      />
      {token ? (
        <div className="flex flex-row">
          <div className="w-10/12">
            {token && <RoomPage token={token} />}
            <div className="m-4 flex flex-row items-center  mt-6">
              <img
                className="w-14 h-14 rounded-2xl"
                src={show.guest?.image?.url}
              />
              <div className="flex flex-col ml-4 justify-center">
                <h2 className="text-xl text-white font-semibold">
                  {show.title}
                </h2>
                <p className="mt-2">
                  <span className="text-white/80 font-medium">
                    {show.guest?.name}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <Sidebar />
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <svg
            aria-hidden="true"
            className="w-10 h-10 -mt-20 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps({
  params,
}: {
  params: {
    id: string;
    preview?: string;
  };
}) {
  const show = await getShowFromPlaybackId(params.id);
  const isPreview = params.preview !== undefined;
  const config = await getConfig(isPreview);

  return {
    props: { show: show[0], config: config[0] },
  };
}

export default SpeakerShow;
