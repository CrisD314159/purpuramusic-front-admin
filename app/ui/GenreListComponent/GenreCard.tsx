'use client'
import { Button } from "@mui/material";
import { Genre } from "./GenreListComponent";
import DeleteDialog from "../Dialogs/DeleteDialog";
interface GenreCardProps {
  genre: Genre
  deleteGenre:(id:string)=>void
  isDeleting:boolean
}

export default function GenreCard({props}:{props:GenreCardProps}){
  const {genre} = props
  return(
    <div key={genre.id} className="flex items-center justify-center rounded my-10 py-2 px-2 mainArtist w-full" style={{boxShadow:`2px 2px 2px 1px ${genre.color}`}}>
            <div className="relative w-full">
              <div className="flex flex-col justify-center ml-6">
                <h3 className="mb-3 text-xl font-bold" style={{color:`${genre.color}`}}>{genre.name}</h3>
                <p className="font-extralight">{genre.description}</p>
                <div className="flex mt-8 justify-evenly">
                  <Button variant="outlined" color="primary">Edit Genre</Button>
                 <DeleteDialog props={{buttonText:"Delete Genre", deleteMethod:props.deleteGenre, 
                             itemId:genre.id, title:"Are you sure you want to delete this genre?", isDeleting:props.isDeleting}}/>
                </div>
              </div>

            </div>

          </div>
  )
}