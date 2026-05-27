"use client";

import { useState } from "react";
import AreaHeader from "../components/AreaHeader";

export default function AreaPage() {
  const columns = [
    { key: "areaName", title: "Nama Area" },
    { key: "maxCapPax", title: "Kapasitas Maksimum (Pax)" },
    { key: "electricPowerWatt", title: "Daya Listrik (Watt)" },
    { key: "isWeddingAvailable", title: "Wedding Tersedia?" },
    { key: "actions", title: "Aksi" },
  ];

  const [areas, setAreas] = useState([
    {
      uuid: "415028de-ea73-4b8e-9d5e-065546cb629a",
      areaName: "example",
      maxCapPax: 5,
      electricPowerWatt: 100,
      isWeddingAvailable: false,
    },
    {
      uuid: "d895a267-66b2-45bd-95d6-f9a7e59c7f5c",
      areaName: "VIP Hall",
      maxCapPax: 30,
      electricPowerWatt: 3500,
      isWeddingAvailable: true,
    },
  ]);

  // State untuk tambah/edit
  const [form, setForm] = useState({
    areaName: "",
    maxCapPax: "",
    electricPowerWatt: "",
    isWeddingAvailable: false,
    uuid: null,
  });
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddClick = () => {
    setForm({
      areaName: "",
      maxCapPax: "",
      electricPowerWatt: "",
      isWeddingAvailable: false,
      uuid: null,
    });
    setEditMode(false);
    setShowForm(true);
  };

  const handleEditClick = (area) => {
    setForm({
      ...area,
      maxCapPax: String(area.maxCapPax),
      electricPowerWatt: String(area.electricPowerWatt),
    });
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = (uuid) => {
    if (window.confirm("Yakin ingin menghapus area ini?")) {
      setAreas((prev) => prev.filter((area) => area.uuid !== uuid));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!form.areaName || !form.maxCapPax || !form.electricPowerWatt) return;

    if (editMode) {
      // Update area
      setAreas((prev) =>
        prev.map((item) =>
          item.uuid === form.uuid
            ? {
                ...item,
                areaName: form.areaName,
                maxCapPax: Number(form.maxCapPax),
                electricPowerWatt: Number(form.electricPowerWatt),
                isWeddingAvailable: form.isWeddingAvailable,
              }
            : item,
        ),
      );
    } else {
      // Add area
      setAreas((prev) => [
        ...prev,
        {
          uuid: crypto.randomUUID(),
          areaName: form.areaName,
          maxCapPax: Number(form.maxCapPax),
          electricPowerWatt: Number(form.electricPowerWatt),
          isWeddingAvailable: form.isWeddingAvailable,
        },
      ]);
    }
    setShowForm(false);
  };

  return (
    <>
      {/* Header and Add Button */}
      <div className="mb-8 flex items-center justify-between">
        <AreaHeader />
        <button
          className="h-9 px-4 border border-[#0F131F]/30 text-sm font-medium text-[#0F131F] hover:bg-[#0F131F] hover:text-white transition-colors flex items-center gap-2"
          onClick={handleAddClick}
        >
          <span>Tambah</span>
          <span className="text-lg leading-none">+</span>
        </button>
      </div>

      {/* Form Modal/Popup Simple */}
      {showForm && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-20">
          <div className="bg-white p-8 rounded-xl w-full max-w-md shadow-lg relative">
            <h2 className="text-lg font-bold mb-4">
              {editMode ? "Edit Area" : "Tambah Area"}
            </h2>
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Nama Area
                </label>
                <input
                  type="text"
                  name="areaName"
                  value={form.areaName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-zinc-200 rounded focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Kapasitas Maksimum (Pax)
                </label>
                <input
                  type="number"
                  name="maxCapPax"
                  min={1}
                  value={form.maxCapPax}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-zinc-200 rounded focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Daya Listrik (Watt)
                </label>
                <input
                  type="number"
                  name="electricPowerWatt"
                  min={0}
                  value={form.electricPowerWatt}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-zinc-200 rounded focus:outline-none"
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isWeddingAvailable"
                  name="isWeddingAvailable"
                  checked={form.isWeddingAvailable}
                  onChange={handleInputChange}
                />
                <label htmlFor="isWeddingAvailable" className="text-sm">
                  Wedding Tersedia?
                </label>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded font-semibold"
                >
                  {editMode ? "Simpan Perubahan" : "Tambah"}
                </button>
                <button
                  type="button"
                  className="border border-zinc-300 bg-white text-zinc-700 px-5 py-2 rounded font-semibold hover:bg-zinc-50"
                  onClick={() => setShowForm(false)}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden border border-[#0F131F]/15 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#0F131F]/15 bg-[#faf9f7]">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-5 py-3 text-left font-medium text-black/70"
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {areas.length > 0 ? (
              areas.map((item) => (
                <tr
                  key={item.uuid}
                  className="border-b border-[#0F131F]/10 hover:bg-[#faf9f7] transition-colors"
                >
                  <td className="px-5 py-4">{item.areaName}</td>
                  <td className="px-5 py-4">{item.maxCapPax}</td>
                  <td className="px-5 py-4">{item.electricPowerWatt}</td>
                  <td className="px-5 py-4">
                    {item.isWeddingAvailable ? "Ya" : "Tidak"}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="h-8 px-4 border border-[#0F131F]/30 text-xs font-semibold text-[#0F131F] hover:bg-[#0F131F] hover:text-white transition-colors"
                        onClick={() => handleEditClick(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="h-8 px-4 border border-red-300 text-xs font-semibold text-red-600 hover:bg-red-500 hover:text-white transition-colors"
                        onClick={() => handleDelete(item.uuid)}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-5 py-10 text-center text-black/40"
                >
                  Data tidak tersedia
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
