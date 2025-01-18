'use client'
import Image from "next/image";
import { Artist } from "./ArtistListComponent";
import { Button } from "@mui/material";
import DeleteDialog from "../Dialogs/DeleteDialog";
import Link from "next/link";

interface ArtistCardProps {
  artist: Artist
  deleteArtist:(id:string)=>void
  isDeleting:boolean
}

export default function ArtistCard({props}:{props:ArtistCardProps}){
  const {artist} = props

  return (
    <div key={artist.id} className="flex items-center justify-center my-10 py-2 px-2 mainArtist w-full">
    <div className="pb-4">
      <Image src={artist.imageUrl} alt={artist.name} width={300} height={300} layout="intrinsic" unoptimized/>
    </div>
    <div className="relative w-full">
      <div className="flex flex-col justify-center ml-6">
        <h3 className="mb-3 text-xl font-medium">{artist.name}</h3>
        <p className="font-extralight">{artist.description}</p>
        <div className="flex mt-8 justify-evenly">
         <Link href={`/dashboard/edit/artists/${artist.id}`}>
          <Button variant="outlined" color="primary">Edit Artist</Button>
         </Link> 
          <DeleteDialog props={{buttonText:"Delete Artist", deleteMethod:props.deleteArtist, 
            itemId:artist.id, title:"Are you sure you want to delete this artist?", isDeleting:props.isDeleting}}/>
        </div>
      </div>

    </div>

  </div>
  )
}