import { useEffect, useState } from "react";
import { FiCalendar, FiFileText } from "react-icons/fi";
import ExcuseUserForm from "../../components/ExcuseUserComponents/ExcuseUserForm";
import ExcuseDef from "../../components/ExcuseUserComponents/ExcuseDef";
import ExcuseHistoryTable from "../../components/ExcuseUserComponents/ExcuseHistoryTable";
import ExcusStatus from "../../components/ExcuseUserComponents/ExcusStatus";
import { getMyExcuses } from "../../api/excuse";

export default function ExecuseUser() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    let mounted = true;

    async function loadRequests() {
      try {
        const rows = await getMyExcuses();
        if (mounted) {
          setRequests(Array.isArray(rows) ? rows : []);
        }
      } catch (err) {
        console.error("Failed to load student excuses", err);
      }
    }

    loadRequests();

    return () => {
      mounted = false;
    };
  }, []);

  function handleSubmitted(created) {
    setRequests((prev) => [created, ...prev]);
  }

  return (
    <section
      dir="rtl"
      className="min-h-screen bg-[#f6f3ea] px-4 py-6 md:px-6 md:py-8"
    >
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[28px] border border-[#e5dfcf] bg-white shadow-[0_24px_80px_rgba(31,34,15,0.08)]">
        <div className="p-4 md:p-8">
          <div className="relative mb-8 overflow-hidden rounded-[24px] bg-[#555d30] px-6 py-7 text-white md:px-8">
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
            <div className="absolute bottom-[-45px] left-16 h-32 w-32 rounded-full bg-white/5" />

            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white">
                  <FiFileText />
                  الالتماسات والأعذار
                </div>

                <h1 className="mb-3 text-3xl font-extrabold">تقديم التماس جديد</h1>

                <p className="max-w-2xl text-sm leading-7 text-white/80 md:text-base">
                  املأ البيانات بدقة وأرفق المستندات المطلوبة إن وجدت، وسيتم
                  مراجعة الطلب وفق سياسة الأكاديمية مع متابعة آخر حالة للالتماس
                  من نفس الصفحة.
                </p>
              </div>

              <div className="w-20 h-20 rounded-2xl border border-white/20 bg-white/10 flex items-center justify-center text-white">
                <FiCalendar size={34} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1.45fr)_380px]">
            <div className="min-w-0">
              <ExcuseUserForm onSubmitted={handleSubmitted} />
            </div>

            <div className="space-y-5">
              <ExcusStatus />
              <ExcuseHistoryTable requests={requests} />
            </div>
          </div>

          <div className="mt-6">
            <ExcuseDef />
          </div>
        </div>
      </div>
    </section>
  );
}
