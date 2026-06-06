"use client";

import React from "react";
import { CheckCircle2, XCircle, AlertTriangle, Info } from "lucide-react";

export default function NotificationModal({
  isOpen,
  onClose,
  type = "info",
  title,
  message,
  buttonText = "OK",
  onConfirm,
}) {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center rounded-full mb-1">
            <CheckCircle2 size={24} />
          </div>
        );
      case "error":
        return (
          <div className="w-12 h-12 bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center rounded-full mb-1">
            <XCircle size={24} />
          </div>
        );
      case "warning":
        return (
          <div className="w-12 h-12 bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center rounded-full mb-1">
            <AlertTriangle size={24} />
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center rounded-full mb-1">
            <Info size={24} />
          </div>
        );
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="relative bg-white w-full max-w-sm shadow-2xl p-6 border border-[#0F131F]/10 flex flex-col items-center text-center gap-4 rounded-none">
        {getIcon()}

        <div className="flex flex-col gap-1.5 w-full">
          <h4 className="font-crimson-pro text-xl font-bold text-[#0F131F]">
            {title}
          </h4>
          <p className="text-xs text-black/55 leading-relaxed">
            {message}
          </p>
        </div>

        <button
          type="button"
          onClick={handleConfirm}
          className="w-full py-2.5 bg-[#0f131f] text-white hover:bg-[#896d51] transition-all font-semibold text-[11px] uppercase tracking-wider rounded-none cursor-pointer text-center mt-2"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
