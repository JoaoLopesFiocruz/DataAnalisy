type User = {
    

}

export default function Main({}: User,page:string="Overview") {
  return (
    <div className="flex  flex-col w-[280px] h-screen bg-[#191919] items-center py-[48px] px-[28px]" >
      <span className="text-[#FFF] text-[24px] font-poppins text-800 mb-[40px]">
        FINE
        <span className="text-500">bank</span>
        .IO
      </span>
      <div className="px-[16px] text-[#FFFFFFB2] flex flex-col w-[224px] h-[432px] text-500 font-inter text-[16px] list-none">
        <div className="w-full p-0 flex items-center" id="Overview">
          <svg  className="me-[12px]" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="overview symbol">
            <path d="M21 14H14V21H21V14Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 14H3V21H10V14Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21 3H14V10H21V3Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 3H3V10H10V3Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>
            Overview
          </span>
        </div>
      </div>
    </div>
  )
}