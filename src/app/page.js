import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen relative w-full">
      {/* hero section */}
      <section className="w-full h-screen relative flex justify-center items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-[#0F131F]/50" />
        <header className="w-full h-20 bg-black/10 fixed top-0 left-0 flex items-center">
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

        <div className="p-1 z-1 flex flex-col items-center gap-7">
          <div className="flex flex-row items-center gap-5">
            {/* kiri */}
            <svg
              className="mt-5"
              width="177"
              height="1"
              viewBox="0 0 177 1"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line y1="0.5" x2="177" y2="0.5" stroke="white" strokeWidth={1} />
            </svg>

            <Image src={"/logo-icon.png"} alt="logo" width={50} height={50} />

            {/* kanan */}
            <svg
              className="mt-5"
              width="177"
              height="1"
              viewBox="0 0 177 1"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line y1="0.5" x2="177" y2="0.5" stroke="white" strokeWidth={1} />
            </svg>
          </div>

          <div className="flex flex-col items-center gap-2">
            <h1 className="font-cinzel text-white text-center text-5xl font-light">
              Ruang untuk Momen yang Tak Terlupakan
            </h1>
            <h5 className="text-white text-center font-light text-lg w-[60%]">
              Bango Parc hadir sebagai ruang yang hangat, elegan, dan siap
              menjadi latar terbaik untuk setiap perayaan hidupmu.
            </h5>
          </div>
        </div>
      </section>
      <section className="w-full bg-white px-8 py-16">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-2">
            <h6 className="uppercase font-semibold">Tentang Kami</h6>
          </div>
          <div className="col-start-7 col-span-6">
            <h3 className="font-crimson-text text-4xl tracking-tight">
              Bango Parc adalah ruang di mana setiap perayaan terasa seperti di
              rumah sendiri
            </h3>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 mt-10">
          <div className="col-span-6 w-full flex flex-row gap-5">
            <Image
              className="w-full"
              src={"/about-1.jpg"}
              alt="about-photo"
              height={100}
              width={100}
            />
            <Image
              className="w-full"
              src={"/about-2.jpg"}
              alt="about-photo"
              height={100}
              width={100}
            />
          </div>
          <div className="col-span-6 w-full">
            <p>
              Berawal dari sebuah rumah dengan halaman yang asri, Bango Parc
              kini hadir sebagai venue serbaguna yang memadukan kehangatan rumah
              dengan keeleganan sebuah venue premium.
              <br />
              <br />
              Kami percaya bahwa setiap momen — sekecil apapun — layak dirayakan
              dengan cara yang istimewa. Biarkan kami menjadi bagian dari cerita
              itu.
            </p>
          </div>
        </div>
      </section>
      <section className="w-full bg-white px-8 py-16">
        <div>
          <h6 className="uppercase font-semibold">Areas</h6>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <h3></h3>
          <p></p>
        </div>
      </section>
    </main>
  );
}
