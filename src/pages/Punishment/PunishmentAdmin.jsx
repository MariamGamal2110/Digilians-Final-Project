import AdminPunishmentTable from "../../components/punishmentsAdminSideComp/AdminPunishmentTable";
// C:\Users\Admin\Desktop\Final Project\Digilians-Final-Project\src\components\punishmentsAdminSideComp\AdminPunishmentTable.jsx
export default function PunishmentAdmin(){


    return(
        <>
        <div dir="rtl" className="p-6">

        {/* العنوان و توضيح دور الصفحه  */}
        <div className="bg-secondary rounded-2xl p-8 mb-6 ">
        <h1 className="text-background text-3xl font-bold mb-2"> المخالفات و العقوبات</h1>
        <p className="text-background">عرض و إدارة المخالفات و العقوبات المسجله على الطلاب </p>
        </div>
        <AdminPunishmentTable/>
        </div>
        </>
    )
}