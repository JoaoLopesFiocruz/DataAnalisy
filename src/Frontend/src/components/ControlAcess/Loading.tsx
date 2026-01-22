export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#444]">
      <i  className="fa-solid fa-spinner text-[300px] text-[#64dda1] animate-spin [animation-duration:2s]"></i>
      <h1 className="text-[#64dda1] text-9xl">Loading</h1>
    </div>
  );
}