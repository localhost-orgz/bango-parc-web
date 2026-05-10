import Image from "next/image";
import React from "react";

function BottomAbout() {
  return (
    <div className="grid-12 lg:mt-10 mt-7">
      <div className="lg:col-span-6 col-span-12 w-full flex flex-row lg:gap-5 gap-3 lg:order-1 order-2">
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
      <div className="lg:col-span-6 col-span-12 w-full lg:order-2 order-1">
        <p>
          Berawal dari sebuah rumah dengan halaman yang asri, Bango Parc kini
          hadir sebagai venue serbaguna yang memadukan kehangatan rumah dengan
          keeleganan sebuah venue premium.
          <br />
          <br />
          Kami percaya bahwa setiap momen — sekecil apapun — layak dirayakan
          dengan cara yang istimewa. Biarkan kami menjadi bagian dari cerita
          itu.
        </p>
      </div>
    </div>
  );
}

export default BottomAbout;
