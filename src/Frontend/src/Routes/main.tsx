
import AcessBloqued from "./acessBloqued"
import Nav from "../components/Dashboard/BarraLateral/Main"
import { useState } from "react";
import axios from "axios";
import acessBloqued from "./acessBloqued";
const token = sessionStorage.getItem("token"); // ou localStorage.getItem("token")

// Cria uma instância do Axios
const api = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    Authorization: `Bearer ${token}`, // insere o token automaticamente
  },
});
export default function App() {
    const [load, setLoad] = useState(token != null && token != undefined);
    console.log(load,token!==null)
    return (
      <>
        {load?<><Nav page={1}/></>:<AcessBloqued/>}
      </>
    )
}