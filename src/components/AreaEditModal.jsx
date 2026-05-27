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

  console.log(data);

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

  const handleFacilitySelect = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((opt) =>
      Number(opt.value),
    );
    setFacilityIds(selectedOptions);
  };

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

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Area</DialogTitle>
          <DialogDescription>Ubah rincian area di bawah ini.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleEdit} className="space-y-4 py-4">
          {/* Input Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Name</label>
            <input
              type="text"
              placeholder="Contoh: Tengah"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Input Description */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
              placeholder="Contoh: Cocok untuk ulang tahun"
              className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Facility Selector (Checkbox Version) */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Facilities</label>
            <div className="flex flex-col gap-1 max-h-40 overflow-y-auto border border-input rounded-md p-2 bg-background">
              {allFacilities.map((facility) => (
                <label
                  key={facility.id}
                  className="inline-flex items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    className="accent-primary"
                    value={facility.id}
                    checked={facilityIds.includes(facility.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFacilityIds((prev) => [...prev, facility.id]);
                      } else {
                        setFacilityIds((prev) =>
                          prev.filter((id) => id !== facility.id),
                        );
                      }
                    }}
                  />
                  {facility.name || `Facility #${facility.id}`}
                </label>
              ))}
            </div>
            <div className="text-xs text-muted-foreground">
              Centang fasilitas yang tersedia untuk area ini.
            </div>
          </div>

          {/* Area Prices */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Area Prices</label>
            <div className="flex flex-col gap-2">
              {areaPrices.map((ap, idx) => (
                <div className="flex gap-2 items-center" key={idx}>
                  <select
                    className="w-[55%] rounded-md border border-input bg-background px-2 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
                  <input
                    className="w-[35%] rounded-md border border-input bg-background px-2 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    type="number"
                    min={0}
                    placeholder="Harga (Rp)"
                    value={ap.price}
                    onChange={(e) =>
                      handleAreaPriceChange(idx, "price", e.target.value)
                    }
                    required
                  />
                  <button
                    type="button"
                    className="inline-flex items-center text-xs px-2 py-1 rounded hover:bg-red-100 text-red-500"
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
                variant="secondary"
                size="sm"
                onClick={addAreaPrice}
                className="w-fit mt-1"
              >
                <Plus className="mr-1 w-4 h-4" />
                Tambah Area Price
              </Button>
            </div>
            <div className="text-xs text-muted-foreground">
              Tambahkan harga area per tipe reservasi
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
