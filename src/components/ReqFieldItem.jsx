/* eslint-disable react/prop-types */


const ReqFieldItem = ({label, value, className}) => {
    return (
        <div className={'relative border border-gray-600 px-4 py-2 rounded-md ' + className}>
            <label className='absolute -top-4 leading-tight bg-gray-100 px-2 text-xl text-gray-600' >
                {label}
            </label>
            <h1 className="px-2 py-0  mt-[6px] mb-[6px] text-[22px] font-[400] text-gray-800 truncate">{value}</h1>
        </div>
      )
}

export default ReqFieldItem