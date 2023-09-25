//@ts-nocheck
import type { Asset as ContentfulAsset, EntryFields } from "contentful";

export interface Host {
  email: EntryFields.Symbol;
  name: EntryFields.Symbol;
}
export type PageName = "upcoming shows" | "previous shows" | "host login";

export interface ExtendedAsset extends ContentfulAsset {
  url: string;
}

export type MenuAction =
  | { type: "action"; name: string; onClick: () => void; icon?: JSX.Element }
  | { type: "default"; name: PageName };

export interface Guest {
  name: EntryFields.Symbol;
  image: ExtendedAsset;
  imageNoBackground: ExtendedAsset;
  twitterHandle: EntryFields.Symbol;
  otherLink: EntryFields.Symbol;
  email: EntryFields.Symbol;
}

export interface Show {
  title: EntryFields.Symbol;
  date: EntryFields.Date;
  description: EntryFields.Text;
  guest: Guest;
  roomId: EntryFields.Symbol;
  inviteLink: EntryFields.Symbol;
  playbackId: EntryFields.Symbol;
  color:
    | "blue"
    | "green"
    | "indigo"
    | "orange"
    | "pink"
    | "purple"
    | "red"
    | "teal"
    | "yellow";
  isRecording: EntryFields.Boolean;
}

export interface Configuration {
  brandName: string;
  brandWebsite: string;
  brandLogo: Asset;
  brandColor: string;
  baseUrl: string;
  twitterHandle: string;
  lensHandle: string;
  discordServer: string;
  title: string;
  description: string;
  videos: Asset[];
  upcomingTitle: string;
  upcomingDescription: string;
  previousTitle: string;
  previousDescription: string;
}

export interface Asset {
  sys: Sys;
  fields: Fields;
}
export interface Sys {
  id: string;
  type: string;
  linkType: string;
}

export interface Fields {
  title: string;
  description: string;
  file: File;
}

export interface File {
  url: string;
  fileName: string;
  contentType: string;
}
