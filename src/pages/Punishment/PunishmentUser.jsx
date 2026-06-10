import { useState, useEffect } from "react";
import { FiShield, FiAlertTriangle } from "react-icons/fi";
import UserPunishmentsAnalysis from "../../components/punishmentUserSideComp/UserPunishmentsAnalysis";
import UserPunishmentTable from "../../components/punishmentUserSideComp/UserPunishmentTable";
import { getSavedUser } from "../../api/client";
import { searchStudentPunishments } from "../../api/punishments";

export default function PunishmentUser() {
  const currentUser = getSavedUser("user") || getSavedUser("admin") || {};
  const [studentName, setStudentName] = useState(currentUser.name || "");
  const [militaryNum, setMilitaryNum] = useState(currentUser.militaryId || "");
  const [punishments, setPunishments] = useState([]);
  const [stats, setStats] = useState({ totalPunishments: 0, deductedPoints: 0, remainingPoints: 100 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTouched, setSearchTouched] = useState(false);

  // دالة جلب البيانات
  const fetchData = async (militaryNumParam, nameParam) => {
    if (!militaryNumParam || militaryNumParam.trim() === "") {
      setError("الرجاء إدخال الرقم العسكري");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log("🔄 جاري جلب المخالفات للرقم:", militaryNumParam);
      
      const data = await searchStudentPunishments(militaryNumParam, nameParam || "");
      
      console.log("✅ البيانات المُرجعة:", data);
      
      setPunishments(data.punishments || []);
      setStats(data.stats || { totalPunishments: 0, deductedPoints: 0, remainingPoints: 100 });
      setSearchTouched(true);
    } catch (err) {
      console.error("❌ خطأ في جلب المخالفات:", err);
      setError(err.message || "حدثت مشكلة أثناء جلب المخالفات");
      setPunishments([]);
      setSearchTouched(true);
    } finally {
      setLoading(false);
    }
  };

  // تحميل البيانات تلقائياً عند دخول الصفحة
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const militaryId = currentUser?.militaryId;
    const name = currentUser?.name;
    
    console.log("📋 بيانات الطالب:", { militaryId, name });
    
    if (militaryId && militaryId.trim() !== "") {
      console.log("✅ جاري تحميل المخالفات تلقائياً...");
      // eslint-disable-next-line react-hooks/exhaustive-deps
      fetchData(militaryId, name || "");
    } else {
      console.warn("⚠️ لم يتم اكتشاف رقم عسكري");
      setLoading(false);
    }
  }, []);

  // البحث اليدوي
  const handleSearch = () => {
    if (!militaryNum.trim()) {
      setError("الرجاء إدخال الرقم العسكري");
      return;
    }
    fetchData(militaryNum, studentName);
  };

  return (
    <section dir="rtl" className="bg-[#fafafa] min-h-screen px-6 py-8">
      <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-8">
          <div className="relative overflow-hidden bg-[#555d30] rounded-2xl p-8 mb-6">
            <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-white/10"></div>
            <div className="absolute left-16 bottom-[-45px] w-32 h-32 rounded-full bg-white/5"></div>

            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="text-right">
                <div className="inline-flex items-center gap-2 bg-white/10 text-white rounded-full px-4 py-2 text-sm font-bold mb-4">
                  <FiShield />
                  سجل السلوك والانضباط
                </div>

                <h1 className="text-white text-3xl font-extrabold mb-3">
                  العقوبات والمخالفات
                </h1>

                <p className="text-white/80 text-sm leading-7 max-w-xl">
                  عرض جميع المخالفات والعقوبات المطبقة عليك، مع توضيح الدرجات المخصومة وباقي درجات السلوك.
                </p>
              </div>

              <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <FiAlertTriangle size={36} />
              </div>
            </div>
          </div>

          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-bold text-[#555d30] mb-2 inline-block">
                الاسم
              </label>
              <input
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="ادخل اسمك"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#555d30]"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-[#555d30] mb-2 inline-block">
                الرقم العسكري *
              </label>
              <input
                value={militaryNum}
                onChange={(e) => setMilitaryNum(e.target.value)}
                placeholder="مثال: 22589"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#555d30]"
              />
              {!militaryNum && (
                <p className="text-xs text-red-500 mt-2">
                  ⚠️ لا يتم عرض رقمك العسكري من النظام. يرجى إدخاله يدوياً.
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch gap-3 mb-8">
            <button
              onClick={handleSearch}
              disabled={loading}
              className="w-full sm:w-auto bg-[#555d30] text-white rounded-2xl px-6 py-3 text-sm font-bold hover:bg-[#3f4723] transition disabled:opacity-50"
            >
              {loading ? "جاري التحميل..." : "عرض المخالفات"}
            </button>
          </div>

          {error && (
            <div className="mb-6 rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              ⚠️ {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-12 text-gray-500">
              <p>جاري تحميل البيانات...</p>
            </div>
          ) : (
            <>
              <UserPunishmentsAnalysis
                studentName={studentName || "الطالب"}
                totalPunishments={stats.totalPunishments}
                deductedPoints={stats.deductedPoints}
                remainingPoints={stats.remainingPoints}
              />

              <UserPunishmentTable punishments={punishments} />

              {searchTouched && punishments.length === 0 && !error && (
                <div className="mt-6 rounded-2xl border border-gray-200 bg-[#faf9f4] px-6 py-5 text-center text-sm text-[#6b6f5a]">
                  ✅ لا توجد مخالفات مسجلة - سلوك ممتاز!
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
