type AppProps = {
    text: string;
    name:string;
    label:string;
}

export default function NormalForm({label,text,name}: AppProps) {
  return (
    <button aria-label={label} className="flex flex-row items-center justify-center w-full h-[48px] font-inter text-[#fff] text-600 text-[22px] rounded-[10px] border-none bg-[#299D91] hover:cursor-pointer hover:bg-[#2ca89c]" name={name}>
      {text}
    </button>
  )
}
