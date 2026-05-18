
import React from 'react'

export default function StatsGrid() {
    const StatsGrid =({totalAmount, paidAmount,remainingAmount})=> {
    return(
        <>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <SummaryCard 
        icon="pending_actions" 
        label="الإجمالي المستحق" 
        amount={totalAmount} 
        color="text-[#865044]" 
      />
      <SummaryCard 
        icon="verified" 
        label="إجمالي المسدد" 
        amount={paidAmount} 
        color="text-green-800" 
      />
      <SummaryCard 
        icon="account_balance" 
        label="الرصيد المتبقي" 
        amount={remainingAmount} 
        color="text-[#451518]" 
        isPrimary 
      />
        </section>
        </>
    )

}
 
}
