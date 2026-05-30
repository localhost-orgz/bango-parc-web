"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/dataTable";
import PageHeader from "@/components/ui/pageHeader";
import axiosInstance from "@/lib/axios";
import { Pencil, Trash, Plus } from "lucide-react";
import AreaEditModal from "@/components/AreaEditModal";
import AreaAddModal from "@/components/AreaAddModal";

export default function AdminAreaPage() {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);

  const fetchAreaData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/area");
      setAreas(response.data.data);
      setError(null);
    } catch (err) {
      setError("Failed get areas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAreaData();
  }, []);

  const handleEditClick = (area) => {
    setSelectedArea(area);
    setIsEditOpen(true);
  };

  const handleDelete = async (id, name) => {
    const confirmDelete = confirm(
      `Apakah Anda yakin ingin menghapus area "${name}"?`,
    );
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/area/${id}`);
      setAreas((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert(err.response?.data?.error || "Gagal menghapus data.");
    }
  };

  const columns = [
    {
      header: "Name",
      key: "name",
      render: (area) => (
        <span className="font-semibold text-[#0F131F] text-sm">
          {area.name}
        </span>
      ),
    },
    {
      header: "Description",
      key: "description",
      render: (area) => (
        <span className="text-black/60 text-sm max-w-xs block truncate" title={area.description}>
          {area.description}
        </span>
      ),
    },
    {
      header: "Fasilitas",
      key: "facilityCount",
      render: (area) => (
        <div className="flex flex-wrap gap-1.5">
          {area.areaFacilities && area.areaFacilities.length > 0 ? (
            area.areaFacilities.map((facility) => (
              <span
                key={facility.id || facility.facility.name}
                className="inline-flex items-center px-2 py-0.5 border border-[#0F131F]/15 text-[#0F131F]/60 bg-[#0F131F]/3 text-[10px] font-bold uppercase tracking-wide"
              >
                {facility.facility.name}
              </span>
            ))
          ) : (
            <span className="text-black/30 italic text-xs">—</span>
          )}
        </div>
      ),
    },
    {
      header: "Harga Area",
      key: "areaPrices",
      render: (area) => (
        <div className="flex flex-col gap-1 max-w-[240px]">
          {area.areaPrices && area.areaPrices.length > 0 ? (
            area.areaPrices.map((ap) => (
              <div
                key={ap.reservationTypeId}
                className="flex items-center justify-between bg-[#0F131F]/2 border border-[#0F131F]/10 px-2 py-1 text-xs gap-3"
              >
                <span className="font-semibold text-[#0F131F]/70">
                  {ap.reservationType?.name || "-"}
                </span>
                <span className="font-mono text-[11px] font-bold text-[#896d51]">
                  Rp{ap.price?.toLocaleString("id-ID") ?? 0}/
                  {ap.reservationType?.durationIntervalHour} Jam
                </span>
              </div>
            ))
          ) : (
            <span className="italic text-black/30 text-xs">Tidak ada harga area</span>
          )}
        </div>
      ),
    },
    {
      header: "Aksi",
      key: "action",
      render: (area) => (
        <div className="flex gap-1.5">
          <button
            onClick={() => handleEditClick(area)}
            className="flex items-center justify-center w-8 h-8 border border-[#0F131F]/15 text-[#0F131F]/60 hover:border-[#0F131F] hover:text-[#0F131F] bg-white transition-colors"
            title="Edit"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleDelete(area.id, area.name)}
            className="flex items-center justify-center w-8 h-8 border border-red-200 text-red-600 hover:border-red-600 hover:bg-red-50 bg-white transition-colors"
            title="Hapus"
          >
            <Trash className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  if (loading) return <div className="p-8">Memuat data...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <PageHeader title="Area" description="Kelola semua area di sini." />

        <Button onClick={() => setIsAddOpen(true)} className="w-full sm:w-auto">
          <Plus /> Create
        </Button>
      </div>

      <DataTable data={areas} columns={columns} />

      <AreaAddModal
        isOpen={isAddOpen}
        onOpenChange={setIsAddOpen}
        onSuccess={fetchAreaData}
      />

      <AreaEditModal
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        data={selectedArea}
        onSuccess={fetchAreaData}
      />
    </>
  );
}
