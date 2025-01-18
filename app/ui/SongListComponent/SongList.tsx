'use client'

import { useState } from "react"
import { Song } from "./SongListComponent"
import SongCard from "./SongCard"
import { Alert, Button, Snackbar } from "@mui/material"
import { getSongs } from "@/app/actions/getApiRequests"
import { deleteSongAPI } from "@/app/actions/deleteApiRequests"

interface SongListProps {
  initialSongs: Song[]
}

const NUMBER_OF_SONGS_TO_FETCH= 10

export default function SongList({props}:{props:SongListProps}){
  const [offset, setOffset] = useState(NUMBER_OF_SONGS_TO_FETCH)
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [songs, setSongs] = useState<Song[]>(props.initialSongs)
  const [isDeleting, setIsDeleting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')


  const loadMoreSongs = async ()=>{
    setIsLoading(true)
    const {initialSongs, error} = await getSongs(offset, NUMBER_OF_SONGS_TO_FETCH)
    if(error){
      setIsLoading(false)
      setError(true)
      return
    }
    setSongs(songs => [...songs, ...initialSongs])
    setOffset(offset => offset + NUMBER_OF_SONGS_TO_FETCH)
    setIsLoading(false)
  }
    const deleteSong = async (id:string)=>{
        setIsDeleting(true)
        const {success, message} = await deleteSongAPI(id)
        if(success){
          setSongs(songs => songs.filter(songs => songs.id !== id))
          setIsDeleting(false) 
          return
        }
        setIsDeleting(false)
        setErrorMessage(message)
        setError(true)
        
      }



  return (
    <div className="flex flex-col items-center pt-3 w-full">
      {songs.map(song => {
        return(
          <SongCard props={{song:song, deleteSong, isDeleting}} key={song.id} />
        )
      })}

<Button onClick={loadMoreSongs} variant="contained" disabled={isLoading} size="small" color="primary">
      Load More
     </Button>


    <Snackbar open={error} onClose={()=>setError(false)}>
      <Alert severity="error">{errorMessage}</Alert>
    </Snackbar>


    </div>
  )
}