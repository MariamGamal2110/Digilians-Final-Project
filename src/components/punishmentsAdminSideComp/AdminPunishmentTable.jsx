import { useState } from "react";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import AdminPunishmentSearch from "./AdminPunishmentSearch";
import AdminAddPunishmentModal from "./AdminAddPunishmentModal";
import AdminViewPunishmentModal from "./AdminViewPunishmentModal";
import AdminDeletePunishmentModal from "./AdminDeletePunishmentModal";

export default function AdminPunishmentTable({
  data,
  searchText,
  onSearchChange,
  onAdd,
  onEdit,
  onDelete,
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null);   // { index, record }
  const [viewTarget, setViewTarget] = useState(null);   // record
  const [deleteTarget, setDeleteTarget] = useState(null); // { index, record }

  function handleSaveAdd(record) {
    onAdd(record);
    setShowAddModal(false);
  }

  function handleSaveEdit(record) {
    onEdit(editTarget.index, record);
    setEditTarget(null);
  }

  function handleConfirmDelete() {
    onDelete(deleteTarget.index);
    setDeleteTarget(null);
  }

  return (
    <>
      {/* Search + Add Button */}
      <AdminPunishmentSearch
        searchText={searchText}
        onSearchChange={onSearchChange}
        onAddClick={() => setShowAddModal(true)}
      />

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-2xl">
        <table className="w-full text-sm text-right">
          <thead>
            <tr className="bg-[#f3f1e8] text-[#1f220f]">
              <th className="px-5 py-3 font-bold w-[50px]">#</th>
              <th className="px-5 py-3 font-bold">اسم الطالب</th>
              <th className="px-5 py-3 font-bold">الرقم العسكري</th>
              <th className="px-5 py-3 font-bold">المخالفة</th>
              <th className="px-5 py-3 font-bold">العقوبة</th>
              <th className="px-5 py-3 font-bold text-center">الدرجات</th>
              <th className="px-5 py-3 font-bold text-center">إجراءات</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-10 text-gray-400">
                  لا توجد نتائج مطابقة للبحث
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-100 last:border-b-0 hover:bg-[#faf9f4] transition"
                >
                  <td className="px-5 py-4 text-[#555d30] font-bold">{i + 1}</td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${
                          row.gender === "female" ? "bg-[#D4537E]" : "bg-[#378ADD]"
                        }`}
                      />
                      <span className="text-[#1f220f] font-bold">{row.studentName}</span>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-[#1f220f] font-bold">{row.militaryNum}</td>
                  <td className="px-5 py-4 text-[#1f220f]">{row.violation}</td>
                  <td className="px-5 py-4 text-[#1f220f]">{row.punishment}</td>

                  <td className="px-5 py-4">
                    <div className="flex justify-center">
                      <span className="w-9 h-9 rounded-full bg-[#555d30] text-white flex items-center justify-center font-bold">
                        {row.degree}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {/* View */}
                      <button
                        onClick={() => setViewTarget(row)}
                        className="w-9 h-9 rounded-full flex items-center justify-center text-[#6b5b3e] hover:bg-[#f3efe4] hover:scale-105 transition"
                        title="عرض"
                      >
                        <FiEye size={18} />
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => setEditTarget({ index: i, record: row })}
                        className="w-9 h-9 rounded-full flex items-center justify-center text-[#6b5b3e] hover:bg-[#f3efe4] hover:scale-105 transition"
                        title="تعديل"
                      >
                        <FiEdit2 size={17} />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => setDeleteTarget({ index: i, record: row })}
                        className="w-9 h-9 rounded-full flex items-center justify-center text-[#6b5b3e] hover:bg-red-50 hover:text-red-600 hover:scale-105 transition"
                        title="حذف"
                      >
                        <FiTrash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ADD Modal — key="add" forces a fresh mount every time */}
      {showAddModal && (
        <AdminAddPunishmentModal
          key="add"
          onClose={() => setShowAddModal(false)}
          onSave={handleSaveAdd}
          initialData={null}
        />
      )}

      {/* EDIT Modal — key includes index so switching rows remounts cleanly */}
      {editTarget && (
        <AdminAddPunishmentModal
          key={`edit-${editTarget.index}`}
          onClose={() => setEditTarget(null)}
          onSave={handleSaveEdit}
          initialData={editTarget.record}
        />
      )}

      {/* VIEW Modal */}
      {viewTarget && (
        <AdminViewPunishmentModal
          record={viewTarget}
          onClose={() => setViewTarget(null)}
        />
      )}

      {/* DELETE Modal */}
      {deleteTarget && (
        <AdminDeletePunishmentModal
          record={deleteTarget.record}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
}

