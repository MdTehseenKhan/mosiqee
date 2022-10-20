import Link from "next/link"

const ArtistCard = ({track}) => (
  <Link href={`/artists/${track?.artists[0].adamid}`}>
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <img alt="song_img" src={track?.images?.coverart} className="w-full h-56 rounded-lg" />
      <p className="mt-4 font-semibold text-lg text-white truncate">
        {track?.subtitle}
      </p>
     </div>
   </Link>
)

export default ArtistCard;
