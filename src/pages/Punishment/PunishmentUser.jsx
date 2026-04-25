import UserPunishmentsAnalysis from "../../components/punishment.jsx/UserPunishmentsAnalysis";
import UserPunishmentTable from "../../components/punishment.jsx/UserPunishmentTable";

export default function PunishmentUser(){

    return(
        <>
        <h1>العقوبات و المخالفات </h1>
        <p>عرض جميع المخالفات و العقوبات المطبقه عليك و تفاصيلها </p>
        <UserPunishmentsAnalysis/>
        <UserPunishmentTable/>
    
    </>
)
}