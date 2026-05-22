// Reusable status badge — used in both RequestsTable and ExcuseSidebar
// Usage: <ExcuseStatusBadge status="مقبول" />

const statusStyles = {
  جديد:    "bg-yellow-100 text-yellow-700 border border-yellow-200",
  مقبول:   "bg-green-100  text-green-700  border border-green-200",
  مرفوض:   "bg-red-100    text-red-700    border border-red-200",
  "قيد المراجعة": "bg-blue-100 text-blue-700 border border-blue-200",
};

const statusDot = {
  جديد:    "bg-yellow-400",
  مقبول:   "bg-green-500",
  مرفوض:   "bg-red-500",
  "قيد المراجعة": "bg-blue-400",
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