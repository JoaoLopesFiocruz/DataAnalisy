type AppProps = {
    textspan: string;
    name:string;
    link:string|null;
  }

export default function NormalForm({textspan,name,link=null }: AppProps) {
  return (
    <div className="text-start flex flex-row w-full items-center gap-[16px]">
      <div className="w-max relative">
        <input id={name} type="checkbox" className="w-[20px] h-[20px] rounded-[10px] checked:accent-[#299D91]"/>
        <div className="w-[20px] h-[20px] absolute hover:cursor-pointer hover:bg-[#ffffff1d] bottom-[5px] " onClick={() => {document.getElementById(name).checked = !document.getElementById(name).checked;}}></div>
      </div>
        <label  htmlFor={name} className="font-inter text-500 text-[16px]">
          <div className="flex flex-row gap-[4px] text-[#00ffe5]">
            {textspan}{link}
          </div>
        </label>
    </div>
  )
}