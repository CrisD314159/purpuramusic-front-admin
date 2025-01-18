'use client'
import { Alert, Button, Snackbar, TextField } from "@mui/material";
import ImageUploading from "../../various/UploadingInputs/ImageUploading";
import { useActionState, useEffect, useState } from "react";
import { CreateAlbum } from "@/app/actions/createActions";
import GenreSelectMenu from "../../various/SelectMenus/GenreSelectMenu";
import ArtistSelectMenu from "../../various/SelectMenus/ArtistSelectMenu";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Album } from "../../AlbumListComponent/AlbumListComponent";
import dayjs from "dayjs";


interface AlbumFormProps {
  album?: Album,
  edit?: boolean
}

export default function AlbumCreationForm({props}:{props:AlbumFormProps}){
   const [imageUrl, setImageUrl] = useState<string |null>(props.album?.pictureUrl ?? "")
    const [state, action, pending] = useActionState(CreateAlbum, undefined)
    const [snackbar, setSnackbar] = useState(false)
    const [error, setError] = useState(false)
    const [genre, setGenre] = useState<string[]>([props.album?.genreId ?? ""]) // Están en un array porque el componente ArtistSelectMenu espera un array, ya que puede ser multiple
    const [artist, setArtist] = useState<string[]>([props.album?.artistId ?? ""])
  
    useEffect(()=>{
      if(state?.success){
        setSnackbar(true)
      }else if (state?.success === false){
        setError(true)
      }
    }, [state?.success])
  return (
    <form action={action} className="w-full flex flex-col items-center">
      <ImageUploading props={{setImageUrl, success: state?.success, initialUrl:props.album?.pictureUrl ?? null}}/>
      <TextField required value={imageUrl} name="imageUrl" sx={{display:'none'}}/>

      <div className="w-full flex flex-col items-center justify-center mt-10">
        <h2 className="font-light text-2xl">Album Data</h2>
        <TextField required name="artistId" value={artist[0]} sx={{display:'none'}}/>
        <TextField required name="genreId" value={genre[0]} sx={{display:'none'}}/>

        <div className="my-7 w-full flex justify-center">
          <TextField variant="filled" defaultValue={props.album?.name ?? ""} required name="name" label="Album Name" sx={{width:"70%"}} slotProps={{htmlInput:{maxLength:20, minLength:3}}} helperText="Min 3 characters, max 20"/>
        </div>

        <div className="my-7 w-full flex justify-center">
        <TextField variant="filled" defaultValue={props.album?.description?? ""} required name="description" label="Album Description" multiline sx={{width:"70%"}} slotProps={{htmlInput:{minLength:10, maxLength:300}}} helperText="Min 10 characters, max 300"/>

        </div>

        <div className="my-7 w-full flex justify-center">
        <ArtistSelectMenu props={{artist, setArtist}}/>

        </div>
        <div className="my-7 w-full flex justify-center">
        <GenreSelectMenu props={{genre, setGenre}}/>

        </div>
        <div className="my-7 w-full flex justify-center">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker sx={{width:'70%'}} name="releaseDate" defaultValue={props.album?.releaseDate ? dayjs(props.album.releaseDate) : undefined}/>

          </LocalizationProvider>

        </div>
        <div className="my-7 w-full flex justify-center">
        <TextField variant="filled" defaultValue={props.album?.producerName ?? ""}  name="producerName" label="Producer" sx={{width:"70%"}} slotProps={{htmlInput:{minLength:10, maxLength:300}}} helperText="Min 10 characters, max 80"/>

        </div>
        <div className="my-7 w-full flex justify-center">
        <TextField variant="filled" name="writerName" defaultValue={props.album?.writerName ?? ""} label="Writer" sx={{width:"70%"}} slotProps={{htmlInput:{minLength:10, maxLength:300}}} helperText="Min 10 characters, max 80"/>

        </div>
        <div className="my-7 w-full flex justify-center">
        <TextField variant="filled" name="recordLabel" defaultValue={props.album?.recordLabel ?? ""} label="Record Label" sx={{width:"70%"}} slotProps={{htmlInput:{minLength:10, maxLength:300}}} helperText="Min 10 characters, max 80"/>

        </div>

      </div>

      {
        props.edit?<Button type="submit"  variant="contained" disabled={pending}>Update album</Button>:
        <Button type="submit"  variant="contained" disabled={pending}>Upload album</Button>
      }

      <Snackbar open={snackbar} autoHideDuration={4000} onClose={()=>setSnackbar(false)}>
        <Alert severity="success">{state?.message}</Alert>
      </Snackbar>
      
      <Snackbar open={error} autoHideDuration={4000} onClose={()=>setError(false)}>
        <Alert severity="error">{state?.message}</Alert>

      </Snackbar>
      
      
    </form>
  )
}