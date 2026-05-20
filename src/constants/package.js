import {
  Armchair,
  House,
  MirrorRound,
  Package2,
  Speaker,
  Zap,
  Users,
  PartyPopper,
} from "lucide-react";

// Helper function to generate a random price in a range
function getRandomPrice(min, max, step = 100000) {
  const steps = Math.floor((max - min) / step);
  const randomSteps = Math.floor(Math.random() * (steps + 1));
  return min + randomSteps * step;
}

// Helper function to format as Rupiah
function formatRupiah(amount) {
  if (amount === null || amount === undefined) return null;
  return "Rp" + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Generate Reguler packages
const generateRegulerPackages = () => {
  const areas = [
    {
      id: "depan",
      name: "Area Depan",
      img: "/depan.jpg",
      desc: "Cocok untuk meeting, ulang tahun, gathering, pengajian, dan acara lainnya.",
    },
    {
      id: "tengah",
      name: "Ruang Tengah",
      img: "/tengah.jpg",
      desc: "Cocok untuk meeting, ulang tahun, gathering, pengajian, dan acara lainnya.",
    },
    {
      id: "belakang",
      name: "Area Belakang",
      img: "/belakang.jpg",
      desc: "Cocok untuk meeting, ulang tahun, gathering, pengajian, dan acara lainnya.",
    },
  ];

  return areas.map((area) => {
    const priceAmount = getRandomPrice(1000000, 2000000);
    // 70% chance of having a discount
    const hasDiscount = Math.random() > 0.3;
    const priceOriAmount = hasDiscount ? priceAmount + getRandomPrice(200000, 800000) : null;

    return {
      id: area.id,
      type: "reguler",
      name: area.name,
      img: area.img,
      desc: area.desc,
      price: formatRupiah(priceAmount),
      priceOri: formatRupiah(priceOriAmount),
      stats: [
        { icon: Users, label: "Kapasitas", value: "Hingga 250 pax" },
        { icon: Zap, label: "Listrik", value: "300 Watt" },
        { icon: PartyPopper, label: "Area", value: "Bisa Didekor" },
        { icon: Armchair, label: "Kursi Variasi", value: "± 35 Variasi" },
      ],
    };
  });
};

// Generate Wedding packages
const generateWeddingPackages = () => {
  const areas = [
    {
      id: "depan",
      name: "Wedding Area Depan",
      img: "/depan.jpg",
      desc: "Paket pernikahan eksklusif di area depan Bango Parc.",
      features: [
        { id: "area", icon: House, label: "Area Depan" },
        { id: "listrik", icon: Zap, label: "Listrik 1300 Watt" },
        { id: "meja", icon: Package2, label: "Kursi & Meja Variasi" },
        { id: "kursi", icon: Armchair, label: "+10 Kursi Tiffany" },
        { id: "makeup", icon: MirrorRound, label: "Ruang Touch Up Pengantin" },
        { id: "speaker", icon: Speaker, label: "Sound System Standar" },
      ],
    },
    {
      id: "tengah",
      name: "Wedding Ruang Tengah",
      img: "/tengah.jpg",
      desc: "Paket pernikahan eksklusif di ruang tengah dan ruang utama Bango Parc.",
      features: [
        { id: "area", icon: House, label: "Ruang Tengah dan Utama" },
        { id: "listrik", icon: Zap, label: "Listrik 5000 Watt" },
        { id: "meja", icon: Package2, label: "Kursi & Meja Variasi" },
        { id: "kursi", icon: Armchair, label: "+10 Kursi Tiffany" },
        { id: "makeup", icon: MirrorRound, label: "Ruang Touch Up Pengantin" },
        { id: "speaker", icon: Speaker, label: "Sound System Standar" },
      ],
    },
    {
      id: "belakang",
      name: "Wedding Area Belakang",
      img: "/belakang.jpg",
      desc: "Paket pernikahan eksklusif di area belakang dan teras Bango Parc.",
      features: [
        { id: "area", icon: House, label: "Ruang Tengah dan Halaman Belakang" },
        { id: "listrik", icon: Zap, label: "Listrik 5000 Watt" },
        { id: "meja", icon: Package2, label: "Kursi & Meja Variasi" },
        { id: "kursi", icon: Armchair, label: "+20 Kursi Tiffany" },
        { id: "makeup", icon: MirrorRound, label: "Ruang Touch Up Pengantin" },
        { id: "speaker", icon: Speaker, label: "Sound System Standar" },
      ],
    },
  ];

  return areas.map((area) => {
    // 3 hours prices
    const threeHoursDiscAmount = getRandomPrice(8000000, 12000000);
    const hasThreeHoursDisc = Math.random() > 0.3;
    const currentThreeHoursAmount = hasThreeHoursDisc ? threeHoursDiscAmount + getRandomPrice(1000000, 3000000) : null;

    // 5 hours prices
    const fiveHoursDiscAmount = getRandomPrice(13000000, 18000000);
    const hasFiveHoursDisc = Math.random() > 0.3;
    const currentFiveHoursAmount = hasFiveHoursDisc ? fiveHoursDiscAmount + getRandomPrice(2000000, 5000000) : null;

    return {
      id: area.id,
      type: "wedding",
      name: area.name,
      thumbnail: area.img,
      desc: area.desc,
      three_hours_disc: formatRupiah(threeHoursDiscAmount),
      current_three_hours: formatRupiah(currentThreeHoursAmount),
      five_hours_disc: formatRupiah(fiveHoursDiscAmount),
      current_five_hours: formatRupiah(currentFiveHoursAmount),
      features: area.features,
    };
  });
};

export const reguler_packages = generateRegulerPackages();
export const wedding_packages = generateWeddingPackages();
