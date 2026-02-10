import AcessBloqued from "../components/ControlAcess/acessBloqued";
import Loading from "../components/ControlAcess/Loading";
import Nav from "../components/Dashboard/BarraLateral/Main";
import { useEffect, useState } from "react";
import {auth} from "../Midleware/Authorization"
import Assunt from "../components/Chart/Main/Assunt"

export default function App() {
  const [authorized, setAuthorized] = useState(true); // null = carregando
  const [loading, setLoading] = useState(true); // null = carregando


  useEffect(() => {
    async function checkAuth() {
      const isAuthorized = await auth();
      setAuthorized(isAuthorized);
      setLoading(false);
    }
    checkAuth();
  }, []);


  if (loading) {
    return <Loading />
  }

  return (
    <div className="overflow-hidden">
      {authorized ? <>
      <div className="flex">
        <Nav page={1} />
        <div className="grid grid-cols-2 bg-[#333] p-5 h-screen w-[100%]">
          <div>
            <Assunt />
          </div>
          <div>
            <Assunt />
          </div>
          <div>
            <Assunt />
          </div>
          <div>
            <Assunt />
          </div>

        </div>
      </div>
      </> : <AcessBloqued />}
    </div>
  );
}
