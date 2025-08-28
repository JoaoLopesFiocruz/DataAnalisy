type AppProps = {
    textspan: string;
    name:string;
}

export default function NormalForm({textspan,name }: AppProps) {
  return (
    <div className="text-start flex flex-row w-full items-center gap-[16px]">
        <input id={name} type="checkbox" className="w-[20px] h-[20px] checked:accent-[#299D91]"/>
        <label  htmlFor={name} className="font-inter text-500 text-[16px] ">
            {textspan}
        </label>        
    </div>
  )
}