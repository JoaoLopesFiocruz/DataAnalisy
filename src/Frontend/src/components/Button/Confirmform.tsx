interface MainProps{
    data:
    {
        email:string,
        Name:string,
        password:string,
        passwordConfirm:string
    },
    Route:string,
}
export default function Main({data,Submit}: MainProps) {
    return (
        <button className="bg-[#FFA000] text-[50px] justify-center flex mt-[30px] rounded-[20px] text-[#F4EDE8] py-[5px] border-none w-[500px] text-[20px] hover:cursor-pointer hover:bg-[#ee9700]" onClick={Submit}>
            SUBMIT
        </button> 
    )
}