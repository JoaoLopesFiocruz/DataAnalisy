import ListItem from "./listItem"
import OverviewImage from "../../../assets/Overview.svg"
import BalanceImage from "../../../assets/Balances.svg"
import TrasactionsImage from "../../../assets/Transactions.svg"
import BillsImage from "../../../assets/Bills.svg"
import ExpensesImage from "../../../assets/Expenses.svg"
import GoalsImage from "../../../assets/Goals.svg"
import SetingsImage from "../../../assets/Setings.svg"
type MainProps = {
  //user?: User;
  page: number;
};
export default function Main({page = 0 }: MainProps) {
  return (
    <div className="flex  flex-col w-[280px] h-screen bg-[#191919] items-center py-[48px] px-[28px]" >
      <span className="text-[#FFF] text-[24px] font-poppins text-800 mb-[40px]">
        FINE
        <span className="text-500">bank</span>
        .IO
      </span>
      <div className="px-[16px] gap-[16px] flex flex-col w-[224px] h-[430px] text-500 font-inter text-[16px] list-none mb-[228px]">
        <ListItem Image={OverviewImage} text="Overview" activate={page==1} />
        <ListItem Image={BalanceImage} text="Balances" activate={page==2} />
        <ListItem Image={TrasactionsImage} text="Transactions" activate={page==3} />
        <ListItem Image={BillsImage} text="Bills" activate={page==4} />
        <ListItem Image={ExpensesImage} text="Expenses" activate={page==5} />
        <ListItem Image={GoalsImage} text="Goals" activate={page==6} />
        <ListItem Image={SetingsImage} text="Settings" activate={page==7} />
      </div>
      <button className="w-[224px] h-[48px] bg-[#FFFFFF14] border-none px-[16px] py-[12px] flex items-center font-inter text-[#FFFFFF] mb-[40px]">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-[12px]">
        <path d="M8.33337 14.1667L12.5 10L8.33337 5.83334" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12.5 10H2.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12.5 2.5H15.8333C16.2754 2.5 16.6993 2.67559 17.0118 2.98816C17.3244 3.30072 17.5 3.72464 17.5 4.16667V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H12.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Logout
      </button>
      <div className="flex w-full items-center text-[#fff] gap-[16px]">
        <img 
        src="https://static.vecteezy.com/system/resources/previews/024/983/914/original/simple-user-default-icon-free-png.png"
        className="w-[40px] h-[40px] bg-[#fff] rounded-full items-start"
        alt="" />
        <div className="flex flex-col gap-[3px]">
          <span>Hermenegildo</span>
          <a href="EditarPerfil" className="no-underline text-[#efefef]">Edit Profile</a>
        </div>
      </div>
    </div>
  )
}