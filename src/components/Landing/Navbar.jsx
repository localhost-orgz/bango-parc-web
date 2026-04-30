import Image from "next/image";
import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <header className="w-full h-20 fixed top-0 left-0 flex items-center">
      <nav className="w-full flex flex-row justify-between items-center px-10">
        <Image src={"/logo-full.png"} alt="logo" width={85} height={85} />
        <ul className="flex flex-row gap-10 text-white font-light text-md">
          <li>
            <Link href={"#"}>Beranda</Link>
          </li>
          <li>
            <Link href={"#"}>Tentang</Link>
          </li>
          <li>
            <Link href={"#"}>Akomodasi</Link>
          </li>
          <li>
            <Link href={"#"}>Galeri</Link>
          </li>
        </ul>
        <div className="bg-white py-2 px-3">
          <span className="text-black font-crimson-pro">Login</span>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
