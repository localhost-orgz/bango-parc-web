import { useState } from "react";
import { Trash2 } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

export default function GalleryGrid({ gallery = [], onDelete }) {
  const [deletingId, setDeletingId] = useState(null);

  if (!gallery.length) {
    return (
      <div className="py-12 text-center text-gray-400 italic">
        Tidak ada foto yang ditampilkan.
      </div>
    );
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus foto ini?")) return;
    setDeletingId(id);
    try {
      await axiosInstance.delete(`/gallery/${id}`);
      onDelete(id);
      toast.success("Berhasil menghapus foto.");
    } catch {
      toast.error("Gagal menghapus foto.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {gallery.map((image) => (
        <div
          key={image.id}
          className="relative overflow-hidden rounded-lg aspect-square shadow border bg-gray-50"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.filePath}
            alt={`Gallery image #${image.id}`}
            className="object-cover w-full h-full transition-transform duration-200 hover:scale-105"
          />
          <button
            title="Hapus foto"
            onClick={() => handleDelete(image.id)}
            disabled={deletingId === image.id}
            className="absolute top-2 right-2 bg-white/80 hover:bg-red-100 rounded-full p-1.5 shadow transition-colors text-red-600 z-10"
            style={{
              pointerEvents: deletingId === image.id ? "none" : "auto",
              opacity: deletingId === image.id ? 0.7 : 1,
            }}
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}
