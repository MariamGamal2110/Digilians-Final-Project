import { useEffect, useState } from "react";
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiClock,
  FiTrash2,
  FiShield,
  FiXCircle,
} from "react-icons/fi";
import RequestsTable from "../../components/ExcuseAdminComponents/RequestsTable";
import ExcuseSidebar from "../../components/ExcuseAdminComponents/ExcuseSidebar";
import { clearAllExcuses, getAllExcuses, respondToExcuse } from "../../api/excuse";

const initialData = [];

export default function ExecuseAdmin() {
  const [data, setData] = useState(initialData);
  const [selectedId, setSelectedId] = useState(null);
  const [isClearingAll, setIsClearingAll] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setErrorMessage("");
        const excusesRows = await getAllExcuses();

        const mapped = (excusesRows || []).map((r) => ({
          id: r._id,
          _id: r._id,
          militaryId: r.militaryId || "-",
          name: r.studentName || r.user?.name || r.user?.email || "-",
          type: r.title || r.type || "الالتماس",
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
        if (mounted) {
          setErrorMessage(err.message || "تعذر تحميل الالتماسات");
        }
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  const selectedRequest = data.find((r) => r.id === selectedId) ?? null;
  const pendingCount = data.filter((row) => row.status === "قيد المراجعة").length;
  const acceptedCount = data.filter((row) => row.status === "مقبول").length;
  const rejectedCount = data.filter((row) => row.status === "مرفوض").length;

  const summaryCards = [
    {
      title: "إجمالي الطلبات",
      value: data.length,
      subtitle: "كل الالتماسات المسجلة",
      icon: FiShield,
      accent: "bg-[#555d30]/10 text-[#555d30]",
    },
    {
      title: "قيد المراجعة",
      value: pendingCount,
      subtitle: "تنتظر قرار المسؤول",
      icon: FiClock,
      accent: "bg-amber-100 text-amber-700",
    },
    {
      title: "تمت الموافقة",
      value: acceptedCount,
      subtitle: "طلبات مقبولة",
      icon: FiCheckCircle,
      accent: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "تم الرفض",
      value: rejectedCount,
      subtitle: "طلبات مرفوضة",
      icon: FiXCircle,
      accent: "bg-rose-100 text-rose-700",
    },
  ];

  function handleSelect(row) {
    setSelectedId(row.id);
  }

  async function handleDecision(id, decision, note) {
    const oldData = data;
    setErrorMessage("");

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
      setErrorMessage(err.message || "تعذر إرسال القرار");
      setData(oldData);
    }
  }

  async function handleClearAll() {
    if (!data.length || isClearingAll) {
      return;
    }

    const confirmed = window.confirm("هل تريد حذف جميع الالتماسات؟");
    if (!confirmed) {
      return;
    }

    try {
      setIsClearingAll(true);
      setErrorMessage("");
      await clearAllExcuses();
      setData([]);
      setSelectedId(null);
    } catch (err) {
      console.error("Failed to clear excuses", err);
      setErrorMessage(err.message || "تعذر حذف جميع الالتماسات");
    } finally {
      setIsClearingAll(false);
    }
  }

  return (
    <section dir="rtl" className="min-h-screen bg-[#f6f3ea] px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[28px] border border-[#e5dfcf] bg-white shadow-[0_24px_80px_rgba(31,34,15,0.08)]">
        <div className="p-4 md:p-8">
          {errorMessage && (
            <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">
              {errorMessage}
            </div>
          )}

          <div className="relative mb-8 overflow-hidden rounded-[24px] bg-[#555d30] px-6 py-7 text-white md:px-8">
            <div className="absolute -right-12 top-0 h-36 w-36 rounded-full bg-white/10" />
            <div className="absolute bottom-[-3.5rem] left-[-2rem] h-32 w-32 rounded-full bg-[#89935a]/35" />

            <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
                  <FiAlertTriangle className="text-sm" />
                  لوحة مراجعة الالتماسات
                </span>

                <h1 className="text-2xl font-extrabold leading-tight md:text-3xl">
                 إدارة طلبات الالتماسات
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/80 md:text-base">
                  واجهة متابعة موحدة لمراجعة طلبات الطلاب، استعراض التفاصيل،
                  واتخاذ القرار بسرعة مع الحفاظ على نفس البيانات والمنطق الحالي.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:min-w-[280px]">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-xs text-white/70">إجمالي الالتماسات</p>
                  <p className="mt-2 text-2xl font-extrabold">{data.length}</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-xs text-white/70">بانتظار المراجعة</p>
                  <p className="mt-2 text-2xl font-extrabold">{pendingCount}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-[#1f220f]">
                إدارة جدول الالتماسات
              </h2>
              <p className="mt-1 text-sm text-[#6b7053]">
                يمكنك مراجعة الطلبات أو حذفها كلها دفعة واحدة بعد التأكيد.
              </p>
            </div>

            <button
              type="button"
              onClick={handleClearAll}
              disabled={!data.length || isClearingAll}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:border-rose-100 disabled:bg-rose-50/60 disabled:text-rose-300"
            >
              <FiTrash2 size={16} />
              {isClearingAll ? "جارٍ حذف الالتماسات..." : "حذف جميع الالتماسات"}
            </button>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {summaryCards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.title}
                  className="rounded-2xl border border-[#ece6d7] bg-[#fcfbf7] p-5 shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className={`rounded-2xl p-3 ${card.accent}`}>
                      <Icon className="text-lg" />
                    </div>
                    <span className="text-3xl font-extrabold text-[#1f220f]">
                      {card.value}
                    </span>
                  </div>

                  <h2 className="text-sm font-bold text-[#1f220f]">{card.title}</h2>
                  <p className="mt-1 text-xs leading-6 text-[#6b7053]">
                    {card.subtitle}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
            <div className="min-w-0 flex-1">
              <RequestsTable
                data={data}
                selectedId={selectedId}
                onSelect={handleSelect}
              />
            </div>

            <div className="w-full shrink-0 xl:w-[360px]">
              <ExcuseSidebar
                request={selectedRequest}
                onDecision={handleDecision}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
