import { useState, useEffect } from "react";
import RequestsTable from "../../components/ExcuseAdminComponents/RequestsTable";
import ExcuseSidebar from "./../../components/ExcuseAdminComponents/ExcuseSidebar";
import { getAllExcuses, respondToExcuse } from "../../api/excuse";

const initialData = [];

export default function ExecuseAdmin() {
  const [data, setData] = useState(initialData);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const excusesRows = await getAllExcuses();
        const mapped = (excusesRows || []).map((r) => ({
          id: r.militaryId || r._id,
          _id: r._id,
          name: r.studentName || r.user?.name || r.user?.email || "-",
          type: r.title || r.type || "التماس",
          status: r.status || "قيد المراجعة",
          details: r.message || r.details || "",
          adminNote: r.response || "",
          attachments: r.attachments || [],
        }));

        if (mounted) setData(mapped);
      } catch (err) {
        console.error("Failed to load excuses", err);
      }
    }

    load();
    return () => (mounted = false);
  }, []);

  // always derive selectedRequest from data so it reflects latest status
  const selectedRequest = data.find((r) => r.id === selectedId) ?? null;

  function handleSelect(row) {
    setSelectedId(row.id);
  }

  // called from ExcuseSidebar when admin approves or rejects
  function handleDecision(id, decision, note) {
    // optimistically update UI
    setData((prev) => prev.map((r) => (r.id === id ? { ...r, status: decision, adminNote: note } : r)));

    // call backend
    (async () => {
      try {
        const updated = await respondToExcuse(id, { response: note, status: decision });

        setData((prev) =>
          prev.map((r) =>
            r.id === id
              ? {
                  ...r,
                  status: updated?.status || decision,
                  adminNote: updated?.response || note,
                }
              : r,
          ),
        );
      } catch (err) {
        console.error("Failed to send decision", err);
      }
    })();
  }

  return (
    <section dir="rtl" className="bg-[#fafafa] min-h-screen px-6 py-8">
      <div className="max-w-[1300px] mx-auto">

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold mb-2 text-[#555d30]">إدارة الالتماسات النشطة</h1>
          <p className="text-sm leading-7 max-w-xl text-gray-600">مراجعة والبت في طلبات الإجازات الاستثنائية والالتماسات المقدمة</p>
        </div>

        {/* Content */}
        <div className="flex gap-4 items-start">
          {/* Table takes remaining width */}
          <div className="flex-1 min-w-0">
            <RequestsTable data={data} selectedId={selectedId} onSelect={handleSelect} />
          </div>

          {/* Sidebar fixed width */}
          <div className="w-80 flex-shrink-0">
            <ExcuseSidebar request={selectedRequest} onDecision={handleDecision} />
          </div>
        </div>

      </div>
    </section>
  );
}