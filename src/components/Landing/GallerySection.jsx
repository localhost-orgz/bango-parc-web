import { list_gallery } from "@/constants/gallery";
import React from "react";

function GallerySection() {
  return (
    <section className="w-full px-8 py-16 bg-white">
      <h3 className="section-headline mb-10">Gallery</h3>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3">
        {list_gallery.map((img) => (
          <div key={img.id} className="break-inside-avoid mb-3">
            <img src={img.src} alt="foto" className="w-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default GallerySection;
