import Nav from "@/components/nav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { getConfig, getShowFromPlaybackId } from "@/lib/api";
import { Show } from "@/types";
import shortenName from "@/lib/shorten-name";
import { ArrowRight, Camera, CameraOff, Mic, MicOff } from "lucide-react";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";

export default function Invite({ show, config }: { show: Show; config: any }) {
  const [name, setName] = useState(show.guest.name);
  const [isCameraOff, setIsCameraOff] = useState(true);
  const [isMicOff, setIsMicOff] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (isCameraOff || isMicOff) {
      stopMediaStream();
    } else {
      startMediaStream();
    }
  }, [isCameraOff, isMicOff]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: !isCameraOff,
        audio: !isMicOff,
      })
      .then((stream) => {
        setVideoStream(stream);
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
      });
  }, [isCameraOff, isMicOff]);

  useEffect(() => {
    if (videoStream && videoRef.current) {
      videoRef.current.srcObject = videoStream;
    }
  }, [videoStream]);

  const startMediaStream = async () => {
    try {
      const userMedia = await navigator.mediaDevices.getUserMedia({
        video: !isCameraOff,
        audio: !isMicOff,
      });
      setStream(userMedia);
    } catch (error) {
      console.error("Error accessing camera and/or microphone:", error);
    }
  };

  const stopMediaStream = () => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      setStream(null);
    }
  };

  const toggleCamera = async () => {
    setIsCameraOff(!isCameraOff);
  };

  const toggleMic = async () => {
    setIsMicOff(!isMicOff);
  };

  const { push } = useRouter();

  const joinStage = async () => {
    if (!name) {
      toast({
        title: "Please enter your name",
      });
      return;
    }
    push(`/host/show/${show.playbackId}?from=invite&name=${name}`);
  };
  return (
    <div>
      <Nav config={config.fields} />
      <div className="flex items-center justify-center h-screen">
        <div className="bg-zinc-900 rounded-2xl w-[40rem] mb-20 p-4 flex flex-row ">
          <div className="relative">
            {isCameraOff ? (
              <div className="w-64 h-64 bg-zinc-800 rounded-2xl flex items-center justify-center">
                <Avatar className="w-20 h-20 text-lg uppercase">
                  <AvatarFallback>
                    {name ? shortenName(name) : "NA"}
                  </AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <video
                className="w-64 h-64 object-cover rounded-2xl"
                autoPlay
                loop
                muted
                ref={videoRef}
              />
            )}

            <div className="absolute bottom-2 ml-20">
              <Button
                className={"w-10 h-10  text-white bg-zinc-900"}
                variant={"ghost"}
                size={"icon"}
                onClick={toggleCamera}
              >
                {isCameraOff ? (
                  <CameraOff className="h-5" />
                ) : (
                  <Camera className="h-5" />
                )}{" "}
              </Button>
              <Button
                className={"w-10 h-10 ml-4 text-white bg-zinc-900"}
                variant={"ghost"}
                size={"icon"}
                onClick={toggleMic}
              >
                {isMicOff ? (
                  <MicOff className="h-5" />
                ) : (
                  <Mic className="h-5" />
                )}{" "}
              </Button>
            </div>
          </div>
          <div className="ml-5">
            <h2 className="text-white text-2xl font-semibold mt-2">
              Welcome {name}
            </h2>
            <p className="mt-2 text-gray-200/50 text-sm">
              Preview your video and audio before joining the stage
            </p>
            <Input
              placeholder="Your name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              defaultValue={show.guest.name}
              className="mt-4 rounded-xl h-12 text-white"
            />
            <Button onClick={joinStage} className="mt-14 rounded-lg">
              Join Stage
              <ArrowRight className="h-4 ml-1 mt-0.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const show = await getShowFromPlaybackId(params.id);
  const config = await getConfig(false);

  return {
    props: { show: show[0], config: config[0] },
  };
}
