import { Configuration, Guest, Show } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import moment from "moment";
import React from "react";
import { Button } from "../ui/button";
import { Copy, Instagram, Linkedin, Share2, Twitter } from "lucide-react";
import { DialogHeader } from "../ui/dialog";
import { Input } from "../ui/input";
import { LiaDiscord, LiaTelegramPlane } from "react-icons/lia";
import { AiOutlineReddit, AiOutlineWhatsApp } from "react-icons/ai";
import CountdownPackage from "react-countdown";

const Countdown = ({
  show,
  guest,
  isWaiting,
  startingSoon,
  onCountdownComplete,
  config,
}: {
  show: Show;
  guest: Guest;
  isWaiting: boolean;
  startingSoon: boolean;
  config: Configuration;
  onCountdownComplete: () => void;
}) => {
  const targetDate = new Date(show?.date) as any;
  const timeRemaining = targetDate - Date.now();

  const text = `text-blue-400`;
  const fill = `fill-blue-400`;

  return (
    <div className="w-full  bg-transparaent  aspect-video">
      <Dialog>
        <div className="border border-r-0 border-t-0 w-full relative  border-gray-600/20  h-full">
          <div className="p-4 lg:p-12 ">
            <p
              className={`text-md lg:text-2xl font-medium ${text} hover:${text}`}
            >
              {guest?.name}
            </p>
            <h4 className="text-lg mt-10 text-white lg:text-3xl font-semibold">
              {show?.title}
            </h4>
            <p className="text-md mt-2 lg:mt-6 text-gray-400 lg:text-lg lg:w-1/2 h-20 hidden lg:block">
              {show?.description}
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <div className="p-4 lg:p-12 pt-2 lg:pt-12">
              {isWaiting ? (
                <h4 className=" text-white text-sm lg:text-2xl font-semibold">
                  recording is being processed...
                </h4>
              ) : startingSoon ? (
                <h4 className=" text-white text-sm lg:text-2xl font-semibold">
                  Starting soon...
                </h4>
              ) : (
                <CountdownPackage
                  date={Date.now() + timeRemaining}
                  renderer={(props) => (
                    <CountdownRenderer
                      {...props}
                      onCountdownComplete={onCountdownComplete}
                    />
                  )}
                />
              )}

              <p className="mt-2 text-gray-400 text-sm lg:text-lg h-20">
                {isWaiting
                  ? "Please wait"
                  : moment(show?.date).format("MMMM Do YYYY, h:mm a")}
              </p>
              <DialogTrigger>
                <Button
                  className={
                    "-mt-4 font-regular  overflow-hidden z-20 relative hidden lg:block"
                  }
                  variant={"secondary"}
                  size={"icon"}
                >
                  <Share2 className="inline-block w-7 h-7 overflow-hidden z-10 -ml-1 " />
                </Button>
              </DialogTrigger>
            </div>
            <img
              src={guest?.imageNoBackground?.url}
              className="w-[40rem] h-auto  grayscale rounded-br-2xl absolute right-0 bottom-0 hidden lg:block"
            />
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="flex flex-row-reverse w-1800 absolute bottom-0 right-0 opacity-30 "
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share</DialogTitle>
            <DialogDescription>
              <p>
                Share this link with your friends to invite them to the show.
              </p>
              <div className="flex flex-row space-x-4">
                <Button
                  className={"mt-6 font-regular w-12 h-12"}
                  variant={"secondary"}
                  size={"icon"}
                >
                  <Twitter className="inline-block w-6 h-6 overflow-hidden z-10 " />
                </Button>
                <Button
                  className={"mt-6 font-regular w-12 h-12"}
                  variant={"secondary"}
                  size={"icon"}
                >
                  <Instagram className="inline-block w-6 h-6 overflow-hidden z-10 " />
                </Button>
                <Button
                  className={"mt-6 font-regular w-12 h-12"}
                  variant={"secondary"}
                  size={"icon"}
                >
                  <Linkedin className="inline-block w-6 h-6 overflow-hidden z-10 " />
                </Button>
                <Button
                  className={"mt-6 font-regular w-12 h-12"}
                  variant={"secondary"}
                  size={"icon"}
                >
                  <LiaDiscord className="inline-block w-6 h-6 overflow-hidden z-10 " />
                </Button>
                <Button
                  className={"mt-6 font-regular w-12 h-12"}
                  variant={"secondary"}
                  size={"icon"}
                >
                  <LiaTelegramPlane className="inline-block w-6 h-6 overflow-hidden z-10 " />
                </Button>
                <Button
                  className={"mt-6 font-regular w-12 h-12"}
                  variant={"secondary"}
                  size={"icon"}
                >
                  <AiOutlineWhatsApp className="inline-block w-6 h-6 overflow-hidden z-10 " />
                </Button>
                <Button
                  className={"mt-6 font-regular w-12 h-12"}
                  variant={"secondary"}
                  size={"icon"}
                >
                  <AiOutlineReddit className="inline-block w-6 h-6 overflow-hidden z-10 " />
                </Button>
              </div>
              <p className="mt-7">or copy the link below</p>
              <div className="bg-gray-500/10 rounded-xl mt-3 flex items-center">
                <Input
                  className="w-full h-12 text-md text-gray-400 bg-transparent"
                  placeholder={
                    (typeof window !== "undefined" && window.location.href) ||
                    ""
                  }
                  disabled
                />
                <Button
                  size={"icon"}
                  variant={"secondary"}
                  className="h-9 w-10 rounded-xl items-center flex justify-center bg-primary  mr-2 bg-opacity-80"
                >
                  <Copy className="w-5 h-5 -mt-0.5 " />
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Countdown;

const CountdownRenderer: React.FC<{
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
  onCountdownComplete: () => void;
}> = ({ days, hours, minutes, seconds, completed, onCountdownComplete }) => {
  if (completed) {
    onCountdownComplete();
    return null;
  }

  const timeString = humanizeTime(days, hours, minutes, seconds);
  return (
    <h4 className=" text-white text-2xl font-semibold">
      Starting in: {timeString}
    </h4>
  );
};

const humanizeTime = (
  days: number,
  hours: number,
  minutes: number,
  seconds: number
): string => {
  if (days > 0) {
    return `${days} day${days !== 1 ? "s" : ""}`;
  } else if (hours > 0) {
    return `${hours} hour${hours !== 1 ? "s" : ""}`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  } else {
    return `${seconds} second${seconds !== 1 ? "s" : ""}`;
  }
};
