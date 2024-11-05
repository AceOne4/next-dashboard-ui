import SignIn from "@/components/SigninPage";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <>
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex justify-center items-center lg:justify-start gap-2"
          >
            <Image src="/logo.png" alt="logo" width={32} height={32} />
            <span className="hidden lg:block font-bold">Ace School</span>
          </Link>

          {/* Navbar */}
          <nav className="space-x-6">
            <Link
              href="/aboutUs"
              className="text-gray-500 hover:text-lamaPurple"
            >
              About Us
            </Link>
            <Link
              href="/contactUs"
              className="text-gray-500 hover:text-lamaPurple"
            >
              Contact Us
            </Link>
            <Link
              href="/login"
              className="text-white bg-lamaYellow hover:bg-lamaYellowLight px-4 py-2 rounded-md"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <SignIn />
    </>
  );
}

export default page;
