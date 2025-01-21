'use client'
import { Button } from "@mui/material";
import Image from "next/image";
import { Album } from "./AlbumListComponent";
import DeleteDialog from "../Dialogs/DeleteDialog";
import Link from "next/link";
import AlbumSongListAccordion from "../Accordion/AlbumSongListAccordion";

interface AlbumCardProps {
  albums:Album
  deleteAlbum:(id:string)=>void
  isDeleting:boolean
}

export default function AlbumCard({props}:{props:AlbumCardProps}){
  const {albums} = props
  return(
    <div key={albums.id} className="flex items-center justify-center my-10 py-2 px-2 mainArtist w-full">
    <div className="pb-4">
      <Image src={albums.pictureUrl} width={300} height={300} alt={albums.name} unoptimized/>
    </div>
    <div className="relative w-full">
      <div className="flex flex-col justify-center ml-6">
        <h3 className="mb-3 text-xl font-bold">{albums.name}</h3>
        <p className="font-normal">{albums.artistName}</p>
        <p className="font-normal">{albums.releaseDate}</p>
        <p className="font-normal">{albums.genreName}</p>
        <p className="font-medium">{albums.description}</p>
        <div className="flex mt-8 justify-evenly">
          <Link href={`/dashboard/edit/albums/${albums.id}`}>
            <Button variant="outlined" color="primary" sx={{margin:'0px 10px'}}>Edit Album</Button> 
          </Link>
          <DeleteDialog props={{buttonText:"Delete Album", deleteMethod:props.deleteAlbum, 
            itemId:albums.id, title:"Are you sure you want to delete this album?", isDeleting:props.isDeleting}}/>
        </div>
      </div>
      <AlbumSongListAccordion props={{songs:props.albums.songs, albumId:props.albums.id, artistId:props.albums.artistId, genreId:props.albums.genreId}}/>
    </div>

  </div>
  )
}