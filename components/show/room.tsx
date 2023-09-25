import React from "react";
import { Room, VideoPresets } from "livekit-client";
import {
  formatChatMessageLinks,
  LiveKitRoom,
  VideoConference,
} from "@livekit/components-react";
import { toast } from "../ui/use-toast";

export default function RoomPage({ token }: { token: string }) {
  const room = new Room({
    videoCaptureDefaults: {
      resolution: VideoPresets.h540,
    },
    publishDefaults: {
      videoEncoding: {
        maxBitrate: 600_000,
        maxFramerate: 30,
      },
      screenShareEncoding: {
        maxBitrate: 1_000_000,
        maxFramerate: 30,
      },
    },
  });

  const leaveRoom = () => {
    toast({
      title: "You have left the room, redirecting you to the homepage",
    });
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

  return (
    <div className="aspect-video text-white">
      <LiveKitRoom
        token={token}
        style={{
          height: "80vh",
        }}
        onDisconnected={leaveRoom}
        serverUrl={"wss://livepeer-prod-aeuyf3b7.livekit.cloud"}
        room={room}
      >
        <VideoConference chatMessageFormatter={formatChatMessageLinks} />
      </LiveKitRoom>
    </div>
  );
}
