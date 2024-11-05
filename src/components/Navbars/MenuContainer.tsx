import React from "react";
import Menu from "./Menu";
import { auth } from "@/auth/auth";

async function MenuContainer() {
  const session = await auth();

  return <Menu sesssion={session || null} />;
}

export default MenuContainer;
