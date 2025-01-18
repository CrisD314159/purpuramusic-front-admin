'use client'
import { useState } from "react"
import { Alert, Snackbar } from "@mui/material"
import { Genre } from "./GenreListComponent"
import GenreCard from "./GenreCard"
import { deleteGenreAPI } from "@/app/actions/deleteApiRequests"

interface GenreListProps {
  initialGenres: Genre[]
}


export default function GenreList({props}:{props:GenreListProps}){
  const [error, setError] = useState(false)
  const [genres, setGenres] = useState<Genre[]>(props.initialGenres)
  const [isDeleting, setIsDeleting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')


    const deleteGenre = async (id:string)=>{
      setIsDeleting(true)
      const {success, message} = await deleteGenreAPI(id)
      if(success){
        setGenres(genres => genres.filter(genres => genres.id !== id))
        setIsDeleting(false) 
        return
      }
      setIsDeleting(false)
      setErrorMessage(message)
      setError(true)
      
    }


  return (
    <div className="flex flex-col items-center">
      {genres.map(genre =>{
        return (
          <GenreCard props={{genre:genre, deleteGenre, isDeleting}} key={genre.id}/>
        )
      })}


    <Snackbar open={error} onClose={()=>setError(false)}>
      <Alert severity="error">{errorMessage}</Alert>
    </Snackbar>  


    </div>
  )
}