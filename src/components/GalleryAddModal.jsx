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

export default function GalleryAddModal({ isOpen, onOpenChange, onSuccess }) {
  const [file, setFile] = useState(null);
  const [areaId, setAreaId] = useState("");
  const [mediaType, setMediaType] = useState("IMAGE");
  const [isPrimary, setIsPrimary] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allAreas, setAllAreas] = useState([]);

  useEffect(() => {
    if (isOpen) {
      axiosInstance
        .get("/area")
        .then((res) => setAllAreas(res.data.data || []))
        .catch(() => setAllAreas([]));
    }
  }, [isOpen]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("File harus diunggah.");
      return;
    }
    if (!areaId) {
      toast.error("Area harus dipilih.");
      return;
    }
    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("areaId", areaId);
      formData.append("mediaType", mediaType);
      formData.append("isPrimary", isPrimary ? "true" : "false");
      formData.append("title", title);
      formData.append("description", description);

      await axiosInstance.post("/gallery", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Berhasil menambahkan foto!");

      setFile(null);
      setAreaId("");
      setMediaType("IMAGE");
      setIsPrimary(false);
      setTitle("");
      setDescription("");

      onOpenChange(false);
      if (onSuccess) onSuccess();
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Gagal menambahkan foto.";
      toast.error("Gagal menambahkan foto!", {
        description: errorMsg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Tambah Foto Galeri</DialogTitle>
          <DialogDescription>
            Masukkan detail dan upload foto galeri di bawah ini.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleCreate} className="space-y-4 py-4">
          {/* File Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">File Foto</label>
            <input
              type="file"
              accept="image/*"
              className="border px-3 py-2 rounded-md text-sm"
              onChange={handleFileChange}
              required
            />
            {file && (
              <div className="text-xs text-muted-foreground">
                Terpilih: {file.name}
              </div>
            )}
          </div>

          {/* Area Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Area</label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={areaId}
              onChange={(e) => setAreaId(e.target.value)}
              required
            >
              <option value="">-- Pilih Area --</option>
              {allAreas.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.name || `Area #${area.id}`}
                </option>
              ))}
            </select>
          </div>

          {/* Media Type */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Jenis Media</label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={mediaType}
              onChange={(e) => setMediaType(e.target.value)}
              required
            >
              <option value="IMAGE">Foto (IMAGE)</option>
              <option value="TOUR360">360 Tour (TOUR360)</option>
            </select>
          </div>

          {/* Is Primary */}
          <div className="flex items-center gap-2">
            <input
              id="isPrimary"
              type="checkbox"
              checked={isPrimary}
              onChange={(e) => setIsPrimary(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="isPrimary" className="text-sm font-medium">
              Jadikan foto utama (utama untuk area ini)
            </label>
          </div>

          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Judul Foto</label>
            <input
              type="text"
              placeholder="Judul"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Deskripsi</label>
            <textarea
              placeholder="Deskripsi singkat"
              className="flex h-16 w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
              Tambah Foto
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
