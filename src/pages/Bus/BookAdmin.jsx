import { useState, useEffect } from "react";
import client, { getToken } from "../../api/client";
import { FiShield, FiTruck, FiCheck, FiX } from "react-icons/fi";

export default function BookAdmin() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAllBookings();
  }, []);

  const fetchAllBookings = async () => {
    try {
      const data = await client.apiRequest('/booking/all', {}, 'admin')
      if (data.success) {
        const bookingsArray = Array.isArray(data.data) ? data.data : []
        setBookings(bookingsArray)
        console.log('#final Bookings:', bookingsArray)
      } else {
        setBookings([])
      }
    } catch (err) {
      setError('تعذر الاتصال بالخادم: ' + err.message)
      setBookings([])
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (id, status) => {
    try {
      const data = await client.apiRequest(`/booking/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      }, 'admin');
      if (data.success) {
        setBookings(bookings.map((b) => (b._id === id ? { ...b, status } : b)));
      }
    } catch (err) {
      alert("حدث خطأ أثناء التحديث");
    }
  };

  const getStats = () => {
    const stationCounts = {};
    bookings.forEach((b) => {
      stationCounts[b.alightingStation] = (stationCounts[b.alightingStation] || 0) + 1;
    });
    const absent = bookings.filter((b) => b.status === "rejected").length;
    return { stationCounts, absent };
  };

  const { stationCounts, absent } = getStats();

  const getStatusLabel = (status) => {
    if (status === "confirmed") return { text: "تم الحجز", css: "bg-green-50 text-green-700 border-green-200" };
    if (status === "rejected") return { text: "مرفوض", css: "bg-red-50 text-red-700 border-red-200" };
    return { text: "قيد الانتظار", css: "bg-amber-50 text-amber-700 border-amber-200" };
  };

  const filteredBookings = bookings.filter((b) => {
    const term = searchTerm.toLowerCase();
    return (
      (b.studentName && b.studentName.toLowerCase().includes(term)) ||
      (b.studentId && b.studentId.includes(term))
    );
  });

  if (loading) return <div className="text-center py-20 text-secondary">جاري التحميل...</div>;
  if (error) return <div className="text-center py-20 text-red-400">{error}</div>;

  return (
    <section dir="rtl" className="bg-[#fafafa] min-h-screen px-6 py-8 font-['Cairo']">
      <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-8">

          {/* الهيدر الأخضر */}
          <div className="relative overflow-hidden bg-[#555d30] rounded-2xl p-8 mb-6">
            <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-white/10" />
            <div className="absolute left-16 bottom-[-45px] w-32 h-32 rounded-full bg-white/5" />
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="text-right">
                <div className="inline-flex items-center gap-2 bg-white/10 text-white rounded-full px-4 py-2 text-sm font-bold mb-4">
                  <FiShield />
                  شئون النقل والمواصلات
                </div>
                <h1 className="text-white text-3xl font-extrabold mb-3">
                  إدارة حجوزات الأتوبيس
                </h1>
                <p className="text-white/80 text-sm leading-7 max-w-xl">
                  مراجعة طلبات الحجز الواردة وتحديث حالة التنقل للطلاب حياً
                </p>
              </div>
              <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
                <FiTruck size={36} />
              </div>
            </div>
          </div>

          {/* إحصائيات الوجهات */}
          <div className="flex gap-3 flex-wrap mb-6">
            {Object.entries(stationCounts).map(([station, count]) => (
              <div key={station} className="bg-white border border-gray-200 rounded-2xl px-6 py-4 text-center shadow-sm flex-1 min-w-24">
                <p className="text-gray-500 text-xs mb-1">{station}</p>
                <p className="text-[#555d30] font-black text-2xl">{count}</p>
              </div>
            ))}
            <div className="bg-white border border-gray-200 rounded-2xl px-6 py-4 text-center shadow-sm flex-1 min-w-24">
              <p className="text-gray-500 text-xs mb-1">الغياب</p>
              <p className="text-red-500 font-black text-2xl">{absent}</p>
            </div>
          </div>

          {/* شريط البحث */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="text-right w-full md:w-auto">
              <span className="text-gray-500 font-bold text-sm">إجمالي الطلاب: </span>
              <span className="bg-[#555d30]/10 text-[#555d30] px-2.5 py-0.5 rounded-md font-black text-xs">
                {filteredBookings.length} طالب
              </span>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="بحث بالاسم أو الرقم العسكري..."
              className="w-full md:w-80 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-right bg-white focus:outline-none focus:ring-2 focus:ring-[#555d30]/30"
            />
          </div>

          {/* الجدول */}
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-inner">
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs font-bold border-b border-gray-200">
                    <th className="px-6 py-4">اسم الطالب</th>
                    <th className="px-6 py-4">الرقم العسكري</th>
                    <th className="px-6 py-4">الوجهة</th>
                    <th className="px-6 py-4 text-center">الحالة</th>
                    <th className="px-6 py-4 text-center">الإجراء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-12 text-gray-400 font-bold text-sm">
                        لا توجد طلبات حجز حتى الآن
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((b) => {
                      const statusInfo = getStatusLabel(b.status);
                      return (
                        <tr key={b._id} className="hover:bg-gray-50/70 transition-colors">
                          <td className="px-6 py-4 font-bold text-gray-800">{b.studentName}</td>
                          <td className="px-6 py-4 font-mono text-sm text-gray-600 font-bold">{b.studentId}</td>
                          <td className="px-6 py-4 text-gray-700 font-medium">{b.alightingStation}</td>
                          <td className="px-6 py-4 text-center">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold border ${statusInfo.css}`}>
                              {statusInfo.text}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex gap-2 justify-center">
                              {b.status !== 'confirmed' && (
                                <button
                                  onClick={() => handleUpdateStatus(b._id, 'confirmed')}
                                  className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm transition-all"
                                >
                                  <FiCheck /> تم الحجز
                                </button>
                              )}
                              {b.status !== 'rejected' && (
                                <button
                                  onClick={() => handleUpdateStatus(b._id, 'rejected')}
                                  className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all"
                                >
                                  <FiX /> اعتذار
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}