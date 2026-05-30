"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { formatMoney } from "@/utils/format";

export default function AreaEditModal({
  isOpen,
  onOpenChange,
  onSuccess,
  data,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [facilityIds, setFacilityIds] = useState([]);
  const [areaPrices, setAreaPrices] = useState([
    { reservationTypeId: "", price: "" },
  ]);
  const [allFacilities, setAllFacilities] = useState([]);
  const [allReservationTypes, setAllReservationTypes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && data) {
      setName(data.name || "");
      setDescription(data.description || "");
      setFacilityIds(data.areaFacilities.map((f) => f.facilityId));
      setAreaPrices(
        Array.isArray(data.areaPrices) && data.areaPrices.length > 0
          ? data.areaPrices.map((ap) => ({
              reservationTypeId:
                ap.reservationTypeId?.toString?.() ??
                ap.reservationType?.id?.toString?.() ??
                "",
              price: ap.price?.toString?.() ?? "",
            }))
          : [{ reservationTypeId: "", price: "" }],
      );
    }
    if (isOpen && !data) {
      setName("");
      setDescription("");
      setFacilityIds([]);
      setAreaPrices([{ reservationTypeId: "", price: "" }]);
    }
  }, [isOpen, data]);

  useEffect(() => {
    if (isOpen) {
      axiosInstance
        .get("/facility")
        .then((res) => setAllFacilities(res.data.data || []))
        .catch(() => setAllFacilities([]));

      axiosInstance
        .get("/reservation-type")
        .then((res) => setAllReservationTypes(res.data.data || []))
        .catch(() => setAllReservationTypes([]));
    }
  }, [isOpen]);

  const handleAreaPriceChange = (idx, key, value) => {
    setAreaPrices((prev) =>
      prev.map((ap, i) => (i === idx ? { ...ap, [key]: value } : ap)),
    );
  };

  const addAreaPrice = () => {
    setAreaPrices((prev) => [...prev, { reservationTypeId: "", price: "" }]);
  };

  const removeAreaPrice = (idx) => {
    setAreaPrices((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const processedAreaPrices = areaPrices
      .filter(
        (ap) =>
          ap.reservationTypeId !== "" &&
          ap.price !== "" &&
          !isNaN(Number(ap.price)),
      )
      .map((ap) => ({
        reservationTypeId: Number(ap.reservationTypeId),
        price: Number(ap.price),
      }));

    try {
      setIsSubmitting(true);

      await axiosInstance.put(`/area/${data?.id}`, {
        name,
        description,
        facilityIds,
        areaPrices: processedAreaPrices,
      });

      toast.success("Berhasil!", {
        description: `Area "${name}" berhasil diubah.`,
      });

      onOpenChange(false);
      onSuccess();
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Gagal mengubah data.";
      toast.error("Gagal!", {
        description: errorMsg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] rounded-none border border-[#0F131F]/15 bg-white p-0 gap-0">
        <DialogHeader className="p-6 border-b border-[#0F131F]/10">
          <DialogTitle className="font-crimson-pro text-2xl text-[#0F131F]">Edit Area</DialogTitle>
          <DialogDescription className="text-sm text-black/40 mt-1">
            Ubah rincian area di bawah ini.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleEdit} className="space-y-4 p-6 overflow-y-auto max-h-[60vh]">
          {/* Input Name */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#0F131F]/60">Name</label>
            <input
              type="text"
              placeholder="Contoh: Tengah"
              className="flex h-10 w-full border border-[#0F131F]/15 bg-white px-3 py-2 text-sm outline-none focus:border-[#0F131F]/40 transition-colors"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Input Description */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#0F131F]/60">Description</label>
            <textarea
              placeholder="Contoh: Cocok untuk ulang tahun"
              className="flex h-20 w-full border border-[#0F131F]/15 bg-white px-3 py-2 text-sm resize-none outline-none focus:border-[#0F131F]/40 transition-colors"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Facility Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#0F131F]/60">Facilities</label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-[#0F131F]/15 p-2 bg-white">
              {allFacilities.map((facility) => {
                const isSelected = facilityIds.includes(facility.id);
                return (
                  <button
                    key={facility.id}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        setFacilityIds((prev) => prev.filter((id) => id !== facility.id));
                      } else {
                        setFacilityIds((prev) => [...prev, facility.id]);
                      }
                    }}
                    className={`flex items-center gap-2.5 px-3 py-2 border transition-all text-left ${
                      isSelected
                        ? "border-[#0F131F] bg-[#0F131F]/5 font-semibold text-[#0F131F]"
                        : "border-[#0F131F]/10 hover:border-[#0F131F]/20 text-black/60 bg-white"
                    }`}
                  >
                    {facility.icon && (
                      <span 
                        className={`w-4 h-4 flex items-center justify-center shrink-0 ${isSelected ? "text-[#0F131F]" : "text-black/45"}`}
                        dangerouslySetInnerHTML={{ __html: facility.icon }} 
                      />
                    )}
                    <span className="text-xs truncate">{facility.name}</span>
                  </button>
                );
              })}
            </div>
            <div className="text-xs text-black/40">
              Centang fasilitas yang tersedia untuk area ini.
            </div>
          </div>

          {/* Area Prices */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#0F131F]/60">Area Prices</label>
            <div className="flex flex-col gap-3">
              {areaPrices.map((ap, idx) => (
                <div className="flex gap-2 items-start" key={idx}>
                  <select
                    className="w-[55%] border border-[#0F131F]/15 bg-white px-2 py-2 text-sm outline-none focus:border-[#0F131F]/40 transition-colors"
                    value={ap.reservationTypeId}
                    onChange={(e) =>
                      handleAreaPriceChange(
                        idx,
                        "reservationTypeId",
                        e.target.value,
                      )
                    }
                    required
                  >
                    <option value="">--Pilih Tipe Reservasi--</option>
                    {allReservationTypes.map((rt) => (
                      <option key={rt.id} value={rt.id}>
                        {rt.name || `Type #${rt.id}`}
                      </option>
                    ))}
                  </select>

                  <div className="flex flex-col w-[35%] gap-0.5">
                    <input
                      className="w-full border border-[#0F131F]/15 bg-white px-2 py-2 text-sm outline-none focus:border-[#0F131F]/40 transition-colors"
                      type="number"
                      min={0}
                      placeholder="Harga (Rp)"
                      value={ap.price}
                      onChange={(e) =>
                        handleAreaPriceChange(idx, "price", e.target.value)
                      }
                      required
                    />
                    {ap.price && !isNaN(Number(ap.price)) && (
                      <span className="text-[10px] font-bold text-[#896d51] block text-right mt-0.5">
                        {formatMoney(ap.price)}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center justify-center text-xs w-8 h-8 hover:bg-red-50 text-red-500 border border-transparent hover:border-red-200 transition-colors"
                    onClick={() => removeAreaPrice(idx)}
                    disabled={areaPrices.length === 1}
                    title="Hapus harga ini"
                    tabIndex={-1}
                  >
                    ✕
                  </button>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addAreaPrice}
                className="w-fit mt-1 border-[#0F131F]/20 text-[#0F131F]/70 hover:border-[#0F131F] hover:text-[#0F131F] bg-white rounded-none transition-colors h-8"
              >
                <Plus className="mr-1 w-4 h-4" />
                Tambah Area Price
              </Button>
            </div>
            <div className="text-xs text-black/40 mt-1">
              Tambahkan harga area per tipe reservasi
            </div>
          </div>
        </form>

        <DialogFooter className="rounded-none border-t border-[#0F131F]/10 bg-white p-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex items-center justify-center h-10 px-6 border border-[#0F131F]/20 text-[#0F131F]/70 hover:border-[#0F131F] hover:text-[#0F131F] bg-white text-sm font-semibold transition-colors"
            disabled={isSubmitting}
          >
            Batal
          </button>
          <button
            type="submit"
            onClick={handleEdit}
            className="flex items-center justify-center gap-2 h-10 px-6 border border-[#0F131F] bg-[#0F131F] text-white hover:bg-white hover:text-[#0F131F] text-sm font-semibold transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Simpan Perubahan
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
