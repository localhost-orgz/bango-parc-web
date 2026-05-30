import React, { useState, useEffect, useRef } from "react";
import { 
  Wifi, Tv, AirVent, Car, Utensils, Coffee, ShowerHead, Bath, Bed, Trees, 
  Flower2, Dumbbell, Waves, Key, Shield, Sparkles, Heart, Music, MapPin, 
  Info, Star, Flame, Refrigerator, Cigarette, Volume2, VolumeX, Plug, 
  Mic, Monitor, Gamepad2, Tent, Compass, Map, Bike, Calendar, Lock,
  Unlock, HelpCircle, Phone, Mail, Globe, Search
} from "lucide-react";

const ICONS_MAP = {
  Wifi, Tv, AirVent, Car, Utensils, Coffee, ShowerHead, Bath, Bed, Trees, 
  Flower2, Dumbbell, Waves, Key, Shield, Sparkles, Heart, Music, MapPin, 
  Info, Star, Flame, Refrigerator, Cigarette, Volume2, VolumeX, Plug, 
  Mic, Monitor, Gamepad2, Tent, Compass, Map, Bike, Calendar, Lock,
  Unlock, HelpCircle, Phone, Mail, Globe
};

export function getIconNameFromSvg(svgHtml) {
  if (!svgHtml) return "";
  const match = svgHtml.match(/lucide-([a-z0-9\-]+)/);
  if (match && match[1]) {
    return match[1]
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("");
  }
  return "";
}

export default function IconPicker({ value, onChange }) {
  const [search, setSearch] = useState("");
  const previewRef = useRef(null);
  
  // Extract icon name from parent svg string value (e.g. for Edit Modal init)
  const matchedName = getIconNameFromSvg(value);
  const [selectedName, setSelectedName] = useState(matchedName || "Wifi");

  // Keep selectedName in sync with value updates from parent
  useEffect(() => {
    const newName = getIconNameFromSvg(value);
    if (newName && newName !== selectedName) {
      setSelectedName(newName);
    }
  }, [value]);

  // When selected icon name changes, extract the raw SVG HTML from preview DOM ref
  useEffect(() => {
    if (previewRef.current) {
      const svg = previewRef.current.querySelector("svg");
      if (svg) {
        onChange(svg.outerHTML);
      }
    }
  }, [selectedName]);

  const filteredIcons = Object.keys(ICONS_MAP).filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  const SelectedIcon = ICONS_MAP[selectedName] || Wifi;

  return (
    <div className="flex flex-col gap-3">
      {/* Hidden element to render the icon and extract its HTML string */}
      <div ref={previewRef} className="hidden">
        <SelectedIcon size={24} />
      </div>

      <div className="flex gap-4 items-center border border-[#0F131F]/10 p-3 bg-[#f9f8f6]">
        <div className="w-12 h-12 flex items-center justify-center bg-white border border-[#0F131F]/15 text-[#0F131F]">
          <SelectedIcon size={24} />
        </div>
        <div>
          <p className="text-xs text-black/40 font-semibold uppercase tracking-wider">Terpilih</p>
          <p className="text-sm font-semibold text-[#0F131F]">{selectedName}</p>
        </div>
      </div>

      <div className="relative">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-black/35"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari ikon..."
          className="w-full h-9 pl-9 pr-3 text-xs border border-[#0F131F]/15 bg-white outline-none focus:border-[#0F131F]/40 transition-colors"
        />
      </div>

      <div className="grid grid-cols-6 gap-2 p-2 border border-[#0F131F]/10 max-h-48 overflow-y-auto bg-white">
        {filteredIcons.map((name) => {
          const Icon = ICONS_MAP[name];
          const isSelected = selectedName === name;
          return (
            <button
              key={name}
              type="button"
              onClick={() => setSelectedName(name)}
              className={`flex items-center justify-center p-2 border transition-all ${
                isSelected
                  ? "border-[#0F131F] bg-[#0F131F]/5 text-[#0F131F]"
                  : "border-transparent text-black/60 hover:border-[#0F131F]/20 hover:bg-[#f9f8f6]"
              }`}
              title={name}
            >
              <Icon size={18} />
            </button>
          );
        })}
        {filteredIcons.length === 0 && (
          <div className="col-span-6 text-center py-6 text-xs text-black/30 bg-white">
            Ikon tidak ditemukan
          </div>
        )}
      </div>
    </div>
  );
}
