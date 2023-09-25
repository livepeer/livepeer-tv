//@ts-nocheck

import React, { useRef, useState } from "react";
import { Button } from "./button";
import { ArrowUpRight } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { Show } from "@/types";

export default function ShowCard({ show }: { show: Show }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const { guest } = show;

  const text = `text-${show.color}-400`;
  const fill = `fill-${show.color}-400`;

  return (
    <Link href={`/show/${show.playbackId}`}>
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="border w-full relative  border-gray-600/20 rounded-2xl "
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.06), transparent 40%)`,
        }}
      >
        <div className="p-5 lg:p-7">
          <p className={`text-xl font-medium ${text} hover:${text}`}>
            {guest?.name}
          </p>
          <h4 className="mt-10 text-white text-2xl font-semibold">
            {show.title}
          </h4>
          <p className="mt-6 text-gray-400 text-lg">{show.description}</p>
        </div>
        <div className="flex flex-row justify-between">
          <div className="p-5 pr-0 lg:p-7">
            <h4 className="mt-10 text-white text-md lg:text-2xl font-semibold">
              {moment(show?.date).format("MMM D")}
            </h4>
            <p className="mt-2 text-gray-500 text-sm lg:text-lg">
              10:30 AM EST{" "}
            </p>

            <Button
              className={"mt-10 font-regular hidden lg:block"}
              variant={"secondary"}
              size={"icon"}
            >
              <ArrowUpRight className="inline-block w-8 h-8 overflow-hidden z-10" />
            </Button>
          </div>
          <img
            src={guest?.imageNoBackground?.url}
            className=" h-full grayscale rounded-br-2xl w-60 lg:w-72"
          />
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="flex flex-row-reverse absolute bottom-0 right-0 opacity-20 rounded-2xl  lg:w-[600px] lg:h-[500px]"
          viewBox="0 0 1500 999"
          fill="none"
        >
          <g opacity="1" filter="url(#filter0_f_1_1157)">
            <path
              d="M1494 927.5C1494 1218.83 1249.1 1455 947 1455C644.9 1455 400 1218.83 400 927.5C400 636.17 644.9 400 947 400C1249.1 400 1494 636.17 1494 927.5Z"
              className={`${fill}`}
            />
          </g>
          <defs>
            <filter
              id="filter0_f_1_1157"
              x="0"
              y="0"
              width="1894"
              height="1855"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="200"
                result="effect1_foregroundBlur_1_1157"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </Link>
  );
}
