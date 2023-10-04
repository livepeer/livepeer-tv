import { Configuration } from "@/types";
import clsx from "clsx";
import React from "react";

export default function Hero({ config }: { config: Configuration }) {
  return (
    <section className="p-5 lg:p-0">
      <h1 className="text-4xl lg:text-7xl text-white font-clash-semibold lg:w-1/2">
        {config.title}
      </h1>
      <p className="mt-4 text-md lg:text-xl text-gray-200/50">
        {config.description}
      </p>
      <div className="mt-10 grid grid-cols-2 lg:grid-cols-4  lg:gap-3">
        {config?.videos?.map((video, index) => (
          <div
            key={video?.sys?.id}
            className={clsx({
              "p-2 bg-gray-50/10 overflow lg:z-20 lg:w-80  rounded-3xl": true,
              "rotate-[5deg]": (index + 1) % 2 === 0,
              "-rotate-[5deg]": (index + 1) % 2 !== 0,
            })}
          >
            <div className="overflow-hidden relative rounded-3xl">
              <video
                className="w-82 h-82 relative object-cover"
                autoPlay
                loop
                muted
                src={video?.fields?.file?.url as string}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
