"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Menu from "./Menu";

import { useRecoilState } from "recoil";
import { profileState } from "@/recoil/state";
import { clearToken, setRefreshToken, setToken } from "@/helper/storage";
import { destroyCookie } from "nookies";

import logoutIcon from "@/assets/logout.svg";
import avatar from "@/assets/Avatar.svg";
import smallLogo from "@/assets/small-logo.svg";
import x from "@/assets/whiteClose.svg";

const DrawerContent = ({ activePage, onClose }: { activePage: any; onClose: () => void }) => {
  const router = useRouter();
  const [profile, setProfile] = useRecoilState(profileState);

  const logout = () => {
    clearToken();
    setToken("");
    setRefreshToken("");
    setProfile(null);
    destroyCookie(null, "ACCESS_TOKEN", { path: "/" });
    setTimeout(() => {
      window.location.replace("/auth/login");
    }, 500);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-grow flex-col">
        <div className="flex justify-between -mt-2 mb-6">
          <div className="flex gap-2 items-center">
            <div onClick={onClose} className="h-12 w-12 flex items-center justify-center cursor-pointer">
              <Image src={x} alt="close" />
            </div>
            <div className="cursor-pointer" onClick={() => router.push("/")}>
              <Image src={smallLogo} alt="logo" />
            </div>
          </div>
        </div>

        <Menu activePage={activePage} onClose={onClose} />
      </div>

      <div className="flex flex-col mt-auto px-2 w-full">
        <div className="flex items-start justify-between w-full">
          <div className="flex items-center cursor-pointer">
            <div className="mr-3 w-12 flex-shrink-0">
              <Image src={avatar} alt="avatar" height={48} width={48} />
            </div>
            <div className="truncate">
              <h1 className="text-white font-medium truncate">{profile?.data?.name}</h1>
              <h2 className="text-[#CED4DA] text-sm truncate">{profile?.data?.email}</h2>
            </div>
          </div>

          <div onClick={logout} className="w-9 flex-shrink-0 cursor-pointer">
            <Image src={logoutIcon} alt="logout icon" height={36} width={36} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawerContent;
