import Nav from "../components/Dashboard/BarraLateral/Main"
import Input from "../components/Input/Main"

export default function App() {
    return (
        <div className="flex bg-[#333]">
            <Nav page={0}/>
            <form action="" className="flex flex-1 flex-col items-center justify-center ">
                <i class="fa-solid fa-circle-user text-[200px] mb-[60px]"></i>
                <Input 
                value="Hermenegildo"
                type="text"
                placeholder="Name"
                name="Name"
                icon="fa-solid fa-user"/>
            </form>
        </div>
    )
}