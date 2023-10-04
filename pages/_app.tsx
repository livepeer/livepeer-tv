import "@/styles/globals.css";
import "@/styles/fonts.css";
import "@/styles/livekit.css";
import "@livekit/components-styles";
import "@livekit/components-styles/prefabs";
import type { AppProps } from "next/app";
import { LivepeerConfig } from "@livepeer/react";
import { client } from "@/client/livepeer";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react";
import { UserContext } from "@/lib/user-context";
import { useState } from "react";
import { MagicUserMetadata } from "magic-sdk";

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<MagicUserMetadata | null>(null);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <ContentfulLivePreviewProvider locale="en-US">
        <TooltipProvider>
          <LivepeerConfig client={client}>
            <Component {...pageProps} />
            <Toaster />
          </LivepeerConfig>
        </TooltipProvider>
      </ContentfulLivePreviewProvider>
    </UserContext.Provider>
  );
}
