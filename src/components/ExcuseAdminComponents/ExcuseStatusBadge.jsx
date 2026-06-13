// Reusable status badge — used in both RequestsTable and ExcuseSidebar
// Usage: <ExcuseStatusBadge status="مقبول" />

const statusStyles = {
  جديد:    "bg-yellow-100 text-yellow-700 border border-yellow-200",
  مقبول:   "bg-green-200 text-green-800 border border-green-300",
  مرفوض:   "bg-red-200 text-red-800 border border-red-300",
  "قيد المراجعة": "bg-yellow-100 text-yellow-800 border border-yellow-200",
};

const statusDot = {
  جديد:    "bg-yellow-400",
  مقبول:   "bg-green-600",
  مرفوض:   "bg-red-600",
  "قيد المراجعة": "bg-yellow-500",
};

export default function ExcuseStatusBadge({ status }) {
  const style = statusStyles[status] ?? "bg-gray-100 text-gray-600 border border-gray-200";
  const dot   = statusDot[status]   ?? "bg-gray-400";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${style}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot}`} />
      {status}
    </span>
  );
}