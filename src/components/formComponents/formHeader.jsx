
export default function FormHeader({ heading}){
    return(
        <>
            <div className="text-center subpixel-antialiased md:text-4xl xs:text-3xl lg:mb-6 ls:mt-4 xs:mt-2 xs:mb-6 xs:mx-2"  >
                { heading }
            </div>
        </>
    )
}