import UserPunishmentsAnalysis from "../../components/punishment.jsx/UserPunishmentsAnalysis";
import UserPunishmentTable from "../../components/punishment.jsx/UserPunishmentTable";

export default function PunishmentUser(){
      const mockUser = {
    name: 'أحمد محمد',
    militaryId: '12489',
  }

    return(
        <>
            <div dir="rtl" className="p-6">
             {/* العنوان و توضيح دور الصفحه  */}
             <div className="bg-secondary rounded-2xl p-8 mb-6 ">
                <h1 className="text-background text-3xl font-bold mb-2">العقوبات و المخالفات </h1>
                <p className="text-background">عرض جميع المخالفات و العقوبات المطبقه عليك و تفاصيلها </p>
             {/* عرض الرسوم التوضيحيه لمخالفات الطالب */}
             </div>
            <UserPunishmentsAnalysis studentName={mockUser.name}/>
            {/* عرض جدول تفصيلى بالمخالفات  */}
            <UserPunishmentTable/>
    
    </div>
        </>
)}
