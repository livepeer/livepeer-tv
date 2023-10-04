import { Magic } from "magic-sdk";
import APIKeys from "./config";

const createMagic = (key: string) => {
  return typeof window !== "undefined" && new Magic(key);
};

export const magic = createMagic(APIKeys.MAGIC_PUBLISHABLE_KEY as string);
