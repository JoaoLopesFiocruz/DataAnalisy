import api from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import TextForm from "../components/Form/fields/Normal";
import Password from "../components/Form/fields/Password";
import SubmitButton from "../components/Form/buttons/GreenButton";
import GoogleButon from "../components/Form/buttons/GoogleButton";
import CreateAcount from "../components/Form/Text/GreenText";
import Alert from "../components/Form/Text/alert";

export default function App() {
  const navigate = useNavigate(); // ✅ AQUI (TOPO)

  const [Popup, setPopup] = useState(false);
  const [text, setText] = useState("");
  const [sucess, setSucess] = useState(false);
  const [code, setCode] = useState(404);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const email = (document.getElementById("Email") as HTMLInputElement | null)?.value;
    const password = (document.getElementById("password") as HTMLInputElement | null)?.value;

    api.put("http://localhost:3000/users/Login", {
      Email: email,
      Password: password,
    })
      .then(async (response) => {
        await sessionStorage.setItem("token", response.data.Data);

        // ✅ REDIRECIONAMENTO AUTOMÁTICO
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.error(err)
        setPopup(true);
        setText(err.response.data.Message);
        setSucess(err.response.data.Sucess);
        setCode(err.response.data.Status);

        setTimeout(() => setPopup(false), 10000);
      }).finally((response:any)=>{console.log(response)});
  }

  return (
    <div className="flex flex-1 justify-center bg-[#444]">
      <form
        className="h-screen flex flex-col justify-center mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="w-[400px]">
          <h1 className="font-poppins text-800 text-[#299D91] text-[40px] mb-[64px] text-center">
            FINE<span className="text-500">bank</span>.IO
          </h1>

          <div className="flex flex-col gap-[24px]">
            <TextForm
              type="email"
              name="Email"
              placeholder="Hermenegildo@email.com"
              textspan="Email Address"
            />
            <Password
              textspan="Password"
              alternativeSpan="Forgot Password?"
              name="password"
              tamanho={14}
            />
            <SubmitButton
              label="Submit button"
              name="submitButton"
              text="Login"
            />

            <div className="flex flex-row items-center justify-center w-full">
              <hr className="border-none h-[1px] w-[342px] bg-[#4B5768]" />
              <p className="text-center absolute text-[#F5F5F5] w-[112px] bg-[#444] text-400">
                or sign in with
              </p>
            </div>

            <GoogleButon
              label="Google Login Button"
              name="GoogleLoginButton"
            />
            <CreateAcount text="Create an account" link="/SingIn" />
          </div>
        </div>
      </form>

      {Popup && <Alert text={text} sucess={sucess} code={code} />}
    </div>
  );
}
