
const Spinner = () => {
  return (
    <div className="flex justify-center items-center gap-4 my-48">
        <span className='animate-spin size-12  rounded-full border-[10px] border-gray-200 border-t-primary '  >
        </span>
         <h2 className="text-2xl">Loading...</h2>
    </div>
)}

export default Spinner