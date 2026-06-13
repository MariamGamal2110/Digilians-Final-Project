import { useState, useEffect } from "react";
import { FiShield, FiAlertTriangle } from "react-icons/fi";
import AdminPunishmentStats from "../../components/punishmentsAdminSideComp/Adminpunishmentstats";
import AdminPunishmentTable from "../../components/punishmentsAdminSideComp/AdminPunishmentTable";
import { apiRequest } from "../../api/client";

const API = "/punishments";

export default function PunishmentAdmin() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchPunishments() {
    try {
      setLoading(true);
      setError(null);
      const response = await apiRequest(API, { method: "GET" }, "admin");
      setData(response.punishments || []);
    } catch (err) {
      console.error("❌ خطأ في جلب البيانات:", err);
      setError(err.message || "فشل في تحميل البيانات");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPunishments();
  }, []);

  async function handleAdd(record) {
    try {
      const response = await apiRequest(API, {
        method: "POST",
        body: JSON.stringify(record),
      }, "admin");
      setData((prev) => [response.punishment, ...prev]);
      setError(null);
    } catch (err) {
      console.error("❌ خطأ في الإضافة:", err);
      setError(err.message || "حدث خطأ أثناء الإضافة");
    }
  }

  async function handleEdit(index, record) {
    try {
      const id = data[index]._id;
      const response = await apiRequest(`${API}/${id}`, {
        method: "PUT",
        body: JSON.stringify(record),
      }, "admin");
      setData((prev) => prev.map((row, i) => (i === index ? response.punishment : row)));
      setError(null);
    } catch (err) {
      console.error("❌ خطأ في التعديل:", err);
      setError(err.message || "حدث خطأ أثناء التعديل");
    }
  }

  async function handleDelete(index) {
    try {
      const id = data[index]._id;
      await apiRequest(`${API}/${id}`, { method: "DELETE" }, "admin");
      setData((prev) => prev.filter((_, i) => i !== index));
      setError(null);
    } catch (err) {
      console.error("❌ خطأ في الحذف:", err);
      setError(err.message || "حدث خطأ أثناء الحذف");
    }
  }

  function handleDegreeChange(target, amount) {
    setData((prev) =>
      prev.map((row, i) =>
        (typeof target === "number" ? i === target : row.militaryNum === target.militaryNum)
          ? { ...row, degree: Math.max(0, Math.min(20, Number(row.degree || 0) + amount)) }
          : row
      )
    );
  }

  function handleCommentChange(target, comment) {
    setData((prev) =>
      prev.map((row, i) =>
        (typeof target === "number" ? i === target : row.militaryNum === target.militaryNum)
          ? { ...row, comment }
          : row
      )
    );
  }

  const filteredData = data.filter(
    (r) =>
      r.studentName?.toLowerCase().includes(searchText.toLowerCase()) ||
      r.militaryNum?.includes(searchText),
  );

  const shownCount = searchText ? filteredData.length : data.length;
  const displayData = searchText ? filteredData : data;

  if (loading) {
    return (
      <section dir="rtl" className="bg-[#fafafa] min-h-screen px-6 py-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500">جاري تحميل البيانات...</p>
        </div>
      </section>
    );
  }

  return (
    <section dir="rtl" className="bg-[#fafafa] min-h-screen px-6 py-8">
      <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-8">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="relative overflow-hidden bg-[#555d30] rounded-2xl p-8 mb-6">
            <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-white/10" />
            <div className="absolute left-16 bottom-[-45px] w-32 h-32 rounded-full bg-white/5" />
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
                  عرض وإدارة المخالفات والعقوبات المسجلة على جميع الطلاب
                </p>
              </div>
              <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <FiAlertTriangle size={36} />
              </div>
            </div>
          </div>

          <AdminPunishmentStats
            total={data.length}
            females={data.filter((r) => r.gender === "female").length}
            males={data.filter((r) => r.gender === "male").length}
            shown={shownCount}
          />

          <AdminPunishmentTable
            data={displayData}
            searchText={searchText}
            onSearchChange={setSearchText}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDegreeChange={handleDegreeChange}
            onCommentChange={handleCommentChange}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </section>
  );
}
