
export default function acessBloqued() {
    return (
        <div className="flex flex-col flex-1 h-screen w-full bg-[#444] items-center">
            <div className="text-center">
                <h1 className="text-[#64dda1] text-[15rem] p-[0px] mb-[0px]">401</h1>
                <h2 className="text-[#64dda1] text-[5rem]">Acess unaltorized, please, make a <a href="/Login" className="no-underline text-[#00ffc8]">login</a>.</h2>
            </div>
            
        </div>
    )
}