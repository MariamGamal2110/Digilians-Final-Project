import { useState, useEffect } from "react";
import RequestsTable from "../../components/ExcuseAdminComponents/RequestsTable";
import ExcuseSidebar from "../../components/ExcuseAdminComponents/ExcuseSidebar";
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
          id: r._id,
          _id: r._id,
          militaryId: r.militaryId || "-",
          name: r.studentName || r.user?.name || r.user?.email || "-",
          type: r.title || r.type || "التماس",
          status: r.status || "قيد المراجعة",
          details: r.message || r.details || "",
          adminNote: r.response || r.adminNote || "",
          attachments: r.attachments || [],
        }));

        if (mounted) {
          setData(mapped);
        }
      } catch (err) {
        console.error("Failed to load excuses", err);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  const selectedRequest = data.find((r) => r.id === selectedId) ?? null;

  function handleSelect(row) {
    setSelectedId(row.id);
  }

  async function handleDecision(id, decision, note) {
    const oldData = data;

    setData((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: decision,
              adminNote: note,
            }
          : r
      )
    );

    try {
      const updated = await respondToExcuse(id, {
        status: decision,
        response: note,
      });

      setData((prev) =>
        prev.map((r) =>
          r.id === id
            ? {
                ...r,
                status: updated?.status || decision,
                adminNote: updated?.response || updated?.adminNote || note,
              }
            : r
        )
      );
    } catch (err) {
      console.error("Failed to send decision", err);
      setData(oldData);
    }
  }

  return (
    <section dir="rtl" className="bg-[#fafafa] min-h-screen px-6 py-8">
      <div className="max-w-[1300px] mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold mb-2 text-[#555d30]">
            إدارة الالتماسات النشطة
          </h1>

          <p className="text-sm leading-7 max-w-xl text-gray-600">
            مراجعة والبت في طلبات الإجازات الاستثنائية والالتماسات المقدمة
          </p>
        </div>

        <div className="flex gap-4 items-start">
          <div className="flex-1 min-w-0">
            <RequestsTable
              data={data}
              selectedId={selectedId}
              onSelect={handleSelect}
            />
          </div>

          <div className="w-80 flex-shrink-0">
            <ExcuseSidebar
              request={selectedRequest}
              onDecision={handleDecision}
            />
          </div>
        </div>
      </div>
    </section>
  );
}