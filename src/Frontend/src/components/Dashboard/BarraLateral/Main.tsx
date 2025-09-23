import ListItem from "./listItem"
import OverviewImage from "../../../assets/Overview.svg"
import BalanceImage from "../../../assets/Balances.svg"
import TrasactionsImage from "../../../assets/Transactions.svg"
import BillsImage from "../../../assets/Bills.svg"
import ExpensesImage from "../../../assets/Expenses.svg"
import GoalsImage from "../../../assets/Goals.svg"
import SetingsImage from "../../../assets/Setings.svg"
type User = {
    
}
export default function Main({}: User,page:string="Overview") {
  return (
    <div className="flex  flex-col w-[280px] h-screen bg-[#191919] items-center py-[48px] px-[28px]" >
      <span className="text-[#FFF] text-[24px] font-poppins text-800 mb-[40px]">
        FINE
        <span className="text-500">bank</span>
        .IO
      </span>
      <div className="px-[16px] gap-[16px] flex flex-col w-[224px] h-[432px] text-500 font-inter text-[16px] list-none">
        <ListItem Image={OverviewImage} text="Overview" activate={true} />
        <ListItem Image={BalanceImage} text="Balances" activate={false} />
        <ListItem Image={TrasactionsImage} text="Transactions" activate={false} />
        <ListItem Image={BillsImage} text="Bills" activate={false} />
        <ListItem Image={ExpensesImage} text="Expenses" activate={false} />
        <ListItem Image={GoalsImage} text="Goals" activate={false} />
        <ListItem Image={SetingsImage} text="Settings" activate={false} />
        
      </div>
    </div>
  )
}