

import { Error, Loader, ArtistCard } from "../components"

import { useGetTopChartsQuery } from "../app/services/shazamCore"

const TopArtists = () => {
  
  const { data, isFetching, error } = useGetTopChartsQuery()

  if (isFetching) return <Loader title="Loading Top Charts..." />

  if (error) return <Error />

  return(
    <div className="flex flex-col">
     <h1 className="text-white text-3xl font-bold text-left mt-4 mb-10">Top Artists</h1>
     <div className="flex flex-wrap justify-center sm:justify-start gap-8">
       {data?.map((track) => (
       <ArtistCard 
         key={track.key}
         track={track}
         />
       ))}
      </div>
    </div>
  )
}

export default TopArtists;
