
import { useSelector } from 'react-redux';
import { useRef, useEffect } from "react"

import { Searchbar, Sidebar, MusicPlayer, TopPlay } from './index';

const Layout = ({children}) => {
  const { activeSong } = useSelector((state) => state.player);
  const divRef = useRef(null)
	
	useEffect(() => {
    divRef.current.scrollIntoView({behavior: 'smooth'})
  }, [children])

  return (
    <div className="relative flex">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-[#056daa] via-[#a11d46] to-[#b7682d]">
        <Searchbar />

        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div ref={divRef} className="flex-1 h-fit pb-40">
            {children}
          </div>
          <div className="xl:sticky relative top-0 h-fit">
            <TopPlay />
          </div>
        </div>
      </div>

      {activeSong?.title && (
        <div className="fixed h-20 md:h-28 bottom-[72px] md:bottom-1 left-1 right-1 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-lg z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export default Layout;
