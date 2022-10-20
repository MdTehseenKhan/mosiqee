
import Link from "next/link"
import Image from "next/image"
import { useSelector, useDispatch } from "react-redux"
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode } from "swiper"

import PlayPause from "./PlayPause"
import { playPause, setActiveSong } from "../app/features/playerSlice"
import { useGetTopChartsQuery } from "../app/services/shazamCore"

import "swiper/css"
import "swiper/css/free-mode"

const TopPlay = () => {
  const dispatch = useDispatch()
  const {activeSong, isPlaying} = useSelector(state=>state.player)
  const {data} = useGetTopChartsQuery()

  const topPlays = data?.slice(0, 5)

  const handlePlay = (song, i) => {
    dispatch(setActiveSong({song, data, i}))
    dispatch(playPause(true))
  }
  const handlePause = () => {
    dispatch(playPause(false))
  }
  
  return (
   <div className="xl:ml-6 ml-0 xl:mb-0 mb-6 mt-5 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
    <div className="w-full flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-white font-bold text-2xl">
          Top Charts
        </h2>

        <Link href="/top-charts">
         <p className="text-gray-300 text-base cursor-pointer hover:underline">
          See more
         </p>
        </Link>
      </div>

      <div className="mt-4 flex flex-col gap-1">
       {topPlays?.map((song, i) => (
        <TopChartCard key={song.key} song={song} i={i} isPlaying={isPlaying} activeSong={activeSong} handlePlay={handlePlay} handlePause={handlePause} />
       ))}
      </div>

      <div className="w-full flex flex-col mt-8">
       <div className="flex flex-row justify-between items-center">
        <h2 className="text-white font-bold text-2xl">
          Top Artists
        </h2>

        <Link href="/top-artists">
         <p className="text-gray-300 text-base cursor-pointer hover:underline">
          See more
         </p>
        </Link>
      </div>

        <Swiper 
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4">
          {topPlays?.map((song, i) => (
            <SwiperSlide 
              key={song.key}
              style={{width: "25%", height: "auto"}}
              className="shadow-lg rounded-full animate-slideright overflow-hidden"
              >
              <Link href= {`/artists/${song?.artists[0].adamid}`}>
                {/*<Image src={song?.images?.background} alt="artist" className="rounded-full w-full object-cover" layout="fill"/>*/}
                <img src={song?.images?.background} alt="artist" className="rounded-full w-full object-cover" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
   </div>
  )
}

export default TopPlay;


export const TopChartCard = ({ song, i, isPlaying, activeSong, handlePlay, handlePause }) => (
  <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 mb-2 rounded-lg cursor-pointer">
    <h3 className="font-bold font-base text-white mr-3">{i+1}.</h3>

    <div className="flex flex-1 flex-row justify-between items-center">
  {/*<Image src={song?.images?.coverart} alt={song?.title} className="w-20 h-20 rounded-lg" layout="fill"/>*/}
      <img src={song?.images?.coverart} alt={song?.title} className="w-20 h-20 rounded-lg"/>
      <div className="flex flex-col flex-1 justify-center mx-3">
        <Link href={`/songs/${song?.key}`}>
           <p className="text-xl font-bold text-white">{song?.title}</p>
        </Link>
        <Link href={`/artists/${song?.artists[0].adamid}`}>
           <p className="text-base text-gray-300 mt-1">{song?.subtitle}</p>
        </Link>
      </div>
    </div>
    <PlayPause 
      song={song}
      isPlaying={isPlaying}
      activeSong={activeSong}
      handlePlay={()=>handlePlay(song, i)}
      handlePause={handlePause}
      />
  </div>
) 