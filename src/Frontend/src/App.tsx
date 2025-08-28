import TextForm from "./components/fields/Normal"
import Password from "./components/fields/password"
import Checkbox from "./components/fields/Checkbox"
import SubmitButton from "./components/buttons/GreenButton"
export default function App() {
  return (
    <form className="h-screen flex flex-col items-center justify-center">
      <div className="w-[400px]">
        <h1 className="font-poppins text-800 text-[#299D91] text-[40px] mb-[64px] text-center">FINE<span className="text-500">bank</span>.IO</h1>
        <div className="flex flex-col gap-[24px]">
          <TextForm type="text" name="Email" placeholder="johndoe@email.com" textspan="Email Address"/>
          <Password textspan="Password" alternativeSpan="Forgot Password?" name="password" tamanho={14} />
          <Checkbox name="Maek input" textspan="Keep me singned In"/>
          <SubmitButton label="Submit button" name="Legal" text="Login"/>
          <div className="flex flex-row items-center justify-center w-full">
            <hr className="border-none h-[1px] w-[342px] bg-[#4B5768]" />
            <p className="text-center absolute bg-white text-[#333333] w-[112px] bg-[#fff] text-400">
              or sign in with
            </p>
          </div>
        </div>
      </div>

    </form>
  )
}