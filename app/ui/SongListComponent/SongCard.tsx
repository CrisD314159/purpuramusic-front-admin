'use client'

import { Button } from "@mui/material"
import Image from "next/image"
import { Song } from "./SongListComponent"
import DeleteDialog from "../Dialogs/DeleteDialog"

interface SongCardProps {
  song:Song
  deleteSong:(id:string)=>void
  isDeleting:boolean
}


export default function SongCard({props}:{props:SongCardProps}){
  const {song}=props
  return(
    <div key={song.id} className="flex items-center justify-center my-10 py-2 px-2 w-full mainArtist">
    <div className="pb-4">
      <Image src={song.imageUrl} alt={song.name} width={300} height={300} layout="intrinsic" unoptimized/>
    </div>
    <div className="relative w-full">
      <div className="flex flex-col justify-center ml-6">
        <h3 className="mb-3 text-xl font-bold">{song.name}</h3>
        {song.artists? song.artists.map(artist =>{
          return <p key={artist.id} className="font-normal">{artist.name}</p>
        }): <p>Loading</p>
        
        }
       {song.genres? song.genres.map(genre =>{
        return (
          <p className="font-normal" key={genre.id}>{genre.name}</p>
        )
       }): <p>Loading</p>}
        <div className="flex mt-8 justify-evenly">
          <Button variant="outlined" color="primary">Edit Song</Button>
          <DeleteDialog props={{buttonText:"Delete Song", deleteMethod:props.deleteSong, 
                                       itemId:song.id, title:"Are you sure you want to delete this song?", isDeleting:props.isDeleting}}/>
        </div>
      </div>
    </div>

  </div>
  )

}