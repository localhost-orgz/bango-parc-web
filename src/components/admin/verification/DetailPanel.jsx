import {
  ArrowRight,
  Building2,
  CheckCircle2,
  CreditCard,
  Download,
  ImageIcon,
  Mail,
  Phone,
  XCircle,
} from "lucide-react";
import StatusBadge from "./StatusBadge";
import TypeBadge from "./TypeBadge";
import PayTypeBadge from "./PayTypeBadge";

function DetailPanel({ item, onApprove, onReject }) {
  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 gap-3">
        <div className="w-14 h-14 border-2 border-dashed border-[#0F131F]/15 flex items-center justify-center">
          <CreditCard size={20} strokeWidth={1} color="#0F131F50" />
        </div>
        <p className="text-sm text-black/30 font-crimson-text">
          Pilih pembayaran untuk melihat detail
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-0 h-full overflow-y-auto">
      {/* Header */}
      <div className="px-6 py-5 border-b border-[#0F131F]/10 bg-white sticky top-0 z-10">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-crimson-pro text-2xl text-[#0F131F] leading-tight">
              {item.id}
            </p>
            <p className="text-xs text-black/40 mt-0.5">
              Diajukan {item.submittedAt}
            </p>
          </div>
          <StatusBadge status={item.status} />
        </div>
      </div>

      <div className="flex flex-col gap-0 overflow-y-auto px-6 py-5 flex-1">
        {/* Customer Info */}
        <section className="mb-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-black/35 mb-3">
            Info Pemesan
          </p>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#0F131F] flex items-center justify-center shrink-0">
              <span className="text-white font-semibold text-sm">
                {item.orderer.avatar}
              </span>
            </div>
            <div>
              <p className="font-semibold text-[#0F131F] text-sm">
                {item.orderer.name}
              </p>
              <p className="text-xs text-black/40">Guest</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs text-black/55">
              <Mail
                size={12}
                strokeWidth={1.5}
                className="shrink-0 text-[#896d51]"
              />
              <span>{item.orderer.email}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-black/55">
              <Phone
                size={12}
                strokeWidth={1.5}
                className="shrink-0 text-[#896d51]"
              />
              <span>{item.orderer.phone}</span>
            </div>
          </div>
        </section>

        <div className="h-px bg-[#0F131F]/8 mb-5" />

        {/* Order Details */}
        <section className="mb-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-black/35 mb-3">
            Detail Pesanan
          </p>
          <div className="border border-[#0F131F]/10 bg-[#f9f8f6] p-4 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <Building2 size={13} strokeWidth={1.5} color="#896d51" />
                <span className="text-sm font-semibold text-[#0F131F]">
                  {item.area}
                </span>
              </div>
              <TypeBadge type={item.type} />
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-0.5">
                <p className="text-[10px] text-black/35 uppercase tracking-wide">
                  Tanggal
                </p>
                <div className="flex items-center gap-1.5 text-xs text-[#0F131F]">
                  {/* <CalIcon size={11} strokeWidth={1.5} /> */}
                  <span className="font-medium">{item.date}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1 text-[#0F131F] font-medium">
                <span>{item.time.split("–")[0].trim()}</span>
              </div>
              <ArrowRight size={10} strokeWidth={2} color="#896d51" />
              <div className="flex items-center gap-1 text-[#0F131F] font-medium">
                <span>{item.time.split("–")[1]?.trim()}</span>
              </div>
              <span className="text-black/30 ml-auto">{item.duration} jam</span>
            </div>
          </div>
        </section>

        <div className="h-px bg-[#0F131F]/8 mb-5" />

        {/* Payment Info */}
        <section className="mb-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-black/35 mb-3">
            Info Pembayaran
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-black/50">Tipe Pembayaran</span>
              <PayTypeBadge type={item.paymentType} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-black/50">Jumlah Dibayar</span>
              <span className="text-sm font-bold text-[#0F131F]">
                Rp{item.paymentAmount.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-black/50">Total Booking</span>
              <span className="text-xs text-black/40">
                Rp{item.totalAmount.toLocaleString("id-ID")}
              </span>
            </div>
            {item.paymentType === "DP" && (
              <div className="flex items-center justify-between border-t border-[#0F131F]/8 pt-2 mt-1">
                <span className="text-xs text-black/50">Sisa Pelunasan</span>
                <span className="text-xs font-semibold text-amber-600">
                  Rp
                  {(item.totalAmount - item.paymentAmount).toLocaleString(
                    "id-ID",
                  )}
                </span>
              </div>
            )}
          </div>
        </section>

        <div className="h-px bg-[#0F131F]/8 mb-5" />

        {/* Evidence */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-black/35">
              Bukti Pembayaran
            </p>
            <button className="flex items-center gap-1 text-xs text-[#896d51] hover:text-[#73563e] transition-colors">
              <Download size={11} strokeWidth={2} />
              <span>Download</span>
            </button>
          </div>
          <div className="w-full aspect-video bg-gray-200 overflow-hidden relative border border-[#0F131F]/10">
            <img
              src={item.evidenceUrl}
              alt="Bukti Pembayaran"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div
              className="absolute inset-0 bg-[#f3f4f7] hidden items-center justify-center"
              style={{ display: "none" }}
            >
              <div className="flex flex-col items-center gap-2">
                <ImageIcon size={24} strokeWidth={1} color="#0F131F40" />
                <span className="text-xs text-black/30">
                  Tidak dapat memuat gambar
                </span>
              </div>
            </div>
          </div>
          <p className="text-[10px] text-black/30 mt-2 text-center">
            Klik gambar untuk memperbesar · Format: JPG/PNG/PDF
          </p>
        </section>

        {/* Actions */}
        {item.status === "Pending" && (
          <div className="flex gap-3 mt-auto">
            <button
              onClick={() => onReject(item.id)}
              className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-red-500 text-red-500 text-sm font-semibold hover:bg-red-500 hover:text-white transition-colors"
            >
              <XCircle size={15} strokeWidth={2} />
              Tolak
            </button>
            <button
              onClick={() => onApprove(item.id)}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#0F131F] text-white text-sm font-semibold hover:bg-[#896d51] transition-colors"
            >
              <CheckCircle2 size={15} strokeWidth={2} />
              Verifikasi
            </button>
          </div>
        )}
        {item.status !== "Pending" && (
          <div
            className={`flex items-center gap-2 p-3 border text-sm font-semibold ${
              item.status === "Approved"
                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                : "bg-red-50 border-red-200 text-red-600"
            }`}
          >
            {item.status === "Approved" ? (
              <CheckCircle2 size={15} strokeWidth={2} />
            ) : (
              <XCircle size={15} strokeWidth={2} />
            )}
            Pembayaran telah{" "}
            {item.status === "Approved" ? "diverifikasi" : "ditolak"}
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailPanel;
