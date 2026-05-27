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
    { header: "Name", key: "name" },
    { header: "Description", key: "description" },
    {
      header: "Facility Count",
      key: "facilityCount",
      render: (area) => (
        <div className="flex flex-wrap gap-1">
          {area.areaFacilities &&
            area.areaFacilities.map((facility) => (
              <span
                key={facility.id || facility.facility.name}
                className="inline-block rounded bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700"
              >
                {facility.facility.name}
              </span>
            ))}
        </div>
      ),
    },
    {
      header: "Area Prices",
      key: "areaPrices",
      render: (area) => (
        <div className="flex flex-col gap-1">
          {area.areaPrices && area.areaPrices.length > 0 ? (
            area.areaPrices.map((ap) => (
              <div
                key={ap.reservationTypeId}
                className="flex items-center justify-between rounded bg-gray-50 px-2 py-1 text-xs border"
              >
                <span className="font-semibold text-gray-700">
                  {ap.reservationType?.name || "-"}
                </span>
                <span className="font-mono text-[13px] text-primary">
                  Rp{ap.price?.toLocaleString("id-ID") ?? 0}/
                  {ap.reservationType.durationIntervalHour} Jam
                </span>
              </div>
            ))
          ) : (
            <span className="italic text-gray-400">Tidak ada harga area</span>
          )}
        </div>
      ),
    },
    {
      header: "Action",
      key: "action",
      render: (area) => (
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleEditClick(area)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleDelete(area.id, area.name)}
          >
            <Trash className="w-4 h-4" />
          </Button>
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
