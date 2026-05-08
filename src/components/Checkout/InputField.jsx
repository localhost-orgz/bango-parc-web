export default function InputField({
  label,
  placeholder,
  type = "text",
  required = false,
  hint,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-[#0F131F]/60 tracking-wide uppercase">
        {label}
        {required && <span className="text-[#0F131F] ml-0.5">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-11 border-b-2 border-[#0F131F]/20 bg-transparent text-sm text-[#0F131F] placeholder:text-black/25 outline-none focus:border-[#0F131F] transition-colors px-1"
      />
      {hint && <p className="text-[10px] text-black/30">{hint}</p>}
    </div>
  );
}
