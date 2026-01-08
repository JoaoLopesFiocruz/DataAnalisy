type AppProps = {
    type: string;
    textspan: string;
    placeholder:string;
    name:string;
}

export default function NormalForm({ type, textspan,placeholder,name }: AppProps) {
  return (
    <div className="text-start flex flex-col w-full">
        <label  htmlFor={name} className="font-inter text-500 text-[16px]">
            {textspan}
        </label>
        <input id={name} type={type} placeholder={placeholder} className="h-[48px] py-[12px] px-[16px] border border-[#4B5768] rounded-[8px] font-inter font-400 text-[16px]"/>
    </div>
  )
}
