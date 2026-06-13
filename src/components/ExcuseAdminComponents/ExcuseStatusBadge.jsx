const statusStyles = {
  جديد: "border border-amber-200 bg-amber-50 text-amber-700",
  مقبول: "border border-emerald-200 bg-emerald-50 text-emerald-700",
  مرفوض: "border border-rose-200 bg-rose-50 text-rose-700",
  "قيد المراجعة": "border border-[#d9d1bb] bg-[#f3efe2] text-[#555d30]",
};

const statusDot = {
  جديد: "bg-amber-500",
  مقبول: "bg-emerald-500",
  مرفوض: "bg-rose-500",
  "قيد المراجعة": "bg-[#555d30]",
};

export default function ExcuseStatusBadge({ status }) {
  const style =
    statusStyles[status] ?? "border border-slate-200 bg-slate-50 text-slate-600";
  const dot = statusDot[status] ?? "bg-slate-400";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${style}`}
    >
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
      {status}
    </span>
  );
}
