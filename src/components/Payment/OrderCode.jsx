const OrderCode = ({ code }) => {
  return (
    <div className="bg-[#896d51] p-4 flex flex-col gap-1">
      <span className="text-white/70 text-xs uppercase tracking-wider">
        Kode Pemesanan
      </span>
      <span className="text-white font-crimson-pro text-2xl tracking-widest">
        {code}
      </span>
    </div>
  );
};

export default OrderCode;
