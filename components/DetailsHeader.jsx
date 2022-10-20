import Link from "next/link"

const DetailsHeader = ({ artistId, artistData, songData }) => {
  
  const artist = artistData?.artists[artistId.id]?.attributes
  

  return (<div className="relative w-full flex flex-col my-16">
    <div className="w-full bg-gradient-to-l from-transparent to-black h-28 sm:h-48" />
    <div className="absolute inset-0 flex items-center">
      <img 
        alt="art"
        src={ artistId ? artist?.artwork?.url.replace("{w}", "500").replace("{h}", "500") : songData?.images?.coverart }
        className="rounded-full w-28 sm:w-48 h-28 sm:h-48 object-cover border-2 shadow-xl shadow-black"
        />
      
      <div className="ml-5">
        <p className="text-bold text-white text-xl sm:text-3xl">{ artistId ? artist?.name : songData?.title}</p>
        
        { !artistId && (
    <Link href={`/artists/${songData?.artists[0]?.adamid}`}>
      <p className="text-base text-gray-400 mt-2">{songData?.subtitle}</p>
    </Link>
        )}
        
        <p className="text-base text-gray-400 mt-2">
          { artistId ? artist?.genreNames[0] : songData?.genres?.primary }
        </p>
      </div>
    </div>
  </div>)
}

export default DetailsHeader;
