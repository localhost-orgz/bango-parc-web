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

      {/* about section */}
      <section className="w-full bg-white px-8 py-16">
        <div className="grid-12">
          <div className="col-span-2">
            <h6 className="section-title">Tentang Kami</h6>
          </div>
          <div className="col-start-7 col-span-6">
            <h3 className="section-headline">
              Bango Parc adalah ruang di mana setiap perayaan terasa seperti di
              rumah sendiri
            </h3>
          </div>
        </div>
        <div className="grid-12 mt-10">
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

      {/* areas section */}
      <section className="w-full bg-white px-8 py-16">
        <div className="mb-5">
          <h6 className="section-title">Areas</h6>
        </div>
        <div className="grid-12">
          <div className="col-span-5 flex flex-col gap-3">
            <h3 className="section-headline">
              Temukan ruang yang tepat untuk setiap acara
            </h3>
            <p className="section-subheadline">
              Dari suasana terbuka yang segar hingga ruang indoor yang intim —
              Bango Parc menyediakan tiga pilihan area yang bisa didekorasi dan
              disesuaikan sepenuhnya.
            </p>
          </div>
        </div>
        <div className="grid-12 mt-5">
          <div className="relative col-span-4 w-full h-auto aspect-video bg-slate-200">
            <div
              style={{ backgroundImage: "url('/indoor.jpg')" }}
              className="absolute inset-0 top-0 left-0 bg-cover bg-center"
            />
            <div className="bg-black/40 absolute inset-0 flex justify-center items-center">
              <span className="font-crimson-text text-white text-2xl">
                Indoor
              </span>
              <div className="absolute bottom-3 right-3 py-1.5 px-2.5 flex flex-row gap-2 bg-white items-center">
                <svg
                  className="w-5 h-5"
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_148_32)">
                    <path
                      d="M32 42.6666H42.6667V53.3333"
                      stroke="black"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M51.8879 29.4446C54.1812 23.1353 53.8132 17.2313 50.2879 13.7113C44.2292 7.64727 31.1279 10.9246 21.0266 21.0259C10.9253 31.1273 7.64792 44.2286 13.7093 50.2899C19.6479 56.2259 32.3412 53.2046 42.3492 43.5833"
                      stroke="black"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_148_32">
                      <rect width="64" height="64" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <span className="text-sm">EXPLORE 360°</span>
              </div>
            </div>
          </div>
          <div className="relative col-span-4 w-full h-auto aspect-video bg-slate-200">
            <div
              style={{ backgroundImage: "url(/semi-indoor.jpg)" }}
              className="absolute inset-0 top-0 left-0 bg-cover bg-center"
            />
            <div className="bg-black/40 absolute inset-0 flex justify-center items-center">
              <span className="font-crimson-text text-white text-2xl">
                Semi-indoor
              </span>
              <div className="absolute bottom-3 right-3 py-1.5 px-2.5 flex flex-row gap-2 bg-white items-center">
                <svg
                  className="w-5 h-5"
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_148_32)">
                    <path
                      d="M32 42.6666H42.6667V53.3333"
                      stroke="black"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M51.8879 29.4446C54.1812 23.1353 53.8132 17.2313 50.2879 13.7113C44.2292 7.64727 31.1279 10.9246 21.0266 21.0259C10.9253 31.1273 7.64792 44.2286 13.7093 50.2899C19.6479 56.2259 32.3412 53.2046 42.3492 43.5833"
                      stroke="black"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_148_32">
                      <rect width="64" height="64" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <span className="text-sm">EXPLORE 360°</span>
              </div>
            </div>
          </div>
          <div className="relative col-span-4 w-full h-auto aspect-video bg-slate-200">
            <div
              style={{
                backgroundImage: "url(/outdoor.jpg)",
              }}
              className="absolute inset-0 top-0 left-0 bg-center bg-cover"
            />
            <div className="bg-black/40 absolute inset-0 flex justify-center items-center">
              <span className="font-crimson-text text-white text-2xl">
                Outdoor
              </span>
              <div className="absolute bottom-3 right-3 py-1.5 px-2.5 flex flex-row gap-2 bg-white items-center">
                <svg
                  className="w-5 h-5"
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_148_32)">
                    <path
                      d="M32 42.6666H42.6667V53.3333"
                      stroke="black"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M51.8879 29.4446C54.1812 23.1353 53.8132 17.2313 50.2879 13.7113C44.2292 7.64727 31.1279 10.9246 21.0266 21.0259C10.9253 31.1273 7.64792 44.2286 13.7093 50.2899C19.6479 56.2259 32.3412 53.2046 42.3492 43.5833"
                      stroke="black"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_148_32">
                      <rect width="64" height="64" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <span className="text-sm">EXPLORE 360°</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* testimonials section */}
      <section className="w-full bg-white px-8 py-16"></section>
    </main>
  );
}
