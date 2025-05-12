"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { clearToken, setRefreshToken, setToken } from "@/helper/storage";
import { destroyCookie } from "nookies";
import Menu from "./Menu";

import logo from "@/assets/Logo2.svg";
import smallLogo from "@/assets/small-logo.svg";
import avatar from "@/assets/Avatar.svg";
import logoutIcon from "@/assets/logout.svg";

import { useRecoilState } from "recoil";
import { profileState } from "@/recoil/state";

const Sidebar = ({ isOpen, activePage }: { isOpen: boolean; activePage: any }) => {
  const router = useRouter();
  const [profile, setProfile] = useRecoilState(profileState);
  const profileAvatar = profile?.data?.avatar;

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
    <>
      <div className="bg-[#212529] flex flex-col py-6 px-4 h-screen">
        <div className="flex-grow flex flex-col">
          <div onClick={() => router.push("/")} className="mb-6 cursor-pointer">
            {isOpen ? (
              <Image src={logo} alt="big logo" />
            ) : (
              <Image src={smallLogo} alt="small logo" className="mx-auto" />
            )}
          </div>

          <Menu activePage={activePage} isOpen={isOpen} />
        </div>

        <div className="h-px bg-[#343a40] my-6"></div>

        <div className={`flex items-start mt-auto ${isOpen ? "px-2" : "px-0"} `}>
          <div className={` ${isOpen ? "mr-3" : "mr-0"} w-[48px] flex flex-shrink-0 cursor-pointer`}>
            <Image
              src={profileAvatar ? profileAvatar : avatar}
              alt="avatar"
              height={48}
              width={48}
              className="h-12 w-12 rounded-full"
            />
          </div>

          {isOpen && (
            <>
              <div className="w-[151px] my-auto cursor-pointer">
                <h1 className="text-[#fff] font-medium truncate">{profile?.data?.name}</h1>
                <h2 className="text-[#CED4DA] text-[14px] truncate">{profile?.data?.email}</h2>
              </div>

              <div onClick={logout} className="w-[36px] flex flex-shrink-0 cursor-pointer">
                <Image src={logoutIcon} alt="icon" height={36} width={36} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
