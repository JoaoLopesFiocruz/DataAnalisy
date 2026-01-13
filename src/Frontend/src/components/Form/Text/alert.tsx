type AppProps = {
  text: string;
  sucess: boolean;
  code: number;
};

export default function Alert({ text, sucess, code }: AppProps) {
  return (
    <>
      <div
        id="alert"
        className={`w-[300px] h-[190px] absolute rounded-[30px] p-[20px]
        ${sucess ? "bg-[#177245]" : "bg-[#ff0000b0]"}`}
      >
        <h1 className="text-center w-full text-[#F5F5F5] text-2xl">
          {code}
        </h1>
        <p className="text-center text-[#F5F5F5]">
          {text}
        </p>
      </div>

      <style>{`
        #alert {
          animation: popup 10s ease-in-out forwards;
        }

        @keyframes popup {
          0% {
            opacity: 0;
            transform: scale(0);
          }

          10% {
            opacity: 1;
            transform: scale(1);
          }

          90% {
            opacity: 1;
            transform: scale(1);
          }

          100% {
            opacity: 0;
            transform: scale(0);
          }
        }
      `}</style>
    </>
  );
}
