import React, { createContext } from "react";
import { MagicUserMetadata } from "magic-sdk";

type UserContextType = [
  MagicUserMetadata | null,
  React.Dispatch<React.SetStateAction<MagicUserMetadata | null>>
];

const defaultUserState: UserContextType = [null, () => {}];

export const UserContext = createContext<UserContextType>(defaultUserState);
