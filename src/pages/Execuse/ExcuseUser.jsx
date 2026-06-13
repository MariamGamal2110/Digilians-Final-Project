import { useEffect, useState } from "react";
import ExcuseUserForm from "../../components/ExcuseUserComponents/ExcuseUserForm";
<<<<<<< HEAD
import ExcuseStatusBadge from "../../components/ExcuseAdminComponents/ExcuseStatusBadge";
=======
<<<<<<< HEAD
import ExcuseStatusBadge from "../../components/ExcuseAdminComponents/ExcuseStatusBadge";
=======
>>>>>>> efe2bd38f60756d677162f85e664cd4f8e6c0232
>>>>>>> a8ff67b54946e31c0522043a274e72f4984b32d4
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
<<<<<<< HEAD
                    <ExcuseStatusBadge status={r.status} />
=======
<<<<<<< HEAD
                    <ExcuseStatusBadge status={r.status} />
=======
                    <span className="text-sm text-gray-500">{r.status}</span>
>>>>>>> efe2bd38f60756d677162f85e664cd4f8e6c0232
>>>>>>> a8ff67b54946e31c0522043a274e72f4984b32d4
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{r.message}</p>
                  {r.attachments && r.attachments.length > 0 && (
                    <div className="mt-2 flex gap-2 items-center">
                      {r.attachments.map((a, idx) => (
                        <a key={idx} href={a.url} target="_blank" rel="noreferrer" className="text-xs text-[#555d30] underline">
                          {a.originalName || a.filename}
                        </a>
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
