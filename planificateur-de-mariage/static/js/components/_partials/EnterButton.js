import { Link } from "react-router-dom"

export default function EnterButton({ onClick, path }) {
  if (path) {
    return <Link title="Aller" className="p-1 rounded-full border border-black text-black text-center left-2.5 right-2.5 px-8 py-2 transform hover:scale-105 transition-transform duration-500 ease-out mb-2 w-[180px] lg:w-[180px]" to={path}>
   Aller
    </Link> 
  } else {
    return (
      <button className="p-1 rounded-full border border-black text-black text-center left-2.5 right-2.5 px-8 py-2 transform hover:scale-105 transition-transform duration-500 ease-out mb-2 w-[180px] lg:w-[180px]" onClick={onClick}>
    Aller
      </button>
    )
  }
}
