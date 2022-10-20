
import {useSelector, useDispatch} from "react-redux"
import { useGetSongsByGenreQuery } from "../app/services/shazamCore"
import { selectGenreListId } from "../app/features/playerSlice"

import { PageTitle, Error, Loader, SongCard } from "../components"
import { genres } from "../constants"

export default function Discover() {
  const dispatch = useDispatch()
  const {genreListId, activeSong, isPlaying} = useSelector(state => state.player)
  
  const {data, isFetching, error} = useGetSongsByGenreQuery(genreListId || "POP")
  
  const genreTitle = genres.find(({ value }) => value === genreListId?.title)

  if (isFetching) return <Loader title="Loading Songs..." />

  if(error) return <Error />
  
  return (
    <>
      <PageTitle>Mosiqee | Discover</PageTitle>
      <div className="flex flex-col">
         <div className="w-full flex flex-col sm:flex-row justify-between items-center mt-4 mb-10">
          <h2 className="font-bold text-white text-3xl">Discover {genreTitle}</h2>
           <select
             onChange={(e) => dispatch(selectGenreListId(e.target.value))}
             value={genreListId || "pop"}
             className="bg-black text-gray-300 p-3 text-sm outline-none rounded-lg sm:mt-0 mt-5">
             {genres.map(({title, value}) => <option key={value} value={value}>{title}</option>)}
           </select>
        </div>
        <div className="flex flex-wrap justify-center sm:justify-start gap-8">
          {data?.map((song, i)=>(
            <SongCard
              key={song.key}
              song={song}
              i={i}
              activeSong={activeSong}
              isPlaying={isPlaying}
              data={data}
              />
          ))}
        </div>
      </div>
    </>
  )
}
