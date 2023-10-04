import { getPreviousShows, getUpcomingShows } from "@/lib/api";
import { Show } from "@/types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Sidebar() {
  const [shows, setShows] = useState<Show[]>([]);
  const { query } = useRouter();

  const getAllShows = async () => {
    const shows = await getPreviousShows();
    const currentShow = query.id;

    const filteredShows = shows.filter(
      (show) => show.playbackId !== currentShow
    );
    setShows(filteredShows);
  };

  useEffect(() => {
    getAllShows();
  }, []);

  return (
    <div className="p-4 border-gray-600/20 border-l">
      <h4 className="text-white text-lg font-semibold">Other Shows</h4>
      {shows.map((show) => (
        <div
          key={show.playbackId}
          className="mt-3 w-full lg:w-[17rem] p-3 rounded-lg  bg-gray-600/10 hover:bg-gray-400/10 hover:cursor-pointer"
        >
          <h5 className="text-white/80  text-[0.9rem] font-medium">
            {show.title}
          </h5>
          <div className="flex items-center">
            <img
              className="w-8 h-8 rounded-full mt-2"
              src={show.guest?.image?.url}
            />
            <p className="text-sm ml-2 mt-4 font-medium text-gray-500">
              {show.guest?.name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
