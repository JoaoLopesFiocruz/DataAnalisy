import { useState } from "react"
interface MainProps {
  value: string;
  type: string;
  placeholder: string;
  name: string;
  icon: string;
  Set: React.Dispatch<React.SetStateAction<string>>;
}

export default function Main({value,type,placeholder,name,icon,Set}: MainProps) {
  return (
    <div className="my-[8px] flex relative text-[#F4EDE8]">
      <input 
      type={type} 
      placeholder={`${placeholder}`} 
      name={name} 
      id={name} 
      value={value}
      onChange={(e) => {Set(e.target.value); console.log(value)}}
      className="bg-[#23212999] rounded-[20px] text-[#F4EDE8] px-[20px] py-[20px] border-none w-[500px] ps-[50px]  text-[20px] focus:outline-none focus:border-none focus:ring-0"/>
      <i className={icon+" text-[20px] me-[20px] absolute top-[20px] left-[20px]"}></i> 
    </div> 
)
}