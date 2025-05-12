"use client";
import React from "react";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { profileState } from "@/recoil/state";

const Menu = ({ activePage, onClose }: { activePage: string; onClose: () => void }) => {
  const profile = useRecoilValue(profileState);
  const isEmployee = profile?.data?.role === "EMPLOYEE";
  const handleLinkClick = () => {
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-2">
        <Link
          href={"/"}
          onClick={handleLinkClick}
          className={`${
            activePage === "/" ? "text-primary bg-[#FFFFFF1A]" : "text-[#CED4DA] bg-none hover:text-primary"
          } flex p-3 gap-3 rounded-xl`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9 22V12H15V22M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
              stroke={activePage === "/" ? "#FF004D" : "#CED4DA"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h1 className="text-[16px]">Home</h1>
        </Link>

        {/* User */}
        {!isEmployee && (
          <Link
            href={"/user"}
            className={`${
              activePage === "/user" ? "text-primary bg-[#FFFFFF1A]" : "text-[#CED4DA] bg-none hover:text-primary"
            } flex p-3 gap-3 rounded-xl`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19 21V19C19 17.9391 18.5786 16.9217 17.8284 16.1716C17.0783 15.4214 16.0609 15 15 15H9C7.93913 15 6.92172 15.4214 6.17157 16.1716C5.42143 16.9217 5 17.9391 5 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                stroke={activePage === "/user" ? "#FF004D" : "#CED4DA"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <h1 className="text-[16px]">User Management</h1>
          </Link>
        )}

        {/* Post */}
        <Link
          href={"/post"}
          className={`${
            activePage === "/post" ? "text-primary bg-[#FFFFFF1A]" : "text-[#CED4DA] bg-none hover:text-primary"
          } flex p-3 gap-3 rounded-xl`}
        >
          <svg
            id="Layer_1"
            data-name="Layer 1"
            height={24}
            width={24}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 122.88 112.04"
          >
            <defs>
              <style>{`.cls-1{fill-rule:evenodd;}`}</style>
            </defs>
            <title>writing</title>
            <path
              className="cls-1"
              d="M109.28,19.61l12.21,9.88a3.77,3.77,0,0,1,.56,5.29l-5.46,6.75L98.53,26.93,104,20.17a3.79,3.79,0,0,1,5.29-.56ZM21.07,30.81a3.18,3.18,0,0,1,0-6.36H74.12a3.18,3.18,0,0,1,0,6.36ZM9.49,0H85.71A9.53,9.53,0,0,1,95.2,9.49v5.63l-4.48,5.53a9.81,9.81,0,0,0-1.18,1.85c-.24.19-.48.4-.71.62V9.49a3.14,3.14,0,0,0-3.12-3.13H9.49A3.14,3.14,0,0,0,6.36,9.49v93.06a3.16,3.16,0,0,0,.92,2.21,3.11,3.11,0,0,0,2.21.92H85.71a3.12,3.12,0,0,0,3.12-3.13V88.2l1.91-.81a10,10,0,0,0,4.34-3.13l.12-.14v18.43A9.54,9.54,0,0,1,85.71,112H9.49A9.51,9.51,0,0,1,0,102.55V9.49A9.53,9.53,0,0,1,9.49,0ZM21.07,87.6a3.19,3.19,0,0,1,0-6.37H56.19a37.1,37.1,0,0,0-.3,6.37Zm0-18.93a3.19,3.19,0,0,1,0-6.37H59.22l0,.27-1.05,6.1Zm0-18.93a3.18,3.18,0,0,1,0-6.36H72.44l-5.11,6.36ZM87.25,78,74.43,83.47c-9.35,3.47-8.93,5.43-8-3.85L69.24,63.4h0l0,0,26.56-33,18,14.6L87.27,78ZM72.31,65.89l11.86,9.59-8.42,3.6c-6.6,2.83-6.42,4.23-5.27-2.53l1.83-10.66Z"
              fill={activePage === "/post" ? "#FF004D" : "#CED4DA"}
              stroke={activePage === "/post" ? "#FF004D" : "#CED4DA"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h1 className="text-[16px]">Post Management</h1>
        </Link>

        <Link
          href={"/order"}
          onClick={handleLinkClick}
          className={`${
            activePage === "/order" ? "text-primary bg-[#FFFFFF1A]" : "text-[#CED4DA] bg-none hover:text-primary"
          } flex p-3 gap-3 rounded-xl`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.05078 2.05078H4.05078L6.71078 14.4708C6.80836 14.9256 7.06145 15.3323 7.42649 15.6206C7.79153 15.909 8.24569 16.0611 8.71078 16.0508H18.4908C18.946 16.05 19.3873 15.8941 19.7418 15.6086C20.0964 15.3232 20.3429 14.9253 20.4408 14.4808L22.0908 7.05078H5.12078M9.00073 21.001C9.00073 21.5533 8.55302 22.001 8.00073 22.001C7.44845 22.001 7.00073 21.5533 7.00073 21.001C7.00073 20.4487 7.44845 20.001 8.00073 20.001C8.55302 20.001 9.00073 20.4487 9.00073 21.001ZM20.0007 21.001C20.0007 21.5533 19.553 22.001 19.0007 22.001C18.4484 22.001 18.0007 21.5533 18.0007 21.001C18.0007 20.4487 18.4484 20.001 19.0007 20.001C19.553 20.001 20.0007 20.4487 20.0007 21.001Z"
              stroke={activePage === "/order" ? "#FF004D" : "#CED4DA"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h1 className="text-[16px]">Order Management</h1>
        </Link>

        {/* Tag */}
        <Link
          href={"/tag"}
          className={`${
            activePage === "/tag" ? "text-primary bg-[#FFFFFF1A]" : "text-[#CED4DA] bg-none hover:text-primary"
          } flex p-3 gap-3 rounded-xl`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.721 21H13.358C15.5854 21 16.6992 21 17.6289 20.4672C18.5586 19.9345 19.1488 18.958 20.3294 17.005L21.0102 15.8787C22.0034 14.2357 22.5 13.4142 22.5 12.5C22.5 11.5858 22.0034 10.7643 21.0102 9.12126L20.3294 7.99501C19.1488 6.04203 18.5586 5.06554 17.6289 4.53277C16.6992 4 15.5854 4 13.358 4H10.721C6.84561 4 4.90789 4 3.70394 5.2448C2.5 6.48959 2.5 8.49306 2.5 12.5C2.5 16.5069 2.5 18.5104 3.70394 19.7552C4.90789 21 6.8456 21 10.721 21Z"
              stroke={activePage === "/tag" ? "#FF004D" : "#CED4DA"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.5 7.99512V17"
              stroke={activePage === "/tag" ? "#FF004D" : "#CED4DA"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h1 className="text-[16px]">Tag Management</h1>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
