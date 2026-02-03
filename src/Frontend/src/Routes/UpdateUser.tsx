import Nav from "../components/Dashboard/BarraLateral/Main"
import Input from "../components/Input/Main"
import Modal from "../components/Modal/Main"
import { useParams } from 'react-router-dom';
import Alert from "../components/Form/Text/alert";
import AcessBloqued from "../components/ControlAcess/acessBloqued"
import Loading from "../components/ControlAcess/Loading"
import axios from "axios";
import { auth } from "../Midleware/Authorization";
import { useEffect,useState } from "react";
// Cria uma instância do Axios


export default function App() {
    const token = sessionStorage.getItem("token"); // ou localStorage.getItem("token")
    const payload = token?.split(".")[1]
    const decoded = JSON.parse(
        atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
    );
    const api = axios.create({
        baseURL: "http://localhost:3000/",
        headers: {
            Authorization: `Bearer ${token}`, // insere o token automaticamente
        },
    });
    const { id } = useParams();
    const [authorized, setAuthorized] = useState(true); 
    const [loading, setLoading] = useState(true);
    const [UserName, setUserName] = useState("");
    const [UserEmail, setUserEmail] = useState("");
    const [photo, setPhoto] = useState(false);
    const [foto, setFoto] = useState(null);
    const [ShowModal, setShowModal] = useState(false);
    const [Password, setPassword] = useState("");
    const [ShowPopUp, setShowPopUp] = useState(false);
    const [PopUp, setPopUp] = useState({});
    const [SubmitRuning, setSubmitRuning] = useState(false);
    const [SubmitWaiting, setSubmitWaiting] = useState(false);

    useEffect(() => {
        async function checkAuth() {
            const isAuthorized = await auth();
            setAuthorized(isAuthorized);
            setLoading(false);   
        }

        checkAuth();
        
        api.get(`http://localhost:3000/users/${id}`,{            
        }).then((res) => {
            setUserName(res.data.Data[0].Name)
            setUserEmail(res.data.Data[0].Email)
            console.log(UserEmail,UserName)
        }).catch(() => {
            setAuthorized(false);
            setLoading(false);
        })
    
    }, []);
    
    async function PutUser(json:{Password:string,Name:string,Email:string}){
        return new Promise<void>((resolve)=>{
            api.put(`/users/${id}`,json)
            .then((response) => {
                setPopUp(
                    {
                        text:response.data.Message,
                        sucess:response.data.Sucess,
                        code:response.data.Status
                    }
                )
            })
            .catch((err) => {
                setPopUp(
                    {
                        text:err.response.data.Message,
                        sucess:err.response.data.Sucess,
                        code:err.response.data.Status
                    }
                )
            }).finally(()=>{
                setPassword("")
                setShowPopUp(true)
                setShowModal(false)
                setTimeout(() => {
                    setShowPopUp(false)
                    setPopUp({})
                    resolve()
                }, 5000);                
            })
        })
    }
    async function queueManager() {
        if(SubmitRuning){
            setSubmitWaiting(true)
        }else{
            await PutUser({Password:Password,Name:UserName,Email:UserEmail})
            if(SubmitRuning){
                await PutUser({Password:Password,Name:UserName,Email:UserEmail})
            }
        }
    }
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault(); // ⛔ impede o reload / envio padrão
    }
    const enviarFoto = (arquivo:any) => {
        if (!arquivo || !arquivo.type.startsWith("image/")) {
            alert("Por favor, selecione uma imagem válida.");
            return;
        }
        
        const reader = new FileReader();
        reader.onloadend = () => {
        const base64 = reader.result;
        setFoto(base64)
        };
        reader.readAsDataURL(arquivo); // <- Converte para base64
    };
    const handleChange = async (e) => {
        const arquivo = e.target.files[0];
        setFoto(arquivo);
        await enviarFoto(arquivo); // envia assim que seleciona
        setPhoto(false)
        console.log(foto)
    };
    if (loading) {
        return <Loading />
    }
    return (
        <div className="flex bg-[#333] w-full">
            {authorized? <><Nav page={0}/><form action="" className="relative flex flex-1 flex-col items-center justify-center" onSubmit={handleSubmit}>
                <div className="flex relative">
                    {
                    foto?<img src={foto} alt="" className="mb-[60px] me-[30px] w-[200px] h-[200px] rounded-full object-cover" />
                    : <i class="fa-solid fa-circle-user text-[200px] mb-[60px]"></i> }
                    <i className="absolute fa-solid fa-pencil bottom-[60px] right-[20px] bg-[#FFA000] p-[10px] text-[20px] rounded-full hover:cursor-pointer hover:bg-[#ee9700]" onClick={()=>{setPhoto(!photo)}}></i>
                </div>
                <Input
                value={UserName}
                type="text"
                placeholder="Name"
                name="Name"
                Set={setUserName}
                icon="fa-solid fa-user"/>
                
                <Input
                value={UserEmail}
                Set={setUserEmail}
                type="text"
                placeholder="email"
                name="email"
                icon="fa-solid fa-envelope"/>
                <button className="bg-[#FFA000] text-[50px] justify-center flex mt-[30px] rounded-[20px] text-[#F4EDE8] py-[5px] border-none w-[500px] text-[20px] hover:cursor-pointer hover:bg-[#ee9700]" onClick={(event)=>{
                    setShowModal(true)
                }}>
                    SUBMIT
                </button>            
                {photo ? 
                    <div className="flex items-center absolute justify-center  backdrop-blur-xl bg-[#fff]/30 w-[100%] h-[100%] right-0 cursor-pointer ">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center cursor-pointer">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p className="text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" accept="image/*" onChange={handleChange} textspan="Profile image"/>
                        </label>
                    </div> 
                : ""}
                {
                ShowModal?<div className="absolute w-[100%] h-[100%] flex flex-col items-center justify-center  bg-[#0000001a] backdrop-blur-[40px]">
                    <button className="absolute top-5 right-5 text-5xl text-white hover:cursor-pointer" onClick={() => setShowModal(false)}>X</button>
                    <Modal Set={setPassword} data={{Password:Password,Name:UserName,Email:UserEmail}} Submit={queueManager}/>
                </div>
                : <div className="absolute"></div>
                }
            </form> 
            {ShowPopUp && 
                <div className="absolute top-5 text-center w-full">
                    <div className="relative flex justify-center w-full">
                        <Alert text={PopUp.text} sucess={PopUp.sucess} code={PopUp.code} />
                    </div>
                </div>
            }
            </>: 
            <AcessBloqued />
            }
            
        </div>
    )
}