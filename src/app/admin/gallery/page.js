"use client";

import GalleryAddModal from "@/components/GalleryAddModal";
import GalleryGrid from "@/components/GalleryGrid";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/pageHeader";
import axiosInstance from "@/lib/axios";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminGalleryPage() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGalleryData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/gallery");
      setGallery(response.data.galleries);
      setError(null);
    } catch (err) {
      setError("Failed to get gallery.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryData();
  }, []);

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <PageHeader
          title="Gallery Area"
          description="Kelola galeri foto-foto area di sini."
        />

        <Button onClick={() => setIsAddOpen(true)} className="w-full sm:w-auto">
          <Plus /> Image
        </Button>
      </div>

      {loading ? (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="bg-black/5 animate-pulse rounded-lg aspect-square"
            />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">{error}</div>
      ) : (
        <GalleryGrid gallery={gallery} />
      )}

      <GalleryAddModal
        isOpen={isAddOpen}
        onOpenChange={setIsAddOpen}
        onSuccess={fetchGalleryData}
      />
    </>
  );
}
