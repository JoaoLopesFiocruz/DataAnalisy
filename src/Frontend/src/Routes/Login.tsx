import api from "axios"
import TextForm from "../components/Form/fields/Normal"
import Password from "../components/Form/fields/Password"
import SubmitButton from "../components/Form/buttons/GreenButton"
import GoogleButon from "../components/Form/buttons/GoogleButton"
import CreateAcount from "../components/Form/Text/GreenText"
export default function App() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = (document.getElementById("Email") as HTMLInputElement | null)?.value;
    const password=(document.getElementById("password") as HTMLInputElement | null)?.value;
    console.log(email,password)
    api.put("http://localhost:3000/users/Login", {"Email":email,Password:password})
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  }
  return (
    <form className="h-screen flex flex-col items-center justify-center" onSubmit={handleSubmit}>
      <div className="w-[400px]">
        <h1 className="font-poppins text-800 text-[#299D91] text-[40px] mb-[64px] text-center">FINE<span className="text-500">bank</span>.IO</h1>
        <div className="flex flex-col gap-[24px]">
          <TextForm type="email" name="Email" placeholder="Hermenegildo@email.com" textspan="Email Address"/>
          <Password textspan="Password" alternativeSpan="Forgot Password?" name="password" tamanho={14} />
          <SubmitButton label="Submit button" name="submitButton" text="Login"/>
          <div className="flex flex-row items-center justify-center w-full">
            <hr className="border-none h-[1px] w-[342px] bg-[#4B5768]" />
            <p className="text-center absolute bg-white text-[#333333] w-[112px] bg-[#fff] text-400">
              or sign in with
            </p>
          </div>
          <GoogleButon label="Google Login Button" name="GoogleLoginButton"/>
          <CreateAcount text="Create an account" link="Create an acount"/>
        </div>
      </div>

    </form>
  )
}