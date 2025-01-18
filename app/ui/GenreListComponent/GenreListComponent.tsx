'use client'
import { Alert, CircularProgress, Snackbar } from "@mui/material"
import '@/app/css/ArtistComponent.css'
import { getGenres } from "@/app/actions/getApiRequests";
import GenreList from "./GenreList";
import useSWR from "swr";
import { useState } from "react";

export interface Genre{
  id:string,
  name:string,
  description:string,
  color:string
}

export default function GenreListComponent(){
  const [error, setError] = useState(false);

  const fetchAlbums = async ()=>{
    const {initialGenres, error} = await getGenres()
    setError(error)
    return initialGenres
  }

  const {data, isLoading} = useSWR('genres', fetchAlbums)
  return (
    <div className="flex flex-col items-center pt-3">
      {isLoading ? <CircularProgress color='info'/>:
      <GenreList props={{initialGenres:data}}/>
      }

       <Snackbar open={error} onClose={() => setError(false)}>
              <Alert severity="error">Error loading genres</Alert>
            </Snackbar>
    </div>
  )
}