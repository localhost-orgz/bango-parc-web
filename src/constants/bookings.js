// Dummy booking data
// Status types:
//   "wedding"  → full day blocked (no other events allowed)
//   "full"     → 2 general events booked (no more slots)
//   "half"     → 1 general event booked (1 slot still available)

export const bookedDates = {
  // May 2026
  "2026-05-10": {
    status: "wedding",
    events: [{ name: "Wedding Aditya & Riana", time: "07:00 – 22:00" }],
  },
  "2026-05-13": {
    status: "half",
    events: [{ name: "Birthday Gathering", time: "09:00 – 12:00" }],
  },
  "2026-05-17": {
    status: "full",
    events: [
      { name: "Corporate Meeting", time: "08:00 – 11:00" },
      { name: "Family Reunion", time: "14:00 – 17:00" },
    ],
  },
  "2026-05-20": {
    status: "wedding",
    events: [{ name: "Wedding Budi & Sari", time: "07:00 – 22:00" }],
  },
  "2026-05-22": {
    status: "half",
    events: [{ name: "Pengajian Akbar", time: "10:00 – 13:00" }],
  },
  "2026-05-25": {
    status: "full",
    events: [
      { name: "Gathering Kantor A", time: "09:00 – 12:00" },
      { name: "Arisan Keluarga", time: "15:00 – 18:00" },
    ],
  },
  "2026-05-28": {
    status: "half",
    events: [{ name: "Yoga Retreat", time: "07:00 – 10:00" }],
  },

  // June 2026
  "2026-06-03": {
    status: "wedding",
    events: [{ name: "Wedding Rizky & Putri", time: "07:00 – 22:00" }],
  },
  "2026-06-07": {
    status: "half",
    events: [{ name: "Ulang Tahun 50th", time: "11:00 – 14:00" }],
  },
  "2026-06-12": {
    status: "full",
    events: [
      { name: "Rapat Tahunan", time: "08:00 – 11:00" },
      { name: "Workshop Kreatif", time: "13:00 – 16:00" },
    ],
  },
  "2026-06-14": {
    status: "wedding",
    events: [{ name: "Wedding Dani & Luna", time: "07:00 – 22:00" }],
  },
  "2026-06-19": {
    status: "half",
    events: [{ name: "Birthday Anak", time: "14:00 – 17:00" }],
  },
  "2026-06-21": {
    status: "full",
    events: [
      { name: "Gathering RT", time: "09:00 – 12:00" },
      { name: "Seminar UMKM", time: "14:00 – 17:00" },
    ],
  },
  "2026-06-25": {
    status: "wedding",
    events: [{ name: "Wedding Fauzan & Nia", time: "07:00 – 22:00" }],
  },
  "2026-06-28": {
    status: "half",
    events: [{ name: "Reuni Angkatan", time: "10:00 – 13:00" }],
  },
};
