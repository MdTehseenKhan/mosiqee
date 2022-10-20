import { SongBar } from "./index"

const RelatedSongs = ({ data, artistId, isPlaying, activeSong, handlePause, handlePlay }) => {

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl text-white">Related Songs:</h1>
        
      <div className="mt-6 w-full flex flex-col">
       { data?.map((song, i)=> (
        <SongBar 
          key={i}
          song={song}
          i={i}
          artistId={artistId}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePause={handlePause}
          handlePlay={handlePlay}
        />
       ))}
    </div>
  </div>
  )
}

export default RelatedSongs;
