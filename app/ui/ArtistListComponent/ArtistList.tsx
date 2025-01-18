'use client'
import { useState } from "react"
import { Artist } from "./ArtistListComponent"
import ArtistCard from "./ArtistCard"
import { Alert, Button, Snackbar } from "@mui/material"
import { getArtists } from "@/app/actions/getApiRequests"
import { deleteArtistAPI } from "@/app/actions/deleteApiRequests"

interface ArtistListProps {
  initialArtists: Artist[]
}

const NUMBER_OF_ARTISTS_TO_FETCH = 10

export default function ArtistList({props}:{props:ArtistListProps}){
  const [offset, setOffset] = useState(NUMBER_OF_ARTISTS_TO_FETCH)
  const [error, setError] = useState(false)
  const [artists, setArtist] = useState<Artist[]>(props.initialArtists)
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const loadMoreAlbums = async ()=>{
    try {
      setIsLoading(true)
      const {initialArtists, error} = await getArtists(offset, NUMBER_OF_ARTISTS_TO_FETCH)
      if(error){
        setIsLoading(false)
        setErrorMessage('Error loading artists')
        setError(true)
        return
      }
      setOffset(offset => offset + NUMBER_OF_ARTISTS_TO_FETCH)
      setArtist(artists => [...artists, ...initialArtists])
      setIsLoading(false)
      
    } catch{
      setIsLoading(false)
      setErrorMessage('Error loading artists')
      setError(true)
    }

  }

  const deleteArtist = async (id:string)=>{
    setIsDeleting(true)
    const {success, message} = await deleteArtistAPI(id)
    if(success){
      setArtist(artists => artists.filter(artist => artist.id !== id))
      setIsDeleting(false) 
      return
    }
    setIsDeleting(false)
    setErrorMessage(message)
    setError(true)
    
  }

  return (
    <div className="flex flex-col items-center">
      {artists.map(artist =>{
        return (
          <ArtistCard props={{artist:artist, deleteArtist, isDeleting}} key={artist.id}/>
        )
      })}

    <Button onClick={loadMoreAlbums} variant="contained" disabled={isLoading} size="small" color="primary">
      Load More
     </Button>


    <Snackbar open={error} onClose={()=>setError(false)}>
      <Alert severity="error">{errorMessage}</Alert>
    </Snackbar>  


    </div>
  )
}