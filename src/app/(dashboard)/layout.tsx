import Menu from "@/components/Navbars/Menu";
import MenuContainer from "@/components/Navbars/MenuContainer";
import Navbar from "@/components/Navbars/Navbar";
import NavbarContainer from "@/components/Navbars/NavbarContainer";
import Image from "next/image";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      {/*left*/}
      <div className=" w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%]  p-4">
        <Link
          href="/"
          className="flex justify-center items-center lg:justify-start gap-2"
        >
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="hidden lg:block font-bold">Ace School</span>
        </Link>
        <MenuContainer />
      </div>
      {/*right*/}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col h-full">
        <NavbarContainer />
        {children}
      </div>
    </div>
  );
}
