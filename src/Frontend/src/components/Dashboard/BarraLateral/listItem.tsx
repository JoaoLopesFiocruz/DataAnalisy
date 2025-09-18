import type { FC, SVGProps } from "react";
type item = {
  Image: string;
  text:string
  activate: boolean;
  link:string|null
};

export default function Main({ Image, activate,text,link=null }: item) {
  if (!activate) {
    return (   
      <a href={link} className="no-underline w-full px-[16px] py-[12px] flex items-center hover:cursor-pointer text-500 text-[#FFFFFFB2]">
        <img src={Image} alt="" className="me-[12px] text-500 text-[#FFFFFFB2] fill-current" />
        <span>{text}</span>
      </a>
    );
  }
  else{
    return (
      <div className="w-full px-[16px] py-[12px] flex items-center bg-[#299D91] rounded-[4px] text-600 text-[#fff]">
        <img src={Image} alt="" className="me-[12px]" />
        <span>{text}</span>
      </div>
    );
  }

}