import api from "axios";
import TextForm from "../components/Form/fields/Normal"
import Password from "../components/Form/fields/Password"
import Checkbox from "../components/Form/fields/Checkbox"
import SubmitButton from "../components/Form/buttons/GreenButton"
import GoogleButon from "../components/Form/buttons/GoogleButton"
import CreateAcount from "../components/Form/Text/GreenText"
export default function App() {
    const termos= <a href="termos" className="no-underline">
                <div className="text-center text-600 text-[16px] text-[#00e1ff] font-inter hover:text-[#00ffe5] hover:underline hover:cursor-pointer">
                    termos de login
                </div>
            </a>
    const [APIResponse, setAPIResponse] = useState({});
    function submit(Name:string,Email:string,password:string,passwordConfirm:string,Termos:boolean) {
        if(Termos){
            api.post("http://localhost:3000/users/",{
                Password:password,
                Name:Name,
                Email:Email,
                PasswordConfirm:passwordConfirm
            }).finally((res)=>{
                setAPIResponse(res.data)
            })
        }
        else{
            setAPIResponse({
                message:"Você não aceitou os termos",
                success:false,
                status:400
            })
        }
    }
    return (
        <form className="h-screen flex flex-col items-center justify-center bg-[#444]" onSubmit={(e) => e.preventDefault()}>
            <div className="w-[400px]">
                <h1 className="font-inter text-800 text-[#00ffe5] text-[40px] text-center">FINE<span className="text-500">bank</span>.IO</h1>
                <p className="text-800 font-poppins text-[20px] text-center w-full text-[#00ffe5]" >Create an account</p>
                <div className="flex flex-col gap-[24px]">
                    <TextForm type="text" name="Name" placeholder="Hermenegildo" textspan="Name"/>
                    <TextForm type="text" name="Email" placeholder="Hermenegildo@gmail.com" textspan="Email"/>
                    <Password textspan="Password" alternativeSpan="Forgot Password?" name="password" tamanho={14} />
                    <Password textspan="Password Confirm" name="passwordConfirm" tamanho={14} />
                    <Checkbox name="Maek input" textspan="Eu aceito os " link={termos}/>
                    <SubmitButton label="Submit button" name="submitButton" text="Login"/>
                    <div className="flex flex-row items-center justify-center w-full">
                        <hr className="border-none h-[1px] w-[342px] bg-[#4B5768]" />
                        <p className="text-center absolute bg-[#444] text-[#FFF] w-[112px] text-">
                        or sign in with
                        </p>
                    </div>
                    <GoogleButon label="Google Login Button" name="GoogleLoginButton"/>
                    <CreateAcount text="Login" link="/login"/>
                </div>
            </div>
        </form>
    )
}