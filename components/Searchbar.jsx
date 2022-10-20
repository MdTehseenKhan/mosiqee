import { useState } from 'react';

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"

import { FiSearch as SearchIcon } from 'react-icons/fi';

import { logo } from "../assets/images"

const Searchbar = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
		if (!searchTerm) return
    router.push(`/search/${searchTerm}`);
  };
  
  return (<>
	<div className="w-full bg-black flex items-center px-2 py-1">
		<Link href="/">
			<div className="relative w-14 h-14 mt-1">
        <Image src={logo} alt="logo" className="w-14 h-14"/>
			</div>
		</Link>
		<form onSubmit={handleSearch} autoComplete="off" className="container mx-auto">
      <label htmlFor="default-search" className="sr-only">
        Search
      </label>
      <div className="relative mx-auto">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <SearchIcon aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
					autoComplete="off"
          id="default-search"
          className="block w-full p-4 pl-10 outline-none text-sm text-white placeholder-gray-500 bg-transparent"
          required
        />
        <button
          onClick={handleSearch}
          className="text-white absolute top-[50%] -translate-y-1/2 right-2 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
        >
          Search
        </button>
      </div>
    </form>
	</div>
	</>)
};
export default Searchbar