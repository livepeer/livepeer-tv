import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "@/components/nav";
import { Player, StreamSession } from "@livepeer/react";
import { getConfig, getShowFromPlaybackId } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Show as TypeShow } from "@/types";
import Countdown from "@/components/show/countdown";
import { useRouter } from "next/router";
import {
  LIVEPEER_STUDIO_BASE_URL,
  PLAYBACK_URL_PREFIX,
  PLAYBACK_URL_SUFFIX,
  provider,
} from "@/client/livepeer";
import Sidebar from "@/components/show/sidebar";
import APIKeys from "@/lib/config";
import useIsHost from "@/hooks/useIsHost";

const Show = ({ show, config }: { show: TypeShow; config: any }) => {
  const [startingSoon, setStartingSoon] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [isRecord, setIsRecord] = useState(show.isRecording || false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [playbackId, setPlaybackId] = useState(show.playbackId);
  const [loading, setLoading] = useState(false);
  const isHost = useIsHost();

  const { push } = useRouter();

  const fetchPlaybackInfo = async (playbackId: string) => {
    try {
      const playbackInfo = await provider.getPlaybackInfo({ playbackId });
      return playbackInfo;
    } catch (error) {
      console.error("Error fetching playback info:", error);
      return null;
    }
  };

  const fetchRecording = async (streamId: string) => {
    const sessionUrl = `${LIVEPEER_STUDIO_BASE_URL}/stream/${streamId}/sessions`;

    try {
      const { data: sessions } = await axios.get(sessionUrl, {
        headers: {
          Authorization: `Bearer ${APIKeys.LIVEPEER_STUDIO_KEY}`,
        },
      });

      if (sessions.length > 0) {
        const latestRecording = sessions
          .filter(
            (session: StreamSession) =>
              session.recordingUrl || session.recordingStatus
          )
          .reduce((latest: StreamSession, current: StreamSession) =>
            current.lastSeen! > latest.lastSeen! ? current : latest
          );

        if (latestRecording.recordingStatus === "waiting") {
          return {
            status: "waiting",
          };
        }

        const playbackId = latestRecording.recordingUrl
          .replace(PLAYBACK_URL_PREFIX, "")
          .replace(PLAYBACK_URL_SUFFIX, "");
        return {
          status: "ready",
          playbackId,
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getStreamId = async (playbackId: string) => {
    const sessionUrl = `${LIVEPEER_STUDIO_BASE_URL}/stream/playback/${playbackId}`;

    try {
      const { data: stream } = await axios.get(sessionUrl, {
        headers: {
          Authorization: `Bearer ${APIKeys.LIVEPEER_STUDIO_KEY}`,
        },
      });

      return stream.parentId ?? stream.id;
    } catch (error) {
      console.error(
        `Error fetching stream ID for playback ID: ${playbackId}`,
        error
      );
      return null;
    }
  };

  const pollRecordingStatus = async (streamId: string) => {
    try {
      const recording = await fetchRecording(streamId);
      if (!recording) return null;
      switch (recording.status) {
        case "waiting":
          return new Promise((resolve, reject) => {
            setTimeout(async () => {
              setIsWaiting(true);
              const playbackId = await pollRecordingStatus(streamId);
              resolve(playbackId);
            }, 5000);
          });
        case "ready":
          return recording.playbackId as string;
        default:
          return null;
      }
    } catch (error) {
      console.error("Error while polling recording status:", error);
      return null;
    }
  };

  const startPollingPlaybackInfo = async () => {
    setLoading(false);
    try {
      const playbackData = await fetchPlaybackInfo(show.playbackId);
      if (playbackData?.meta?.live) {
        setIsLive(true);
        setLoading(false);
      } else {
        const recording = await onStreamStatusChange();
        if (recording) {
          setIsRecord(true);
          if (show.playbackId === recording) return;
          setPlaybackId(recording as string);
          setLoading(false);
        } else {
          if (show.isRecording) {
            setIsLive(false);
            setIsRecord(show.isRecording);
            setLoading(false);
          } else {
            setLoading(false);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching playback info:", error);
    }
  };

  const onStreamStatusChange = async () => {
    if (!isLive) {
      const streamId = await getStreamId(show.playbackId);
      if (!streamId) return;
      return await pollRecordingStatus(streamId);
    } else {
      setIsWaiting(false);
    }
  };

  const onCountdownComplete = async () => {
    setStartingSoon(true);
    const interval = setInterval(async () => {
      try {
        const playbackData = await fetchPlaybackInfo(show.playbackId);
        if (playbackData?.meta?.live) {
          setIsLive(true);
          clearInterval(interval);
        }
      } catch (error) {
        console.error("Error fetching playback info:", error);
      }
    }, 3000);
  };

  const joinAsSpeaker = async () => {
    push(`/host/show/${show.playbackId}`);
  };

  useEffect(() => {
    startPollingPlaybackInfo();
  }, []);

  const isMobile = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  };

  const downloadRecording = async () => {
    const recordingUrl = PLAYBACK_URL_PREFIX + playbackId + PLAYBACK_URL_SUFFIX;
    const a = document.createElement("a");
    a.href = recordingUrl;
    a.setAttribute("download", "recording.m3u8");
    document.body.appendChild(a);
    a.click();
    a.parentNode?.removeChild(a);
  };

  return (
    <div className="w-full bg-no-repeat h-screen o">
      <Nav fromShow={!isMobile()} config={config.fields} />
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <svg
            aria-hidden="true"
            className="w-10 h-10 -mt-20 text-gray-200 animate-spin dark:text-gray-600"
            style={{
              fill: config.fields.brandColor,
            }}
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
      ) : (
        <div
          className=" flex flex-col lg:flex-row max-w-[130rem] "
          style={{
            // Align in the center of the screen
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div className="mt-2 lg:mt-0 w-full lg:w-10/12">
            {isRecord ? (
              <Player
                playbackId={playbackId}
                muted={true}
                autoPlay={true}
                lowLatency={true}
              />
            ) : (
              <>
                {isLive ? (
                  <Player
                    playbackId={playbackId}
                    muted={true}
                    autoPlay={true}
                    lowLatency={true}
                  />
                ) : (
                  <Countdown
                    show={show}
                    onCountdownComplete={onCountdownComplete}
                    config={config.fields}
                    startingSoon={startingSoon}
                    guest={show.guest}
                    isWaiting={isWaiting}
                  />
                )}
              </>
            )}
            <div className="flex flex-row justify-between items-center">
              <div className="m-4 flex flex-row  justify-center mt-6">
                <img
                  className="w-10 h-10 lg:w-14 lg:h-14 rounded-2xl"
                  src={show.guest?.image?.url}
                />
                <div className="flex flex-col ml-4 justify-center">
                  <h2 className="text-md lg:text-xl text-white font-semibold">
                    {show.title}
                  </h2>
                  <p className="lg:mt-2">
                    <span className="text-sm lg:text-md text-white/80 font-medium">
                      {show.guest?.name}
                    </span>
                  </p>
                </div>
              </div>
              {isHost && (
                <div className="flex flex-row">
                  {isRecord && (
                    <Button
                      onClick={downloadRecording}
                      variant={"ghost"}
                      className="text-md text-gray-500 mr-4 hidden lg:block"
                    >
                      Download recording
                    </Button>
                  )}
                  <Button
                    onClick={joinAsSpeaker}
                    variant={"ghost"}
                    className="text-md text-gray-500 mr-4 hidden lg:block"
                  >
                    Join as speaker
                  </Button>
                </div>
              )}
            </div>
          </div>
          <Sidebar />
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

export default Show;
