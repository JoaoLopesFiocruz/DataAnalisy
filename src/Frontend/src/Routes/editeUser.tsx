import Nav from "../components/Dashboard/BarraLateral/Main"
export default function App() {
    return (
        <div className="flex bg-[#333]">
            <Nav page={0}/>
            <div className="justify-center items-center flex flex-1">
                <div className="p-[16px] w-[800px] h-[900px] border-[5px] border-[#555] rounded-[85px]">
                    <div className=" justify-center flex relative items-center text-[#fff] gap-[30px] text-[50px]">
                        <img 
                        src="https://static.vecteezy.com/system/resources/previews/024/983/914/original/simple-user-default-icon-free-png.png"
                        className="w-[200px] h-[200px] bg-[#fff] rounded-full"
                        alt="" />
                        <div className="w-[40px] h-[40px] absolute top-[160px] left-[270px] bg-[#8AB6E7] rounded-full flex items-center justify-center text-[25px] hover:cursor-pointer">
                            <i class="fa-solid fa-pen text-[#000]"></i>
                        </div>
                        Hermenegildo 
                    </div>
                </div>
            </div>

        </div>
    )
}