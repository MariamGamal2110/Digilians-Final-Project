import { useState } from "react";
import { FiShield, FiAlertTriangle } from "react-icons/fi";
import AdminPunishmentStats from "../../components/punishmentsAdminSideComp/Adminpunishmentstats";
import AdminPunishmentSearch from "../../components/punishmentsAdminSideComp/AdminPunishmentSearch";
import AdminPunishmentTable from "../../components/punishmentsAdminSideComp/AdminPunishmentTable";

const initialData = [
  { studentName: "محمد حسن على", militaryNum: "22589", gender: "male", violation: "خصم درجات", punishment: "إنذار كتابي", degree: 2 },
  { studentName: "جهاد احمد الشبراوى", militaryNum: "22505", gender: "female", violation: "الاستيقاظ بعد نوبة نوم", punishment: " حرمان من الإجازة يوم الأربعاء فقط", degree: 5 },
  { studentName: "احمد سمير ابراهيم", militaryNum: "22789", gender: "male", violation: "خصم درجات", punishment: "إنذار كتابي", degree: 2 },
  { studentName: "محمد حسن على", militaryNum: "22880", gender: "male", violation: "عدم الالتزام بهيئة الزى", punishment: "تأخير ساعتين عن نزول الإجازات", degree: 5 },
  { studentName: "غاليه محمود حسن", militaryNum: "28089", gender: "female", violation: "عدم الالتزام بهيئة الزى", punishment: "تأخير ساعتين عن نزول الإجازات", degree: 5 },
  { studentName: "محمد عزالدين اكرم", militaryNum: "22517", gender: "male", violation: "تأخير أثناء عودة الإجازات", punishment: "تأخير ساعتين عن نزول الإجازات", degree: 5 },
  { studentName: "محمد اسلام محسن", militaryNum: "22590", gender: "male", violation: "عدم الالتزام بهيئة الزى", punishment: "تأخير ساعتين عن نزول الإجازات", degree: 5 },
  { studentName: " كريم  محسن ابوالعينين", militaryNum: "25809", gender: "male", violation: "عدم الالتزام بهيئة الزى", punishment: "جرمان من الاجازه", degree: 5 },
  { studentName: "عمر ابراهيم فرغلى", militaryNum: "25800", gender: "male", violation: "عدم الالتزام بهيئة الزى", punishment: "تأخير ساعتين عن نزول الإجازات", degree: 5 },
  { studentName: "أسماء حسين احمد", militaryNum: "22599", gender: "female", violation: "عدم الالتزام بهيئة الزى", punishment: "تأخير ساعتين عن نزول الإجازات", degree: 5 },
];
export default function PunishmentAdmin() {
  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState("");
  const filteredData = data.filter(
    (r) =>
      r.studentName.includes(searchText) ||
      r.militaryNum.includes(searchText)
  );

  const shownCount = searchText ? filteredData.length : data.length;
  const displayData = searchText ? filteredData : data;

  function handleAdd(record) {
    setData((prev) => [...prev, record]);
  }

  function handleEdit(index, record) {
    setData((prev) => prev.map((r, i) => (i === index ? record : r)));
  }

  function handleDelete(index) {
    setData((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <section dir="rtl" className="bg-[#fafafa] min-h-screen px-6 py-8">
      <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-8">

          {/* Header */}
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

          {/* Stats */}
          <AdminPunishmentStats
            total={data.length}
            females={data.filter((r) => r.gender === "female").length}
            males={data.filter((r) => r.gender === "male").length}
            shown={shownCount}
          />
          {/* <AdminPunishmentSearch 
          searchText={searchText}
          onSearchChange={setSearchText}
          onAdd={handleAdd} /> */}

          {/* Table */}
          <AdminPunishmentTable
            data={displayData}
            searchText={searchText}
            onSearchChange={setSearchText}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

        </div>
      </div>
    </section>
  );
}