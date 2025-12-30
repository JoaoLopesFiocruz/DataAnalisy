import { useState } from "react"
interface MainProps{
  submit?: () => void,
  data?:{
    email:string,
    Name:string,
  }
}
export default function Main({submit,data}: MainProps) {
  return (
    <form className="w-[900px] h-[500px] bg-[#0c0026df] flex flex-col items-center justify-center rounded-[200px] text-[#fff] text-[4rem]">
      Password Required
      <div className="w-max flex flex-col mb-[30px] mt-[90px]">
        <label htmlFor="password" className="text-[3rem] absolute text-[#00000000] z-[-1]">Password Input</label>
        <input className="w-[500px] h-[50px] rounded-[200px] text-[2rem] px-[20px] bg-[#ffffff9d] text-[#222] placeholder-[#222]" type="password" required name="Pasword" id="password" placeholder="Pasword"></input>
      </div>
        <button className="w-[400px] h-[50px] rounded-[200px] bg-[#0000002b] text-[#fff] text-[2rem] mt-[50px]">Submit</button>
    </form>
  )
}