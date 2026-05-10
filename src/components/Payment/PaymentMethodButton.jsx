const PaymentMethodButton = ({
  icon: Icon,
  id,
  label,
  info,
  selectedMethod,
  onSelectedMethod,
}) => {
  const isActive = selectedMethod === id;

  return (
    <button
      type="button"
      onClick={() => onSelectedMethod(id)}
      className={`flex flex-col items-center gap-2.5 p-3.5 border-2 transition-all cursor-pointer ${
        isActive
          ? "border-[#0f131f] bg-[#0f131f]/5"
          : "border-[#0f131f]/15 hover:border-[#0f131f]/40 bg-white"
      }`}
    >
      {Icon && (
        <Icon
          size={22}
          strokeWidth={1.5}
          color={isActive ? "#0f131f" : "#9ca3af"}
        />
      )}

      <div className="flex flex-col gap-0.5">
        <span
          className={`text-xs font-medium text-center ${
            isActive ? "text-[#0f131f]" : "text-black/50"
          }`}
        >
          {label}
        </span>
        <span className="text-[10px] text-black/30 text-center leading-tight">
          {info}
        </span>
      </div>
    </button>
  );
};

export default PaymentMethodButton;
