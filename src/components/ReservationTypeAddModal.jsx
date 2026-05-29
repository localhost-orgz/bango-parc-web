"use client";

import { useState } from "react";
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

export default function ReservationTypeAddModal({
  isOpen,
  onOpenChange,
  onSuccess,
}) {
  const [name, setName] = useState("");
  const [durationIntervalHour, setDurationIntervalHour] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);

      await axiosInstance.post("/reservation-type", {
        name,
        durationIntervalHour: Number(durationIntervalHour),
      });

      toast.success("Berhasil!", {
        description: `Tipe reservasi "${name}" berhasil ditambahkan.`,
      });

      setName("");
      setDurationIntervalHour("");

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
          <DialogTitle>Tambah Tipe Reservasi</DialogTitle>
          <DialogDescription>
            Masukkan rincian tipe reservasi baru di bawah ini.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleCreate} className="space-y-4 py-4">
          {/* Input Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Name</label>
            <input
              type="text"
              placeholder="Contoh: Member Bulanan"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Input Duration */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              Duration Interval Hour
            </label>
            <input
              type="number"
              placeholder="Contoh: 2"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={durationIntervalHour}
              onChange={(e) => setDurationIntervalHour(e.target.value)}
              required
            />
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
