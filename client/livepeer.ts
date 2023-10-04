import config from "@/lib/config";
import {
  createClient,
  createReactClient,
  studioProvider,
} from "@livepeer/react";

export const client = createReactClient({
  provider: studioProvider({ apiKey: config.LIVEPEER_STUDIO_KEY as string }),
});

export const LIVEPEER_STUDIO_BASE_URL = "https://livepeer.studio/api";
export const PLAYBACK_URL_PREFIX = "https://lp-playback.com/hls/";
export const PLAYBACK_URL_SUFFIX = "/index.m3u8";

export const provider = createClient({
  provider: studioProvider({
    apiKey: config.LIVEPEER_STUDIO_KEY as string,
    baseUrl: "https://livepeer.studio/api",
  }),
}).provider;
