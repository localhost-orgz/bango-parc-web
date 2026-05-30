import { list_gallery } from "@/constants/gallery";
import React from "react";
import Image from "next/image";

function GallerySection() {
  return (
    <section className="w-full sm:px-8 px-4 py-16 bg-white">
      <h3 className="section-headline mb-10">Gallery</h3>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3">
        {list_gallery.map((img) => (
          <div key={img.id} className="break-inside-avoid mb-3">
            <Image
              src={img.src}
              alt="foto"
              width={400}
              height={300}
              className="w-full object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default GallerySection;
