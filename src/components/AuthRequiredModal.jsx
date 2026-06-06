"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LogIn, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuthRequiredModal({ isOpen, onOpenChange }) {
  const router = useRouter();

  const handleLogin = () => {
    onOpenChange(false);
    router.push("/login");
  };

  const handleSignup = () => {
    onOpenChange(false);
    router.push("/signup");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] p-6 rounded-xl border border-neutral-100 bg-white shadow-2xl overflow-hidden">
        <DialogHeader className="flex flex-col items-center text-center mt-2">
          {/* Elegant Icon Badge with Gradient Glow */}
          <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-[#896d51] border border-amber-100/50 shadow-inner">
            <LogIn size={26} strokeWidth={1.8} className="translate-x-0.5" />
            <div className="absolute inset-0 rounded-full bg-[#896d51]/5 animate-ping opacity-75 duration-1000" />
          </div>
          
          <DialogTitle className="font-crimson-pro text-3xl font-semibold text-[#0F131F] leading-tight">
            Satu Langkah Lagi!
          </DialogTitle>
          
          <DialogDescription className="text-neutral-500 text-sm mt-3 px-2 leading-relaxed">
            Untuk melanjutkan pemesanan venue di Bango Parc, silakan masuk ke akun Anda terlebih dahulu. Ini membantu kami mendata pesanan dan mempermudah komunikasi ke depannya.
          </DialogDescription>
        </DialogHeader>

        {/* Buttons Section */}
        <div className="flex flex-col gap-3 mt-6 w-full">
          <button
            onClick={handleLogin}
            className="w-full bg-[#0F131F] text-white hover:bg-[#896d51] py-3 text-sm font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
          >
            <LogIn size={16} strokeWidth={2} />
            Masuk ke Akun
          </button>
          
          <button
            onClick={handleSignup}
            className="w-full border-2 border-[#0F131F]/15 text-[#0F131F] hover:bg-[#0F131F]/5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <UserPlus size={16} strokeWidth={2} />
            Daftar Akun Baru
          </button>
          
          <button
            onClick={() => onOpenChange(false)}
            className="w-full text-xs text-neutral-400 hover:text-neutral-600 transition-colors py-1.5 cursor-pointer mt-1 font-medium text-center"
          >
            Kembali
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
