import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen relative w-full">
      {/* hero section */}
      <section className="w-full h-screen relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-[#0F131F]/50" />

        <header className="w-full h-20 bg-black/20 fixed top-0 left-0 flex items-center">
          <nav className="w-full flex flex-row justify-between items-center px-10">
            <Image src={"/logo-full.png"} alt="logo" width={85} height={85} />
            <ul className="flex flex-row gap-10">
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
              <span className="text-black">Login</span>
            </div>
          </nav>
        </header>
      </section>
    </main>
  );
}
