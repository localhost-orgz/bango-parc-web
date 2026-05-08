import { Globe, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Footer() {
  const footer = {
    link: [
      {
        id: "address",
        icon: MapPin,
        label:
          "Jl. Bango Raya No.33, RT.7/RW.3, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12450",
        link: "https://share.google/jQjvgb7nl6W5XEAvY",
      },
      {
        id: "telephone",
        icon: Phone,
        label: "+62 821 0896 2233",
        link: "wa.me/6282108962233",
      },
      {
        id: "website",
        icon: Globe,
        label: "www.bango-parc.vercel.app",
        link: "https://bango-parc.vercel.app/",
      },
    ],
    pages: [
      {
        label: "Beranda",
        href: "/",
      },
      {
        label: "Tentang Kami",
        href: "/about",
      },
      {
        label: "Paket & Venue",
        href: "/paket",
      },
      {
        label: "Gallery",
        href: "/galeri",
      },
    ],
    packages: [
      {
        id: "paket-1",
        link: "",
        label: "Semi-indoor & Outdoor",
      },
      {
        id: "paket-2",
        link: "",
        label: "Indoor",
      },
      {
        id: "paket-3",
        link: "",
        label: "Signature Package",
      },
      {
        id: "paket-4",
        link: "",
        label: "Heritage Package  ",
      },
      {
        id: "paket-5",
        link: "",
        label: "Intimate Deluxe",
      },
      {
        id: "paket-6",
        link: "",
        label: "Royal Excellence",
      },
    ],
  };
  return (
    <footer className="w-full bg-[#36210b] grid-12 px-8 pt-10 pb-4">
      <div className="col-span-3">
        <Image
          src={"/logo-full.png"}
          height={100}
          width={100}
          alt="logo-footer"
          className="mb-7"
        />
        <div className="flex flex-col gap-2 mb-8">
          {/* {footer.} */}
          {footer.link.map(({ id, icon: Icon, label, link }) => (
            <div
              key={id}
              className={`flex flex-row ${id === "address" ? "items-start" : "items-center"}  gap-2`}
            >
              <Icon
                className="shrink-0 text-white"
                size={20}
                strokeWidth={1.2}
              />
              <Link
                href={link}
                className="text-white text-xs font-light hover:underline underline-offset-2"
              >
                {label}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-2 col-start-5 flex flex-col gap-5">
        <h6 className="text-white text-2xl font-crimson-pro">Quick Links</h6>
        <div className="flex flex-col gap-3">
          {footer.pages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="text-white font-light hover:underline w-fit text-sm"
            >
              {page.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="col-span-2 col-start-7 flex flex-col gap-5">
        <h6 className="text-white text-2xl font-crimson-pro">Packages</h6>
        <div className="flex flex-col gap-3">
          {footer.packages.map((p) => (
            <Link
              key={p.id}
              className="text-white font-light hover:underline w-fit text-sm"
              href={p.link}
            >
              {p.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="col-span-3 col-start-10 flex flex-col gap-5">
        <h6 className="text-white text-2xl font-crimson-pro ">
          Jam Operasional
        </h6>
        <div className="flex flex-col gap-1">
          <p className="text-sm text-white font-light">Setiap Hari</p>
          <p className="text-sm text-white font-light">08.00 - 22.00 WIB</p>
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-white font-light">
            Info lebih lanjut:
          </span>
          <div className="flex flex-row gap-2">
            <Link href={"instagram.com"}>
              <div className="border border-white hover:border-[#fffaee] p-1 w-fit mt-5 bg-transparent hover:bg-[#fffaee] text-white hover:text-[#896d51] transition-colors duration-300 relative group">
                <div className="px-3 py-1 opacity-0 group-hover:opacity-100 absolute left-1/2 bg-gray-800/70 -translate-x-1/2 top-0 group-hover:-top-6 transition-all duration-200 text-[8px] text-white">
                  <div className="absolute bg-gray-800/70 h-1 w-1 rotate-45 -bottom-1 left-1/2 -translate-y-1/2" />
                  Instagram
                </div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7"
                >
                  <g clipPath="url(#clip0_894_87904)">
                    <path
                      d="M4 8C4 6.93913 4.42143 5.92172 5.17157 5.17157C5.92172 4.42143 6.93913 4 8 4H16C17.0609 4 18.0783 4.42143 18.8284 5.17157C19.5786 5.92172 20 6.93913 20 8V16C20 17.0609 19.5786 18.0783 18.8284 18.8284C18.0783 19.5786 17.0609 20 16 20H8C6.93913 20 5.92172 19.5786 5.17157 18.8284C4.42143 18.0783 4 17.0609 4 16V8Z"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12Z"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M16.5 7.5V7.51"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </div>
            </Link>
            <Link href={"instagram.com"}>
              <div className="border border-white hover:border-[#fffaee] p-1 w-fit mt-5 bg-transparent hover:bg-[#fffaee] text-white hover:text-[#896d51] transition-colors duration-300 relative group">
                <div className="px-3 py-1 opacity-0 group-hover:opacity-100 absolute left-1/2 bg-gray-800/70 -translate-x-1/2 top-0 group-hover:-top-6 transition-all duration-200 text-[8px] text-white">
                  <div className="absolute bg-gray-800/70 h-1 w-1 rotate-45 -bottom-1 left-1/2 -translate-y-1/2" />
                  WhatsApp
                </div>
                <svg
                  className="w-7 h-7"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_894_87979)">
                    <path
                      d="M3 20.9997L4.65 17.1997C3.38766 15.4078 2.82267 13.2168 3.06104 11.0378C3.29942 8.8589 4.32479 6.84186 5.94471 5.36525C7.56463 3.88863 9.66775 3.05394 11.8594 3.01782C14.051 2.98171 16.1805 3.74665 17.8482 5.1691C19.5159 6.59154 20.6071 8.5737 20.9172 10.7436C21.2272 12.9135 20.7347 15.1219 19.5321 16.9545C18.3295 18.7871 16.4994 20.1177 14.3854 20.6968C12.2713 21.2759 10.0186 21.0636 8.05 20.0997L3 20.9997Z"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 10C9 10.1326 9.05268 10.2598 9.14645 10.3536C9.24021 10.4473 9.36739 10.5 9.5 10.5C9.63261 10.5 9.75979 10.4473 9.85355 10.3536C9.94732 10.2598 10 10.1326 10 10V9C10 8.86739 9.94732 8.74021 9.85355 8.64645C9.75979 8.55268 9.63261 8.5 9.5 8.5C9.36739 8.5 9.24021 8.55268 9.14645 8.64645C9.05268 8.74021 9 8.86739 9 9V10ZM9 10C9 11.3261 9.52678 12.5979 10.4645 13.5355C11.4021 14.4732 12.6739 15 14 15M14 15H15C15.1326 15 15.2598 14.9473 15.3536 14.8536C15.4473 14.7598 15.5 14.6326 15.5 14.5C15.5 14.3674 15.4473 14.2402 15.3536 14.1464C15.2598 14.0527 15.1326 14 15 14H14C13.8674 14 13.7402 14.0527 13.6464 14.1464C13.5527 14.2402 13.5 14.3674 13.5 14.5C13.5 14.6326 13.5527 14.7598 13.6464 14.8536C13.7402 14.9473 13.8674 15 14 15Z"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_894_87979">
                      <rect width="24" height="24" fill="currentColor" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="h-[0.5px] bg-[#fffaee]/70 w-full col-span-12 mt-5 -mb-1" />
      <div className="col-span-12 w-full flex justify-between">
        <span className="text-white text-xs font-light">
          &copy; 2024 Bango Parc. All Rights Reserved.
        </span>
        <span className="text-white text-xs font-light">
          Privacy Policy | Terms of Service
        </span>
      </div>
    </footer>
  );
}

export default Footer;
