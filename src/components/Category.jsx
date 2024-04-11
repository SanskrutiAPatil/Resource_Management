/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"


const Category = ({type, items}) => {

  // const items = ;


  return (
    <div className="group border max-w-[400px] md:max-w-[10000px] hover:bg-secondary hover:scale-105 ease-linear hover:text-white transition-all duration-200  border-black overflow-hidden rounded-xl aspect-[4/3] grid place-items-center hover:place-items-start hover:shadow-md">
        <h1 className="text-center w-full group-hover:text-3xl text-4xl ">{type}</h1>
        <div className="hidden group-hover:block ">
          <ul>

              {Array.isArray(items) && (
                items.map(item => {
                  return <Link to={`/resource/${item}`} key={item} className="block cursor-pointer border-b  border-dotted text-start text-2xl my-2 px-4 rounded-sm last:border-none">{item}</Link>
                })
              )}

              {!Array.isArray(items) && (
                Object.keys(items).map(key => {
                  return <h2 className="border-b  border-dotted text-start text-2xl my-2 px-4 rounded-sm last:border-none" key={key}>{key}</h2>
                })
              )}

          </ul>
        </div>
    </div >
  )
}

export default Category