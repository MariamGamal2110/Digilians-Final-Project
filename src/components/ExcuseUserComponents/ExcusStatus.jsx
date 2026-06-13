import React, { useEffect, useState, useRef } from 'react';
import { LuTimerReset } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { getMyExcuses } from '../../api/excuse';
import ExcuseStatusBadge from '../../components/ExcuseAdminComponents/ExcuseStatusBadge';

export default function ExcusStatus() {
  const [lastRequest, setLastRequest] = useState(null);
  const [notice, setNotice] = useState(null);
  const prevRequestRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const fetchLatest = async () => {
      try {
        const excuses = await getMyExcuses();

        if (!excuses || excuses.length === 0) {
          if (mounted) setLastRequest(null);
          return;
        }

        excuses.sort(
          (a, b) =>
            new Date(b.createdAt || b.date || b._id) -
            new Date(a.createdAt || a.date || a._id)
        );

        const latest = excuses[0];
        const prev = prevRequestRef.current;

        if (prev && latest && latest._id === prev._id) {
          const latestResponded = latest.respondedAt;

          if (
            prev.status !== latest.status ||
            (latestResponded && latestResponded !== prev.respondedAt) ||
            prev.response !== latest.response
          ) {
            const action =
              latest.status === 'مقبول'
                ? 'مقبول'
                : latest.status === 'مرفوض'
                ? 'مرفوض'
                : 'تم تحديث حالة طلبك';

            const adminNote = latest.response || latest.adminNote || '';
            setNotice({ title: `تم ${action}`, text: adminNote });
          }
        }

        prevRequestRef.current = latest;

        if (mounted) setLastRequest(latest);
      } catch (err) {
        console.error('Failed to load excuses', err);
      }
    };

    fetchLatest();

    const interval = setInterval(() => {
      if (mounted) fetchLatest();
    }, 8000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  if (!lastRequest) {
    return (
      <div className="bg-white p-5 rounded-2xl shadow-sm w-full text-center text-gray-400">
        <h2 className="text-lg font-bold text-gray-700 mb-4">حالة آخر طلب</h2>
        <p className="text-sm">لا يوجد طلبات حالياً</p>
      </div>
    );
  }

  const status = lastRequest.status || 'قيد المراجعة';
  const title = lastRequest.title || lastRequest.type || 'التماس';
  const created = lastRequest.createdAt
    ? new Date(lastRequest.createdAt)
    : lastRequest.date
    ? new Date(lastRequest.date)
    : null;

  const createdLabel = created
    ? created.toLocaleString('ar-EG', { dateStyle: 'long', timeStyle: 'short' })
    : '-';

  const adminNote = lastRequest.response || lastRequest.adminNote || '';

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm w-full">
      {notice && (
        <div className="mb-3 p-3 rounded-lg bg-blue-50 border border-blue-100 text-blue-700">
          <div className="flex justify-between items-start gap-3">
            <div>
              <strong className="block">{notice.title}</strong>
              {notice.text && <div className="text-sm mt-1">{notice.text}</div>}
            </div>
            <button
              onClick={() => setNotice(null)}
              className="text-sm text-blue-600"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

      <h2 className="text-lg font-bold text-gray-700 mb-4">حالة آخر طلب</h2>

      <div className="flex items-center gap-3 mb-4">
        <div className="bg-yellow-100 text-[#555d30] p-2 rounded-lg">
          <LuTimerReset className="text-lg" />
        </div>

        <div>
          <ExcuseStatusBadge status={status} />
          <p className="text-xs text-gray-400 mt-1">
            {title} ({createdLabel})
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3 mb-4">
        <GoDotFill className="text-green-600 mt-1" />
        <div>
          <h3 className="text-sm font-semibold text-gray-700">تم تقديم الطلب</h3>
          <p className="text-xs text-gray-400">{createdLabel}</p>
        </div>
      </div>

      <div className="mt-2">
        <h4 className="text-sm font-bold text-gray-700 mb-2">نص الطلب</h4>
        <p className="text-sm text-gray-600 leading-relaxed">
          {lastRequest.message || lastRequest.details || '-'}
        </p>
      </div>

      {adminNote && (
        <div className="rounded-xl p-3 text-sm leading-relaxed mt-4 bg-blue-50 border border-blue-100 text-blue-700">
          <span className="font-bold block mb-1">رد الإدارة:</span>
          {adminNote}
        </div>
      )}
    </div>
  );
}