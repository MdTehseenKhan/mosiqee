import { useRouter } from "next/router"
import { useSelector, useDispatch } from "react-redux"

import { PageTitle, DetailsHeader, Error, Loader, RelatedSongs } from "../../components"

import { setActiveSong, playPause } from "../../app/features/playerSlice"
import { useGetSongDetailsQuery, useGetRelatedSongsQuery } from "../../app/services/shazamCore"


const SongDetails = () => {
  const {query: songid} = useRouter()

  const dispatch = useDispatch()
  const { activeSong, isPlaying } = useSelector(state => state.player)

  const { data: songData, isFetching: loading, error: songError } = useGetSongDetailsQuery(songid)
  
  const {data, isFetching, error} = useGetRelatedSongsQuery(songid)

  if(isFetching && loading) return <Loader title="Loading Song Details..." />
  
  if (error || songError) return <Error />

  const handlePlay = (song, i) => {
    dispatch(setActiveSong({song, songData, i}))
    dispatch(playPause(true))
  }
  const handlePause = () => {
    dispatch(playPause(false))
  }
  
  return (<>
    <PageTitle>Mosiqee | Song Details</PageTitle>
    <div className="flex flex-col">
      <DetailsHeader 
        songData={songData}
      />
      
      <div className="mb-10">
        <h3 className="text-white text-3xl font-bold">{songData?.title} - Lyrics</h3>
        <div className="mt-5">
          {(songData?.sections[1].type === "LYRICS")
          ? (
        songData?.sections[1].text.map((line, i) => (
          <p key={i} className="text-gray-400 text-base my-1">{line}</p>
        ))
          ) : (
            <p className="text-gray-400 text-base my-1">Sorry no Lyrics Found!</p>
          ) }
        </div>
      </div>

      <RelatedSongs 
        data={data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePause={handlePause}
        handlePlay={handlePlay}
      />
    </div>
  </>)
}

export default SongDetails;