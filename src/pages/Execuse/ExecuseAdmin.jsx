import { useState } from "react";
import RequestsTable from "../../components/ExcuseAdminComponents/RequestsTable";
import ExcuseSidebar from "../../components/ExcuseAdminComponents/ExcuseSidebar";

const initialData = [
  {
    id: "63247",
    name: "أحمد محمود الشناوي",
    type: "إعادة مراجعة",
    status: "جديد",
    details:
      "مع التحية وبعد.. أتقدم لسيادتكم بطلب التماس بإذن إجازة لحضور حفل زفاف شقيقتي ليلى محمود الشناوي وذلك يوم 5/5/2026 الموافق الثلاثاء.",
  },
  {
    id: "65287",
    name: "صلاح الدين سيد مكرم",
    type: "إعادة مراجعة",
    status: "جديد",
    details:
      "مع التحية وبعد.. أتقدم لسيادتكم بطلب التماس بإذن إجازة لحضور حفل زفاف شقيقتي ليلى محمود الشناوي وذلك يوم 5/5/2026 الموافق الثلاثاء.",
  },
  {
    id: "53207",
    name: "عبدالله محمود سعيد",
    type: "إعادة مراجعة",
    status: "جديد",
    details:
      "مع التحية وبعد.. أتقدم لسيادتكم بطلب التماس بإذن إجازة لحضور حفل زفاف شقيقتي ليلى محمود الشناوي وذلك يوم 5/5/2026 الموافق الثلاثاء.",
  },
  {
    id: "23258",
    name: "محمد علي حسن",
    type: "إعادة مراجعة أولى",
    status: "مقبول",
    details: "أتقدم بطلب تأجيل الاختبار بسبب ظروف صحية طارئة.",
  },
];

export default function ExecuseAdmin() {
  const [data, setData] = useState(initialData);
  const [selectedId, setSelectedId] = useState(null);

  const selectedRequest = data.find((request) => request.id === selectedId) ?? null;

  function handleSelect(row) {
    setSelectedId(row.id);
  }

  function handleDecision(id, decision, note) {
    setData((prev) =>
      prev.map((request) =>
        request.id === id
          ? { ...request, status: decision, adminNote: note }
          : request
      )
    );
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