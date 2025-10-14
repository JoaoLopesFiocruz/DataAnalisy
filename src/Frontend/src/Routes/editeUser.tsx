import Nav from "../components/Dashboard/BarraLateral/Main"
import Input from "../components/Input/Main"
import Button from "../components/Button/Confirmform"
import { useState } from "react";
import { useEffect } from 'react';

export default function App() {
    const [photo, setPhoto] = useState(false);
    const [foto, setFoto] = useState(null);
    const enviarFoto = (arquivo) => {
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
    return (
        
        <div className="flex bg-[#333] w-full">
            <Nav page={0}/>
            <form action="" className="relative flex flex-1 flex-col items-center justify-center">
                <div className="flex relative">
                    {
                    foto?<img src={foto} alt="" className="mb-[60px] me-[30px] w-[200px] h-[200px] rounded-full object-cover" />
                    : <i class="fa-solid fa-circle-user text-[200px] mb-[60px]"></i> }
                    <i className="absolute fa-solid fa-pencil bottom-[60px] right-[20px] bg-[#FFA000] p-[10px] text-[20px] rounded-full hover:cursor-pointer hover:bg-[#ee9700]" onClick={()=>{setPhoto(!photo)}}></i>
                </div>
                <Input
                value="Hermenegildo"
                type="text"
                placeholder="Name"
                name="Name"
                icon="fa-solid fa-user"/>
                <Input
                value="Hermenegildo@gmail.com"
                type="text"
                placeholder="email"
                name="email"
                icon="fa-solid fa-envelope"/>
                <Input 
                value=""
                type="password"
                placeholder="Password"
                name="password"
                icon="fa-solid fa-lock"/>
                <Input
                value=""
                type="password"
                placeholder="password confirm"
                name="password confirm"
                icon="fa-solid fa-lock"/>
                <Button />
                {photo ? 
                    <div class="flex items-center absolute justify-center  backdrop-blur-xl bg-[#fff]/30 w-[100%] h-[100%] right-0 cursor-pointer ">
                        <label for="dropzone-file" class="flex flex-col items-center justify-center cursor-pointer">
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p class="text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input id="dropzone-file" type="file" class="hidden" accept="image/*" onChange={handleChange}/>
                        </label>
                    </div> 
                : ""}
            </form>
        </div>
    )
}

