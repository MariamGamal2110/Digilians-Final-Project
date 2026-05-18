import ExcuseUserForm from "../../components/ExcuseUserComponents/ExcuseUserForm"
import ExcuseDef from "../../components/ExcuseUserComponents/ExcuseDef"
import AcademyImg from "../../components/ExcuseUserComponents/AcademyImg"
import ExcusStatus from "../../components/ExcuseUserComponents/ExcusStatus"

export default function ExecuseUser() {
  return (
    <>
  <section
    dir="rtl"
    className="bg-[#fafafa] min-h-screen px-6 py-8"
  >
    <div className="max-w-[1300px] mx-auto">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold mb-3 text-[#555d30]">
          الالتماسات
        </h1>

        <p className="text-sm leading-7 max-w-xl text-gray-600">
          يرجى إكمال البيانات بدقة لضمان معالجة الطلب،
          مع العلم أن الالتماسات تقدم بحد أقصى يوم السبت
          للبت فى النظر بها والاستجابة السريعة.
        </p>
      </div>

      {/* Layout */}
         <div className="flex gap-6 items-stretch">
            <div className="w-2/3">
              <ExcuseUserForm />
            </div>

          <div className="w-1/3 space-y-4">
            <ExcusStatus />
            <ExcuseDef />
            <AcademyImg />
          </div>
        </div>

    </div>
  </section>
</>
  )}