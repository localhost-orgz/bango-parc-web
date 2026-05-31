"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/dataTable";
import PageHeader from "@/components/ui/pageHeader";
import axiosInstance from "@/lib/axios";
import { Pencil, Trash, Plus } from "lucide-react";
import AddonAddModal from "@/components/AddonAddModal";
import AddonEditModal from "@/components/AddonEditModal";

export default function AdminAddonPage() {
  const [addons, setAddons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedAddon, setSelectedAddon] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchAddonData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/addon");
      setAddons(response.data.data);
      setError(null);
    } catch (err) {
      setError("Failed get addons.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddonData();
  }, []);

  const handleAddOpen = () => {
    setFormData({ name: "", price: "", description: "" });
    setIsAddOpen(true);
  };

  const handleEditClick = (addon) => {
    setSelectedAddon(addon);
    setFormData({
      name: addon.name ?? "",
      price: addon.price ?? "",
      description: addon.description ?? "",
    });
    setIsEditOpen(true);
  };

  const handleDelete = async (id, name) => {
    const confirmDelete = confirm(
      `Apakah Anda yakin ingin menghapus addon "${name}"?`,
    );
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/addon/${id}`);
      setAddons((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert(err.response?.data?.error || "Gagal menghapus data.");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await axiosInstance.post("/addon", {
        name: formData.name,
        price: Number(formData.price),
        description: formData.description,
      });
      setIsAddOpen(false);
      setFormData({ name: "", price: "", description: "" });
      fetchAddonData();
    } catch (err) {
      alert(err.response?.data?.error || "Gagal menambahkan data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedAddon) return;
    try {
      setIsSubmitting(true);
      await axiosInstance.put(`/addon/${selectedAddon.id}`, {
        name: formData.name,
        price: Number(formData.price),
        description: formData.description,
      });
      setIsEditOpen(false);
      setSelectedAddon(null);
      setFormData({ name: "", price: "", description: "" });
      fetchAddonData();
    } catch (err) {
      alert(err.response?.data?.error || "Gagal memperbarui data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = [
    { header: "Name", key: "name" },
    {
      header: "Price",
      key: "price",
      render: (addon) => `Rp${addon.price?.toLocaleString("id-ID")}`,
    },
    { header: "Description", key: "description" },
    {
      header: "Action",
      key: "action",
      render: (addon) => (
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleEditClick(addon)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleDelete(addon.id, addon.name)}
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
        <PageHeader title="Addon" description="Kelola semua addon di sini." />

        <Button onClick={handleAddOpen} className="w-full sm:w-auto">
          <Plus /> Create
        </Button>
      </div>

      <DataTable data={addons} columns={columns} loading={loading} />

      <AddonAddModal
        isOpen={isAddOpen}
        onOpenChange={setIsAddOpen}
        onSuccess={fetchAddonData}
      />

      <AddonEditModal
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        data={selectedAddon}
        onSuccess={fetchAddonData}
      />
    </>
  );
}
