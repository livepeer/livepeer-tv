import React from "react";
import moment from "moment";
import Link from "next/link";
import { Configuration, Show } from "@/types";

export default function Previous({
  shows,
  config,
}: {
  shows: Show[];
  config: Configuration;
}) {
  return (
    <section id="previous" className="mt-8 lg:mt-20 p-5 lg:p-0">
      <h3 className="text-2xl lg:text-4xl  text-white font-clash-semibold text-transparent bg-clip-text bg-gradient-to-r from-white i to-gray-400">
        {config.previousTitle}
      </h3>
      <p className="mt-2 text-gray-200/50 text-md lg:text-lg">
        Watch the previous shows to get a taste of what&apos;s coming up.
      </p>

      {shows.length === 0 && (
        <div className="flex items-center justify-center mt-10">
          <p className="text-gray-200/50 text-lg">
            We don&apos;t have any shows at the moment. Please check back later.
          </p>
        </div>
      )}

      {shows?.map((show) => {
        const { guest } = show;
        return (
          <Link
            href={`/show/${show.playbackId}`}
            key={show.playbackId}
            className="flex md:flex-row flex-col  justify-between border-b border-gray-600/10 pb-4  py-8 hover:cursor-pointer"
          >
            <div className="flex md:items-center">
              <img
                className="w-14 h-14 rounded-full"
                src={guest?.image?.url}
                alt={guest?.name}
              />
              <h2 className=" text-md lg:text-xl ml-4 text-gray-200/50 font-medium">
                {show.title} with {guest?.name}
              </h2>
            </div>
            <div className="flex items-center justify-end mt-2">
              <h1 className=" text-gray-200/30">
                {" "}
                {moment(show?.date).format("MMM D")}
              </h1>
              <p className="ml-4 text-gray-200/30">10:30 AM EST </p>
            </div>
          </Link>
        );
      })}
    </section>
  );
}
