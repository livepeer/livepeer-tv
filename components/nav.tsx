import React, { useContext } from "react";
import { Button } from "./ui/button";
import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Configuration, MenuAction, PageName } from "@/types";
import { UserContext } from "@/lib/user-context";
import { magic } from "@/lib/magic";
import useIsHost from "@/hooks/useIsHost";
import { useRouter } from "next/router";

export default function Nav({
  fromShow,
  isLive,
  onInviteGuestClick,
  onGoLiveClick,
  onEndLiveClick,
  config,
}: {
  fromShow?: boolean;
  isLive?: boolean;
  onInviteGuestClick?: () => void;
  onGoLiveClick?: () => void;
  onEndLiveClick?: () => void;
  config: Configuration;
}) {
  const isHost = useIsHost();
  const [user, setUser] = useContext(UserContext);
  const { pathname, push } = useRouter();

  const defaultMenu: MenuAction[] = [
    {
      type: "default",
      name: "upcoming shows",
    },
    {
      type: "default",
      name: "previous shows",
    },
    {
      type: "default",
      name: "host login",
    },
    {
      type: "action",
      name: config.brandWebsite,
      onClick: () => window.open("https://" + config.brandWebsite, "_blank"),
      icon: <ArrowUpRight className="inline-block w-4 h-4 ml-1" />,
    },
  ];

  const showMenu: MenuAction[] = [
    {
      type: "action",
      name: "Invite guest",
      onClick: () => onInviteGuestClick && onInviteGuestClick(),
    },

    {
      type: "action",
      name: isLive ? "End live" : "Go live",
      onClick: () =>
        isLive
          ? onEndLiveClick && onEndLiveClick()
          : onGoLiveClick && onGoLiveClick(),
    },
  ];

  const menu = pathname.includes("host/show")
    ? fromShow
      ? showMenu
      : defaultMenu
    : defaultMenu;

  const logoutHost = () => {
    //@ts-ignore
    magic.user.logout().then(() => {
      //@ts-ignore
      setUser({ user: null });
      localStorage.removeItem("isHost");
      window.location.reload();
    });
  };

  const pagesRoutes: Record<PageName, string> = {
    "upcoming shows": "/#upcoming",
    "previous shows": "/#previous",
    "host login": "/host/login",
  };

  const navigateToPage = (name: PageName) => {
    const route = pagesRoutes[name];
    if (route) push(route);
  };

  return (
    <header>
      {isHost && <HostBanner config={config} logoutHost={logoutHost} />}
      <nav className="sticky top-0 z-10 backdrop-filter backdrop-blur-2xl bg-opacity-10 border-b border-gray-600/10">
        <div
          className={clsx({
            "px-20": fromShow,
            "max-w-7xl mx-auto px-8": !fromShow,
          })}
        >
          <div className="flex items-center justify-between h-[5vh] lg:h-[7vh]">
            {config?.brandLogo?.fields?.file?.url && (
              <Link href="/">
                <Image
                  src={String(config?.brandLogo?.fields?.file?.url).replace(
                    "//images.ctfassets.net",
                    "https://images.ctfassets.net"
                  )}
                  alt={config.brandName}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-5 w-auto lg:h-8"
                />
              </Link>
            )}
            <div className=" space-x-4 lg:flex hidden">
              {menu.map((item) => {
                if (item.name === "host login" && isHost) return null;
                return (
                  <Button
                    key={item.name}
                    variant={"ghost"}
                    onClick={
                      item.type == "default"
                        ? () => navigateToPage(item.name)
                        : item.onClick
                    }
                    className="text-lg text-gray-500 "
                  >
                    {item.name} {item.type == "action" && item?.icon}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

const HostBanner: React.FC<{
  config: Configuration;
  logoutHost: () => void;
}> = ({ config, logoutHost }) => (
  <div className="bg-zinc-900 h-12 flex items-center justify-center">
    <p className="text-white font-semibold">
      Logged in as host,
      <span
        className="cursor-pointer"
        onClick={logoutHost}
        style={{ color: config.brandColor }}
      >
        {" "}
        logout?
      </span>
    </p>
  </div>
);
