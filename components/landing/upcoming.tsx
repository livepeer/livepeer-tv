import React from "react";
import ShowCard from "../ui/show-card";
import { Configuration, Show } from "@/types";

export default function Upcoming({
  shows,
  config,
}: {
  shows: Show[];
  config: Configuration;
}) {
  return (
    <section id="upcoming" className="mt-8 lg:mt-20  p-5 lg:p-0">
      <h3 className="text-2xl lg:text-4xl  text-white font-clash-semibold text-transparent bg-clip-text bg-gradient-to-r from-white i to-gray-400">
        {config.upcomingTitle}
      </h3>
      <p className="mt-2 text-gray-200/50 text-md lg:text-lg">
        {config.upcomingDescription}
      </p>
      {shows.length === 0 && (
        <div className="flex items-center justify-center mt-10">
          <p className="text-gray-200/50 text-lg">
            We don&apos;t have any upcoming shows at the moment. Please check
            back later.
          </p>
        </div>
      )}
      <div className="grid  gap-x-20 gap-y-10 mt-10 grid-cols-1 lg:grid-cols-2">
        {shows.map((show: Show) => (
          <ShowCard show={show} key={show.playbackId} />
        ))}
      </div>
    </section>
  );
}
