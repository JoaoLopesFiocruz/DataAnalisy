import GoggleIcon from "../../../../public/Icons/Google.png"
type AppProps = {
    name:string;
    label:string;
}

export default function NormalForm({label,name}: AppProps) {
  return (
    <button aria-label={label} className="flex flex-row items-center justify-center w-full h-[48px] font-inter text-[#4B5768] text-400 text-[22px] rounded-[10px] border-none bg-[#E4E7EB] hover:bg-[#dddfe2] hover:cursor-pointer" name={name}>
        <img src={GoggleIcon} className="pe-[10px]" /> Continue with google
    </button>
  )
}
