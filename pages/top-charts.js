
import { useSelector } from "react-redux"

import { Error, Loader, SongCard } from "../components"

import { useGetTopChartsQuery } from "../app/services/shazamCore"

const TopCharts = () => {
  const { activeSong, isPlaying } = useSelector(state => state.player)
  const { data, isFetching, error } = useGetTopChartsQuery()

  if (isFetching) return <Loader title="Loading Top Charts..." />

  if (error) return <Error />

  return(
    <div className="flex flex-col">
     <h1 className="text-white text-3xl font-bold text-left mt-4 mb-10">Discover Top Charts</h1>
     <div className="flex flex-wrap justify-center sm:justify-start gap-8">
       {data?.map((song, i) => (
       <SongCard 
         key={song.key}
         song={song}
         i={i}
         data={data}
         isPlaying={isPlaying}
         activeSong={activeSong}
         />
       ))}
      </div>
    </div>
  )
}

export default TopCharts;
