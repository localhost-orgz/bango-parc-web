"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/dataTable";
import PageHeader from "@/components/ui/pageHeader";
import axiosInstance from "@/lib/axios";
import { Pencil, Trash, Plus } from "lucide-react";
import FacilityEditModal from "@/components/FacilityEditModal";
import FacilityAddModal from "@/components/FacilityAddModal";

export default function AdminFacilityPage() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);

  const fetchPropsData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/facility");
      setFacilities(response.data.data);
      setError(null);
    } catch (err) {
      setError("Failed get facilities.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPropsData();
  }, []);

  console.log(facilities);

  const handleEditClick = (facility) => {
    setSelectedFacility(facility);
    setIsEditOpen(true);
  };

  const handleDelete = async (id, name) => {
    const confirmDelete = confirm(
      `Apakah Anda yakin ingin menghapus fasilitas "${name}"?`,
    );
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/facility/${id}`);
      setFacilities((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert(err.response?.data?.error || "Gagal menghapus data.");
    }
  };

  const columns = [
    { header: "Name", key: "name" },
    {
      header: "Icon",
      key: "icon",
      render: (facility) => (
        <span dangerouslySetInnerHTML={{ __html: facility.icon }} />
      ),
    },
    { header: "Value", key: "value" },
    {
      header: "Action",
      key: "action",
      render: (facility) => (
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleEditClick(facility)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleDelete(facility.id, facility.name)}
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
        <PageHeader
          title="Fasilitas"
          description="Kelola semua fasilitas di sini."
        />

        <Button onClick={() => setIsAddOpen(true)} className="w-full sm:w-auto">
          <Plus /> Create
        </Button>
      </div>

      <DataTable data={facilities} columns={columns} />

      <FacilityAddModal
        isOpen={isAddOpen}
        onOpenChange={setIsAddOpen}
        onSuccess={fetchPropsData}
      />

      <FacilityEditModal
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        data={selectedFacility}
        onSuccess={fetchPropsData}
      />
    </>
  );
}
