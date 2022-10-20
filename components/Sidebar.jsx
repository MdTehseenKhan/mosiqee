
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"

import { links } from "../constants"

const Sidebar = () => {

  return (<>
    <div className="hidden md:flex flex-col py-10 px-4 bg-black">
      <NavLinks col />
		</div>

		<div className="fixed left-0 bottom-0 md:-bottom-full w-full bg-black z-10 md:hidden smooth-transition">
      <NavLinks />
    </div>
		
  </>)
}

const NavLinks = ({ col }) => {
	const router = useRouter()
	
	return (
		<div className={`flex justify-around ${ col ? "flex-col" : "" }`}>
     {links.map(({name, href, Icon})=>(
      <Link key={name} href={href}>
        <div className={`flex flex-col items-center text-center text-[0.7rem] p-3 hover:text-white hover:scale-95 ${href === router?.pathname ? "text-white" : "text-gray-600"}`}>
          <Icon className="w-7 h-7" />
          {name}
        </div>
      </Link>
    ))}
  </div>)
}

export default Sidebar
