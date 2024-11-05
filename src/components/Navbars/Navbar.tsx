"use client";
import Image from "next/image";
import React, { useState } from "react";
import SearchInput from "../UI/SearchInput";
import { Session } from "next-auth";
import { capitalizeFirstChar } from "@/lib/helpers";
import { signOutAction } from "@/lib/actionServer";
import Link from "next/link";
import NotificationBell from "../notifications/NotificationBell";
type Tsession = {
  sesssion: Session | null;
};

export default function Navbar({ sesssion }: Tsession) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  return (
    <div className="flex items-center justify-between p-4">
      {/*SearchBar*/}
      <div className="hidden lg:flex md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 p-2">
        <SearchInput />
      </div>
      {/*Icon and User*/}
      <div className="flex items-center gap-6 justify-end w-full">
        <Link
          href={"/list/messages"}
          className="bg-white rounded-full w-7 h-7 flex items-start justify-center cursor-pointer relative"
        >
          <Image src="/message.png" alt="message" width={20} height={20} />
          <span className="text-xs absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full">
            1
          </span>
        </Link>
        <div className="bg-white rounded-full w-7 h-7 flex items-start justify-center cursor-pointer relative">
          <NotificationBell>
            <Image
              src="/announcement.png"
              alt="announcement"
              width={20}
              height={20}
            />
          </NotificationBell>
          <span className=" text-xs absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full">
            1
          </span>
        </div>
        <div className="flex flex-col relative">
          <span className="text-xs leading-3 font-medium">
            {sesssion?.user.name}
          </span>
          <span className="text-[10px] text-gray-500  text-right">
            {capitalizeFirstChar(sesssion?.user.role)}
          </span>
        </div>
        <Image
          src={sesssion?.user.image || "/avatar.png"}
          alt="avatar"
          width={36}
          height={36}
          className="rounded-full cursor-pointer"
          onClick={toggleDropdown}
        />
        {isDropdownOpen && (
          <div className="absolute right-0 top-14 mt-2 w-48 bg-gray-50 shadow-lg rounded-md z-10 ">
            <Link
              href="/profile" // Link to profile page
              className="block px-4 py-2 text-sm text-gray-700 border-b-2 border-gray-200 hover:bg-gray-100 mb-1"
            >
              Profile
            </Link>
            <button
              onClick={async () => await signOutAction()} // Call signOut on logout
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
