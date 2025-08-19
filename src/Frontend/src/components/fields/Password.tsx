type AppProps = {
    textspan: string;
    alternativeSpan:string;
    name:string;
    tamanho:number;
}
import { useState } from "react";

export default function PasswordField({ alternativeSpan, textspan,name,tamanho }: AppProps) {
  let placeholder=""
  for(let i=0;i<tamanho;i++){
    placeholder+="●"
  }
  const [visible, setVisible] = useState(false);
  return (
    <div className="text-start flex flex-col w-full">
        <label  htmlFor={name} className="font-inter text-500 text-[16px] flex justify-between">
            <span>
                {textspan}
            </span>
            <span className="text-[12px] text-[#299D91] text-500 hover:cursor-pointer hover:underline focus:underline">
                {alternativeSpan}
            </span>
        </label>
        <div className="relative w-full">
              <input
    id={name}
    type={visible? "text":"password"}
    placeholder={placeholder}
    className="w-full h-[48px] py-[12px] pr-[44px] pl-[16px] border border-[#4B5768] rounded-[8px] font-inter font-normal text-[16px]"
  />
    <svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  className="absolute right-[12px] top-1/2 -translate-y-1/2 cursor-pointer flex items-center"
    onClick={() => setVisible(!visible)}
>
  { !visible ? (
    <>
      <path
        d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ) : (
    <>
      <path
    d="M9.88013 9.87988C9.58538 10.1545 9.34897 10.4857 9.185 10.8537C9.02104 11.2217 8.93287 11.619 8.92576 12.0218C8.91865 12.4246 8.99275 12.8247 9.14364 13.1983C9.29452 13.5718 9.5191 13.9112 9.80397 14.196C10.0888 14.4809 10.4282 14.7055 10.8017 14.8564C11.1753 15.0073 11.5754 15.0814 11.9782 15.0742C12.381 15.0671 12.7783 14.979 13.1463 14.815C13.5143 14.651 13.8455 14.4146 14.1201 14.1199"
    stroke="#000000"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M10.73 5.08C11.1513 5.02751 11.5754 5.00079 12 5C19 5 22 12 22 12C21.5529 12.9571 20.9922 13.8569 20.33 14.68"
    stroke="#000000"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M6.61 6.61035C4.62125 7.96498 3.02987 9.82561 2 12.0004C2 12.0004 5 19.0004 12 19.0004C13.9159 19.0055 15.7908 18.4455 17.39 17.3904"
    stroke="#000000"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
<path d="M5 4L21 21" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>


    </>
  )}
</svg>

        </div>
    </div>
  )
}