"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Drawer } from "antd";
import DrawerContent from "./DrawerContent";

import avatar from "@/assets/Avatar.svg";
import smallLogo from "@/assets/small-logo.svg";
import menu from "@/assets/mobileMenu.svg";
import { profileState } from "@/recoil/state";
import { useRecoilValue } from "recoil";

const Header = ({ activePage, isOpen }: { activePage: any; isOpen: boolean }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const profile = useRecoilValue(profileState);
  const profileAvatar = profile?.data?.avatar;

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth > 768;
      if (isSmall) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="bg-[#212529] h-[64px] w-full flex items-center justify-between pl-2 pr-4 relative z-10">
        <div className="flex gap-2 items-center">
          <div onClick={() => setOpen(true)} className="h-12 w-12 flex items-center justify-center cursor-pointer">
            <Image src={menu} alt="menu" />
          </div>
          <div className="cursor-pointer" onClick={() => router.push("/")}>
            <Image src={smallLogo} alt="logo" />
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="cursor-pointer" onClick={() => router.push("/profile")}>
            <Image
              src={profileAvatar ? profileAvatar : avatar}
              alt="avatar"
              height={48}
              width={48}
              className="h-12 w-12 rounded-full"
            />
          </div>
        </div>
      </div>

      <Drawer
        placement="left"
        closable={false}
        onClose={() => setOpen(false)}
        open={open}
        width="362px"
        style={{
          backgroundColor: "#212529",
          padding: "16px",
        }}
        zIndex={11}
      >
        <DrawerContent activePage={activePage} onClose={() => setOpen(false)} />
      </Drawer>
    </>
  );
};

export default Header;
