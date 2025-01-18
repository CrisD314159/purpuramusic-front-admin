'use client'
import { useState } from "react"
import { Album } from "./AlbumListComponent"
import AlbumCard from "./AlbumCard"
import { Alert, Button, Snackbar } from "@mui/material"
import { getAlbums } from "@/app/actions/getApiRequests"
import { deleteAlbumAPI } from "@/app/actions/deleteApiRequests"

interface AlbumListProps {
  initialAlbums: Album[]

}

const NUMBER_OF_ALBUMS_TO_FETCH = 10

export default function AlbumList({props}:{props:AlbumListProps}){
  const [offset, setOffset] = useState(NUMBER_OF_ALBUMS_TO_FETCH)
  const [albums, setAlbums]= useState<Album[]>(props.initialAlbums)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')


  const loadMoreAlbums = async () => {
    setIsLoading(true)
    const {initialAlbums, error} = await getAlbums(offset, NUMBER_OF_ALBUMS_TO_FETCH)
    if(error){
      setIsLoading(false)
      setErrorMessage('Error loading albums')
      setError(true)
      return
    }
    setAlbums(albums => [...albums, ...initialAlbums])
    setOffset(offset => offset + NUMBER_OF_ALBUMS_TO_FETCH)
    setIsLoading(false)
  }

    const deleteAlbum = async (id:string)=>{
      setIsDeleting(true)
      const {success, message} = await deleteAlbumAPI(id)
      if(success){
        setAlbums(albums => albums.filter(albums => albums.id !== id))
        setIsDeleting(false) 
        return
      }
      setIsDeleting(false)
      setErrorMessage(message)
      setError(true)
      
    }

  return(
    <div className="flex flex-col items-center">
     {albums.map((album)=>{
      return <AlbumCard props={{albums:album, deleteAlbum, isDeleting}} key={album.id}/>
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