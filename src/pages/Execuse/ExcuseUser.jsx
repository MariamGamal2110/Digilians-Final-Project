import { useEffect, useState } from "react";
import { openSafeUrl } from "../../api/client";
import ExcuseUserForm from "../../components/ExcuseUserComponents/ExcuseUserForm";
import ExcuseStatusBadge from "../../components/ExcuseAdminComponents/ExcuseStatusBadge";
import { getMyExcuses } from "../../api/excuse";

export default function ExcuseUser() {
  const [my, setMy] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const rows = await getMyExcuses();
        if (!mounted) return;
        setMy(rows);
      } catch (err) {
        console.error(err);
      }
    })();
    return () => (mounted = false);
  }, []);

  function handleSubmitted(created) {
    setMy((s) => [created, ...s]);
  }

  return (
    <section dir="rtl" className="bg-[#fafafa] min-h-screen px-6 py-8">
      <div className="max-w-[1100px] mx-auto grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <ExcuseUserForm onSubmitted={handleSubmitted} />
        </div>
        <div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold mb-4">طلباتك الأخيرة</h3>
            {my.length === 0 && <p className="text-sm text-gray-400">لم تقم بتقديم أي طلبات بعد</p>}
            <ul className="space-y-3">
              {my.map((r) => (
                <li key={r._id} className="border p-3 rounded-lg">
                  <div className="flex justify-between">
                    <strong>{r.title}</strong>
                    <ExcuseStatusBadge status={r.status} />

                    <ExcuseStatusBadge status={r.status} />

                    <span className="text-sm text-gray-500">{r.status}</span>

                  </div>
                  <p className="text-sm text-gray-600 mt-2">{r.message}</p>
                  {r.attachments && r.attachments.length > 0 && (
                    <div className="mt-2 flex gap-2 items-center">
                      {r.attachments.map((a, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => openSafeUrl(a.url, a.originalName || a.filename)}
                          className="text-xs text-[#555d30] underline hover:text-[#444b26]"
                        >
                          {a.originalName || a.filename}
                        </button>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
