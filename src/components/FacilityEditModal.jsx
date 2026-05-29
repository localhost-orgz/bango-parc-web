"use client";

import { useState, useEffect } from "react";
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

export default function FacilityEditModal({
  isOpen,
  onOpenChange,
  data,
  onSuccess,
}) {
  const [formData, setFormData] = useState({
    name: "",
    icon: "",
    value: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && data) {
      setFormData({
        name: data.name ?? "",
        icon: data.icon ?? "",
        value: data.value ?? "",
        id: data.id,
      });
    }
    if (isOpen && !data) {
      setFormData({
        name: "",
        icon: "",
        value: "",
      });
    }
  }, [isOpen, data]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);

      await axiosInstance.put(`/facility/${data.id}`, {
        name: formData.name,
        icon: formData.icon,
        value: formData.value,
      });

      toast.success("Berhasil!", {
        description: `Fasilitas "${formData.name}" telah diperbarui.`,
      });

      setFormData({ name: "", icon: "", value: "" });
      onOpenChange(false);
      onSuccess();
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Gagal memperbarui data.";
      toast.error("Waduh, Error!", {
        description: errorMsg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Fasilitas</DialogTitle>
          <DialogDescription>
            Perbarui rincian data di bawah ini. Klik simpan jika sudah selesai.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleUpdate} className="space-y-4 py-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Name</label>
            <input
              type="text"
              placeholder="Contoh: Wifi"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Icon (HTML)</label>
            <input
              type="text"
              placeholder="Contoh: &lt;i class='example'&gt;&lt;/i&gt;"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={formData.icon}
              onChange={(e) =>
                setFormData({ ...formData, icon: e.target.value })
              }
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Value</label>
            <input
              type="text"
              placeholder="Contoh: -"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={formData.value}
              onChange={(e) =>
                setFormData({ ...formData, value: e.target.value })
              }
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
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
