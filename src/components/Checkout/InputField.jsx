export default function InputField({
  label,
  placeholder,
  type = "text",
  required = false,
  hint,
  value,
  onChange,
  disabled = false,
  readOnly = false,
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
        value={value}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
        className={`w-full h-11 border-b-2 bg-transparent text-sm text-[#0F131F] placeholder:text-black/25 outline-none transition-colors px-1 ${
          disabled || readOnly
            ? "border-gray-200 text-gray-500 cursor-not-allowed opacity-75"
            : "border-[#0F131F]/20 focus:border-[#0F131F]"
        }`}
      />
      {hint && <p className="text-[10px] text-black/30">{hint}</p>}
    </div>
  );
}
