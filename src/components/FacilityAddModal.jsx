"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import IconPicker from "@/components/ui/IconPicker";
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

export default function FacilityAddModal({ isOpen, onOpenChange, onSuccess }) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [value, setValue] = useState("");
  const [isDisplay, setIsDisplay] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);

      await axiosInstance.post("/facility", {
        name,
        icon,
        value,
        isDisplay,
      });

      toast.success("Berhasil!", {
        description: `Fasilitas "${name}" berhasil ditambahkan.`,
      });

      setName("");
      setIcon("");
      setValue("");
      setIsDisplay(true);
      onOpenChange(false);
      onSuccess();
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Gagal menambahkan data.";
      toast.error("Gagal!", {
        description: errorMsg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Fasilitas</DialogTitle>
          <DialogDescription>
            Masukkan rincian fasilitas baru di bawah ini.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleCreate} className="space-y-4 py-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Name</label>
            <input
              type="text"
              placeholder="Contoh: Wifi"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Icon</label>
            <IconPicker value={icon} onChange={setIcon} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Value</label>
            <input
              type="text"
              placeholder="Contoh: -"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center gap-2 py-1">
            <input
              type="checkbox"
              id="isDisplay"
              className="w-4 h-4 cursor-pointer text-[#0F131F] border-[#0F131F]/15 rounded focus:ring-0"
              checked={isDisplay}
              onChange={(e) => setIsDisplay(e.target.checked)}
            />
            <label htmlFor="isDisplay" className="text-sm font-medium cursor-pointer">
              Tampilkan di Paket
            </label>
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Tambah Data
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
