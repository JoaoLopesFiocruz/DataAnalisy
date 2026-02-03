import AcessBloqued from "../components/ControlAcess/acessBloqued";
import Loading from "../components/ControlAcess/Loading";
import Nav from "../components/Dashboard/BarraLateral/Main";
import { useEffect, useState } from "react";
import {auth} from "../Midleware/Authorization"


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
    <>
      {authorized ? <><Nav page={1} /></> : <AcessBloqued />}
    </>
  );
}
