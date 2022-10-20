import { useRouter } from "next/router"
import { useSelector, useDispatch } from "react-redux"

import { PageTitle, DetailsHeader, Error, Loader, RelatedSongs } from "../../components"

import { useGetArtistDetailsQuery } from "../../app/services/shazamCore"


const ArtistDetails = () => {
  const {query: artistId} = useRouter()

  const dispatch = useDispatch()
  const { activeSong, isPlaying } = useSelector(state => state.player)

  const { data: artistData, isFetching, error } = useGetArtistDetailsQuery(artistId)

  if(isFetching) return <Loader title="Loading Artist Details..." />
  
  if (error) return <Error />
  
  return (<>
    <PageTitle>Mosiqee | Song Details</PageTitle>
    <div className="flex flex-col">
      <DetailsHeader 
        artistId={artistId}
        artistData={artistData}
      />
      
      <RelatedSongs 
        data={Object.values(artistData?.songs)}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
       />
    </div>
  </>)
}

export default ArtistDetails;