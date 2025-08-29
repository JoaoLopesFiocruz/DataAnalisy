type AppProps = {
    text:string;
    link:string;
}

export default function NormalForm({text,link}: AppProps) {
  return (
    <a href={link} className="no-underline">
        <div className="text-center text-600 text-[16px] text-[#299D91] font-inter w-full hover:text-[#23857b] hover:underline hover:cursor-pointer">
            {text}
        </div>
    </a>
  )
}