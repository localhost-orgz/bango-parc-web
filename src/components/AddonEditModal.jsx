"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
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

export default function AddonEditModal({
  isOpen,
  onOpenChange,
  onSuccess,
  data,
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set initial form values when modal opens or data changes
  useEffect(() => {
    if (isOpen && data) {
      setName(data.name || "");
      setPrice(
        data.price !== undefined && data.price !== null ? data.price : "",
      );
      setDescription(data.description || "");
    }
  }, [isOpen, data]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);

      await axiosInstance.put(`/addon/${data.id}`, {
        name,
        price: Number(price),
        description,
      });

      toast.success("Berhasil!", {
        description: `Addon "${name}" berhasil diperbarui.`,
      });

      onOpenChange(false);
      onSuccess();
    } catch (err) {
      const errorMsg = err?.response?.data?.error || "Gagal memperbarui data.";
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
          <DialogTitle>Edit Addon</DialogTitle>
          <DialogDescription>
            Ubah rincian addon di bawah ini.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleUpdate} className="space-y-4 py-4">
          {/* Input Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Name</label>
            <input
              type="text"
              placeholder="Contoh: kursi"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          {/* Input Price */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Price</label>
            <input
              type="number"
              min={0}
              placeholder="Contoh: 1400000"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <div className="text-xs text-muted-foreground">
              Harga addon dalam rupiah.
            </div>
          </div>
          {/* Input Description */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
              placeholder="Contoh: Harga per 100 kursi"
              className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
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
