import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import axios from "axios"

import { Error, Loader, SongCard } from "../components"
import {countryCodes} from "../constants"

import { useGetSongsByCountryQuery } from "../app/services/shazamCore"

const AroundYou = () => {
  const [country, setCountry] = useState("")
  const [loading, setLoading] = useState(true)
  const { activeSong, isPlaying } = useSelector(state => state.player)
  const { data, isFetching, error } = useGetSongsByCountryQuery(country)

  useEffect(()=>{
    axios.get(`https://geo.ipify.org/api/v2/country?apiKey=${process.env.NEXT_PUBLIC_GEO_API_KEY}`)
     .then((res) => {
       const c = res?.data?.location?.country
       const isValid = countryCodes.some((code) => (code==c))
       if (isValid) {
         setCountry(c)
       } else {
         setCountry("ID")
       }
      })
     .catch(error => console.log(error))
     .finally(() => setLoading(false))
  }, [country])

  if (isFetching || loading) return <Loader title="Loading Songs Around You..." />

  if (error && country) return <Error />

  return(
    <div className="flex flex-col">
     <h1 className="text-white text-3xl font-bold text-left mt-4 mb-10">Around You</h1>
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

export default AroundYou;
