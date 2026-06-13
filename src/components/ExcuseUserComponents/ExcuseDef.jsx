import React from "react";
import { FiShield } from "react-icons/fi";

export default function ExcuseDef() {
  return (
    <div
      dir="rtl"
      className="overflow-hidden rounded-[24px] border border-[#e9e2d2] bg-white shadow-[0_18px_48px_rgba(31,34,15,0.06)]"
    >
      <div className="bg-[#555d30] px-6 py-5 text-white">
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white">
          <FiShield />
        </div>
        <div>
          <p className="text-xs font-bold text-white/75">إرشادات مهمة</p>
          <h2 className="text-lg font-extrabold text-white">
            قواعد الالتماسات
          </h2>
        </div>
      </div>

      <ol className="space-y-3 p-6 text-sm leading-7 text-[#4f543b]">
        <li className="rounded-2xl bg-[#fcfbf7] p-4">
          يتم تقديم الالتماسات بحد أقصى <strong>يوم السبت</strong> حتى تتمكن
          الأكاديمية من النظر فى الأمر المطلوب.
        </li>
        <li className="rounded-2xl bg-[#fcfbf7] p-4">
          يتحمل الطالب مسؤولية صحة البيانات والمستندات المرفقة بالكامل، وفى
          حالة أى مستندات غير صحيحة يتعرض الطالب للمخالفة والعقوبة.
        </li>
      </ol>
    </div>
  );
}
