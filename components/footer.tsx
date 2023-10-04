import React from "react";
import { Configuration } from "@/types";

export default function Footer({ config }: { config: Configuration }) {
  return (
    <div className="flex flex-row items-center justify-center my-4 ">
      <p className="mt-2 text-gray-200/50 text-sm">
        Copyright 2023, {config.brandName}
      </p>
    </div>
  );
}
