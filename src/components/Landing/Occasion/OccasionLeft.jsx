import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

function OccasionLeft() {
  return (
    <div className="col-span-5 flex flex-col justify-between">
      <h6 className="section-title">Occasion</h6>
      <div className="mb-3">
        <div className="flex flex-col items-start gap-3">
          <h3 className="section-headline">
            Apapun acaranya, Bango Parc siap menyambutmu
          </h3>
          <p className="section-subheadline">
            Pernikahan, ulang tahun, gathering kantor, pengajian, atau sekadar
            momen kebersamaan keluarga — kami hadir untuk semua perayaan yang
            berarti bagimu.
          </p>
        </div>
        <div className="flex gap-3 mt-5">
          <div className="h-10 w-10 border rounded-full flex justify-center items-center">
            <ChevronLeft strokeWidth={1.5} />
          </div>
          <div className="h-10 w-10 border rounded-full flex justify-center items-center">
            <ChevronRight strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OccasionLeft;
