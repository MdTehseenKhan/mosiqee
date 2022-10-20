import { useRouter } from "next/router"
import { useSelector } from "react-redux"

import { Error, Loader, SongCard } from "../../components"

import { useGetSongsBySearchQuery } from "../../app/services/shazamCore"

const Search = () => {
  const { query: { searchTerm } } = useRouter()

  const { activeSong, isPlaying } = useSelector(state => state.player)
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm)

  if (isFetching) return <Loader title="Loading Top Charts..." />

  if (error) return <Error />

  const songs = data?.tracks?.hits?.map(song => song.track)

  return(
    <div className="flex flex-col">
     <h1 className="text-white text-3xl font-bold text-left mt-4 mb-10">Showing Results for <span className="font-black">{searchTerm}</span></h1>
     <div className="flex flex-wrap justify-center sm:justify-start gap-8">
			 { songs?.map((song, i) => (
       <SongCard 
         key={song?.key}
         song={song}
         i={i}
         data={data}
         isPlaying={isPlaying}
         activeSong={activeSong}
        />
       )) }
      </div>
    </div>
  )
}

export default Search;
