import { Link, useLocation, useNavigate } from "react-router-dom";
import ListItem from "./listItem";

import OverviewImage from "../../../assets/Overview.svg";
import BalanceImage from "../../../assets/Balances.svg";
import TransactionsImage from "../../../assets/Transactions.svg";
import BillsImage from "../../../assets/Bills.svg";
import ExpensesImage from "../../../assets/Expenses.svg";
import GoalsImage from "../../../assets/Goals.svg";
import SettingsImage from "../../../assets/Setings.svg";
import axios from "axios";
import { useEffect,useState } from "react";

export default function Sidebar() {
  const [Name, setName] = useState("Loadin..."); 
  const location = useLocation();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token"); // ou localStorage.getItem("token")
  const payload = token?.split(".")[1]
  const decoded = JSON.parse(
      atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
  );
  const api = axios.create({
      baseURL: "http://localhost:3000/",
      headers: {
          Authorization: `Bearer ${token}`, // insere o token automaticamente
      },
  });
  useEffect(() => {
    api.get(`http://localhost:3000/users/${decoded.id}`,{            
    }).then((res) => {
      setName(res.data.Data[0].Name)
    }).catch(() => {
    })

  })
  const menu = [
    { path: "/", text: "Overview", icon: OverviewImage },
    { path: "/balances", text: "Balances", icon: BalanceImage },
    { path: "/transactions", text: "Transactions", icon: TransactionsImage },
    { path: "/bills", text: "Bills", icon: BillsImage },
    { path: "/expenses", text: "Expenses", icon: ExpensesImage },
    { path: "/goals", text: "Goals", icon: GoalsImage },
    { path: "/settings", text: "Settings", icon: SettingsImage },
  ];

  function logout() {
    sessionStorage.removeItem("token");
    navigate("/login", { replace: true });
  }

  return (
    <aside className="flex flex-col w-[280px] h-screen bg-[#191919] items-center py-[48px] px-[28px]">
      <span className="text-[#FFF] text-[24px] font-poppins font-extrabold mb-[40px]">
        FINE<span className="font-medium">bank</span>.IO
      </span>

      <ul className="px-[16px] gap-[16px] flex flex-col w-[224px] mb-auto">
        {menu.map((item) => (
          <Link key={item.path} to={item.path} className="no-underline">
            <ListItem
              Image={item.icon}
              text={item.text}
              activate={location.pathname === item.path}
            />
          </Link>
        ))}
      </ul>

      <button
        onClick={logout}
        className="w-[224px] h-[48px] bg-[#FFFFFF14] border-none px-[16px] py-[12px] flex items-center font-inter text-[#FFFFFF] mb-[40px] hover:bg-[#ffffff25] transition"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="me-[12px]"
        >
          <path
            d="M8.33337 14.1667L12.5 10L8.33337 5.83334"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.5 10H2.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.5 2.5H15.8333C16.2754 2.5 16.6993 2.67559 17.0118 2.98816C17.3244 3.30072 17.5 3.72464 17.5 4.16667V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H12.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Logout
      </button>

      <div className="flex w-full items-center text-[#fff] gap-[16px]">
        <img
          src="https://static.vecteezy.com/system/resources/previews/024/983/914/original/simple-user-default-icon-free-png.png"
          className="w-[40px] h-[40px] rounded-full"
          alt="User"
        />
        <div className="flex flex-col gap-[3px]">
          <span>{Name}</span>
          <Link to={`/updateUser/${decoded.id}`} className="no-underline text-[#efefef]">
            Edit Profile
          </Link>
        </div>
      </div>
    </aside>
  );
}
