import { auth } from "@/auth/auth";
import React from "react";
import Navbar from "./Navbar";

async function NavbarContainer() {
  const session = await auth();

  return <Navbar sesssion={session || null} />;
}

export default NavbarContainer;
