"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/dataTable";
import PageHeader from "@/components/ui/pageHeader";
import axiosInstance from "@/lib/axios";
import { Pencil, Trash, Plus } from "lucide-react";
import ReservationTypeEditModal from "@/components/ReservationTypeEditModal";
import ReservationTypeAddModal from "@/components/ReservationTypeAddModal";

export default function ReservationTypePage() {
  const [reservationTypes, setReservationTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedResType, setSelectedResType] = useState(null);

  const fetchPropsData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/reservation-type");
      setReservationTypes(response.data.data);
      setError(null);
    } catch (err) {
      setError("Failed get reservation types.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPropsData();
  }, []);

  const handleEditClick = (resType) => {
    setSelectedResType(resType);
    setIsEditOpen(true);
  };

  const handleDelete = async (id, name) => {
    const confirmDelete = confirm(
      `Apakah Anda yakin ingin menghapus tipe reservasi "${name}"?`,
    );
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/reservation-type/${id}`);
      setReservationTypes((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert(err.response?.data?.error || "Gagal menghapus data.");
    }
  };

  const columns = [
    { header: "Name", key: "name" },
    { header: "Duration Interval Hour", key: "durationIntervalHour" },
    {
      header: "Action",
      key: "action",
      render: (resType) => (
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleEditClick(resType)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleDelete(resType.id, resType.name)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <PageHeader
          title="Tipe Reservasi"
          description="Kelola semua tipe reservasi di sini."
        />

        <Button onClick={() => setIsAddOpen(true)} className="w-full sm:w-auto">
          <Plus /> Create
        </Button>
      </div>

      <DataTable data={reservationTypes} columns={columns} loading={loading} />

      <ReservationTypeAddModal
        isOpen={isAddOpen}
        onOpenChange={setIsAddOpen}
        onSuccess={fetchPropsData}
      />

      <ReservationTypeEditModal
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        data={selectedResType}
        onSuccess={fetchPropsData}
      />
    </>
  );
}
