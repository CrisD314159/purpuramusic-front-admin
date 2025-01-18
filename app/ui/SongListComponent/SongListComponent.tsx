'use client'
import { Alert, CircularProgress, Snackbar } from "@mui/material"
import '@/app/css/ArtistComponent.css'
import { useState } from "react";
import useSWR from "swr";
import { getSongs } from "@/app/actions/getApiRequests";
import SongList from "./SongList";

export interface Song{
  id:string,
  name:string,
  artists:{id:string, name:string}[],
  albumId:string,
  albumName:string,
  imageUrl:string,
  audioUrl:string,
  genres:{id:string, name:string}[],
}

export default function AlbumListComponent(){
  const [error, setError] = useState(false);

  const fetchAlbums = async ()=>{
    const {initialSongs, error} = await getSongs(0, 10)
    setError(error)
    return initialSongs
  }

  const {data, isLoading} = useSWR('songs', fetchAlbums)
  return (
    <div className="flex flex-col items-center pt-3">
      {isLoading ? <CircularProgress color='info'/>:
      <SongList props={{initialSongs:data}}/>
      }

       <Snackbar open={error} onClose={() => setError(false)}>
          <Alert severity="error">Error loading songs</Alert>
        </Snackbar>
    </div>
  )
}