import { ChevronDown, ChevronUp } from "lucide-react";

function SortHeader({ label, field, sortField, sortDir, onSort }) {
  const active = sortField === field;
  return (
    <button
      onClick={() => onSort(field)}
      className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest text-black/40 hover:text-black/70 transition-colors group"
    >
      {label}
      <span
        className={`transition-opacity ${active ? "opacity-100" : "opacity-0 group-hover:opacity-40"}`}
      >
        {active && sortDir === "asc" ? (
          <ChevronUp size={11} />
        ) : (
          <ChevronDown size={11} />
        )}
      </span>
    </button>
  );
}
export default SortHeader;
