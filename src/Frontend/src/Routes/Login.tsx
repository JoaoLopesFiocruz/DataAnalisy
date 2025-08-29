import TextForm from "../components/Form/fields/Normal"
import Password from "../components/Form/fields/Password"
import Checkbox from "../components/Form/fields/Checkbox"
import SubmitButton from "../components/Form/buttons/GreenButton"
import GoogleButon from "../components/Form/buttons/GoogleButton"
import CreateAcount from "../components/Form/Text/GreenText"
export default function App() {
  return (
    <form className="h-screen flex flex-col items-center justify-center">
      <div className="w-[400px]">
        <h1 className="font-poppins text-800 text-[#299D91] text-[40px] mb-[64px] text-center">FINE<span className="text-500">bank</span>.IO</h1>
        <div className="flex flex-col gap-[24px]">
          <TextForm type="text" name="Email" placeholder="johndoe@email.com" textspan="Email Address"/>
          <Password textspan="Password" alternativeSpan="Forgot Password?" name="password" tamanho={14} />
          <Checkbox name="Maek input" textspan="Keep me singned In"/>
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