import api from "axios";
import TextForm from "../components/Form/fields/Normal"
import Password from "../components/Form/fields/Password"
import Checkbox from "../components/Form/fields/Checkbox"
import SubmitButton from "../components/Form/buttons/GreenButton"
import GoogleButon from "../components/Form/buttons/GoogleButton"
import CreateAcount from "../components/Form/Text/GreenText"
import Alert from "../components/Form/Text/alert";
import {useRef, useState } from "react";
export default function App() {
    const termos= <a href="termos" className="no-underline">
                <div className="text-center text-600 text-[16px] text-[#00e1ff] font-inter hover:text-[#00ffe5] hover:underline hover:cursor-pointer">
                    termos de login
                </div>
            </a>
    const [APIResponse, setAPIResponse] = useState({});
    const [PopUp, setpopup] = useState(false);
    const [Success,setSuccess]=useState(false)
    const executando = useRef(false);
    const proximo = useRef(false);
    async function submit() {
        executando.current = true;
        return new Promise((resolve) => {
            
            const Name= document.getElementById("Name")?.value
            const Email= document.getElementById("Email")?.value
            const password= document.getElementById("password")?.value
            const passwordConfirm=document.getElementById("passwordConfirm")?.value
            const Termos = (document.getElementById("TermsInput") as HTMLInputElement)?.checked;
            if(!Name || !Email || !password || !passwordConfirm){
                setpopup(true)
                setAPIResponse({
                    Message:"Empty inputs",
                    Sucess:false,
                    Status:400
                })
                setTimeout(() => {
                    setpopup(false)
                    executando.current = false;
                    resolve();
                }, 5000); // 5.000 ms = 5s
            }
            else if(password!==passwordConfirm){
                setpopup(true)
                setAPIResponse({
                    Message:"The passwords don't match",
                    Sucess:false,
                    Status:400
                })
                setTimeout(() => {
                    setpopup(false)
                    executando.current = false;
                    resolve();
                }, 5000); // 5.000 ms = 5s
            }
            else if(!Termos){
                setpopup(true)
                setAPIResponse({
                    Message:"You haven't acepted the terms",
                    Sucess:false,
                    Status:400
                })
                setTimeout(() => {
                    setpopup(false)
                    executando.current = false;
                    resolve();
                }, 5000); // 5.000 ms = 5s
            }
            else{
                api.post("http://localhost:3000/users/",{
                    Password:password,
                    Name:Name,
                    Email:Email,
                    PasswordConfirm:passwordConfirm
                }).then((res) => {
                    // sucesso da API
                    setpopup(true);
                    setSuccess(true)
                    setAPIResponse(res.data);

                    setTimeout(() => {
                        setpopup(false);
                        executando.current = false;
                        resolve(); // libera a fila
                    }, 5000);
                })
                .catch((err) => {
                    setpopup(true);
                    setSuccess(false)
                    setAPIResponse({
                        Success: false,
                        Message: "Erro na API"
                    });
                     setTimeout(() => {
                        setpopup(false);
                        executando.current = false;
                        resolve(); // libera a fila
                    }, 5000);
                 })

    }})}
    async function QueueManager(){
        if(!executando.current){
            console.log("primeira chamada")
            await submit()
            if(proximo.current){
                proximo.current = false;
                console.log("segunda cha")
                await submit()
            }
        }
        else{
            proximo.current = true;
        }
    }
    return (
        <div className="flex flex-col items-center flex-1 bg-[#444]">
        <form className="h-screen flex flex-col items-center justify-center" onSubmit={(e) => e.preventDefault()}>
            <div className="w-[400px]">
                <h1 className="font-inter text-800 text-[#00ffe5] text-[40px] text-center">FINE<span className="text-500">bank</span>.IO</h1>
                <p className="text-800 font-poppins text-[20px] text-center w-full text-[#00ffe5]" >Create an account</p>
                <div className="flex flex-col gap-[24px]">
                    <TextForm type="text" name="Name" placeholder="Hermenegildo" textspan="Name"/>
                    <TextForm type="text" name="Email" placeholder="Hermenegildo@gmail.com" textspan="Email"/>
                    <Password textspan="Password" alternativeSpan="Forgot Password?" name="password" tamanho={14} />
                    <Password textspan="Password Confirm" name="passwordConfirm" tamanho={14} />
                    <Checkbox name="TermsInput" textspan="Eu aceito os " link={termos}/>
                    <SubmitButton label="Submit button" name="submitButton" text="Login" action={QueueManager}/>
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
        {PopUp ? <Alert text={APIResponse.Message} sucess={Success} code={400}/> :
        <></>
        }
        </div>
    )
}