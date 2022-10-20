import Link from "next/link"
import Image from "next/image"

import PlayPause from "./PlayPause"

import { useDispatch } from "react-redux"
import { playPause, setActiveSong } from "../app/features/playerSlice"

import { placeholderImage } from "../assets/images"

const SongCard = ({song, data, i, isPlaying, activeSong}) => {
  const dispatch = useDispatch()

  const handlePlay = (song, i) => {
    dispatch(setActiveSong({song, data, i}))
    dispatch(playPause(true))
  }
  const handlePause = () => {
    dispatch(playPause(false))
	}


  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
    <div className="relative w-full h-56 group">
      <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex transition ${activeSong?.title === song?.title?"flex bg-black bg-opacity-70":"hidden"}`}>
        <PlayPause 
          song={song}
          activeSong={activeSong}
          isPlaying={isPlaying}
          handlePlay={()=>handlePlay(song, i)}
          handlePause={handlePause}
          />
      </div>
      {/*<Image src={song?.images?.coverart} alt="song_img" layout="fill" />*/}
      <img src={ (song?.images?.coverart) == undefined ? placeholderImage.src : song?.images?.coverart } alt="song_img" />
    </div>

    <div className="mt-4 flex flex-col">
      <p className="font-semibold text-lg text-white truncate">
        <Link href={`songs/${song?.key}`}>{song.title}</Link>
      </p>
      <p className="text-sm text-gray-300 mt-1 truncate">
        <Link href={song?.artists ? `/artists/${song?.artists[0]?.adamid}` : "/top-artists"}>{song?.subtitle}</Link>
      </p>
    </div>
  </div>
  )
}

export default SongCard;
