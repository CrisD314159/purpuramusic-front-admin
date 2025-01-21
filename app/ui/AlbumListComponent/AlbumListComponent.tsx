'use client'
import '@/app/css/ArtistComponent.css'
import { getAlbums } from "@/app/actions/getApiRequests"
import AlbumList from "./AlbumList"
import { Alert, CircularProgress, Snackbar } from '@mui/material'
import { useState } from 'react'
import useSWR from 'swr'
import { Song } from '../SongListComponent/SongListComponent'

export interface Album{
  id:string,
    name:string,
    description:string,
    pictureUrl:string,
    artistId:string,
    artistName:string,
    genreId:string,
    genreName:string,
    releaseDate:string,
    producer:string
    writer:string
    recordLabel:string
    songs: Song[]
}


export default function AlbumListComponent(){

  const [error, setError] = useState(false);
 
  const fetchAlbums = async () => {
  
      const {initialAlbums, error} = await getAlbums(0, 10)
      setError(error)
      return initialAlbums
    
  }

  const {data, isLoading} = useSWR('albums', fetchAlbums)
  return (
    <div className="flex flex-col items-center pt-3">
     
     {isLoading ? <CircularProgress color='info'/>:
     <AlbumList props={{initialAlbums:data}}/>
     }

      
      <Snackbar open={error} onClose={()=>setError(false)}>
        <Alert severity="error">Error loading albums</Alert>
      </Snackbar>
    </div>
  )
}