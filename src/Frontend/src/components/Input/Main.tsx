import { useState } from "react"
interface MainProps{
  value:string|number,
  type:string,
  placeholder:string,
  name:string,
  icon:string
}
export default function Main({value,type,placeholder,name,icon}: MainProps) {
    const [texto, setValue] = useState(value);
  return (
    <div className="flex relative text-[#F4EDE8]">
      <input 
      type={type} 
      placeholder={`${placeholder}`} 
      name={name} 
      id={name} 
      value={texto}
      onChange={(e) => setValue(e.target.value)} // <- Aqui atualiza o estado
      className="bg-[#23212999] rounded-[20px] text-[#F4EDE8] px-[20px] py-[20px] border-none w-[500px] ps-[50px]  text-[20px] focus:outline-none focus:border-none focus:ring-0"/>
      <i className={icon+" text-[20px] me-[20px] absolute top-[20px] left-[20px]"}></i> 
    </div> 
)
}