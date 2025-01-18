'use client'
import { Alert, Button, Snackbar, TextField } from "@mui/material";
import ImageUploading from "../../various/UploadingInputs/ImageUploading";
import { useActionState, useEffect, useState } from "react";
import { CreateSong } from "@/app/actions/createActions";
import GenreSelectMenu from "../../various/SelectMenus/GenreSelectMenu";
import ArtistSelectMenu from "../../various/SelectMenus/ArtistSelectMenu";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import SongUploading from "../../various/UploadingInputs/SongUploading";

export default function SongCreationForm(){
   const [imageUrl, setImageUrl] = useState<string |null>("")
    const [state, action, pending] = useActionState(CreateSong, undefined)
    const [snackbar, setSnackbar] = useState(false)
    const [error, setError] = useState(false)
    const [genre, setGenre] = useState<string[]>([]) // Están en un array porque el componente ArtistSelectMenu espera un array, ya que puede ser multiple
    const [artist, setArtist] = useState<string[]>([""])
    const [songUrl, setSongUrl] = useState<string | null>("")
  
    useEffect(()=>{
      if(state?.success){
        setSnackbar(true)
      }else if (state?.success === false){
        setError(true)
      }
    }, [state?.success])
  return (
    <form action={action} className="w-full flex flex-col items-center">
      <ImageUploading props={{setImageUrl, success: state?.success}}/>
      <TextField  value={imageUrl} name="imageUrl" sx={{display:'none'}}/>
      <TextField  value={songUrl} name="audioUrl"  sx={{display:'none'}}/>
      
      <div className="w-full flex flex-col items-center justify-center mt-10">
        <h2 className="font-light text-2xl">Song Audio</h2>
        <SongUploading props={{ success:state?.success, setSongUrl:setSongUrl}}/>

      </div>

      <div className="w-full flex flex-col items-center justify-center mt-10">
        <h2 className="font-light text-2xl">Song Data</h2>
        <TextField required name="artists" value={artist}  sx={{display:'none'}} />
        <TextField required name="genres" value={genre}  sx={{display:'none'}} />

        <div className="my-7 w-full flex justify-center">
          <TextField variant="filled" required name="name" label="Song Name" sx={{width:"70%"}} slotProps={{htmlInput:{maxLength:20, minLength:3}}} helperText="Min 3 characters, max 20"/>
        </div>

        <div className="my-7 w-full flex justify-center">
        <ArtistSelectMenu props={{artist, setArtist, multiple:true}}/>

        </div>
        <div className="my-7 w-full flex justify-center">
        <GenreSelectMenu props={{genre, setGenre, multiple:true}}/>

        </div>
        <div className="my-7 w-full flex justify-center">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker sx={{width:'70%'}} name="releaseDate"/>
          </LocalizationProvider>

        </div>

        <div className="my-7 w-full flex justify-center">
          <TextField variant="filled" required type="number" name="duration" label="Song Duration" sx={{width:"70%"}} slotProps={{htmlInput:{maxLength:20, minLength:3}}} helperText="Duration must be written in secs"/>
        </div>

        <div className="my-7 w-full flex justify-center">
        <TextField defaultValue={""} variant="filled"  name="producerName" label="Producer" sx={{width:"70%"}} slotProps={{htmlInput:{minLength:10, maxLength:300}}} helperText="Min 10 characters, max 80"/>

        </div>
        <div className="my-7 w-full flex justify-center">
        <TextField defaultValue={""} variant="filled" name="writerName" label="Writer" sx={{width:"70%"}} slotProps={{htmlInput:{minLength:10, maxLength:300}}} helperText="Min 10 characters, max 80"/>

        </div>
        <div className="my-7 w-full flex justify-center">
        <TextField defaultValue={""} variant="filled" name="recordLabel" label="Record Label" sx={{width:"70%"}} slotProps={{htmlInput:{minLength:10, maxLength:300}}} helperText="Min 10 characters, max 80"/>

        </div>

        <div className="my-7 w-full flex justify-center">
        <TextField defaultValue={""} variant="filled" name="lyrics" label="Song Lyrics" multiline sx={{width:"70%"}} slotProps={{htmlInput:{minLength:10, maxLength:300}}} helperText="Min 10 characters"/>

        </div>

      </div>
      <Button type="submit"  variant="contained" disabled={pending}>Upload artist</Button>

      <Snackbar open={snackbar} autoHideDuration={4000} onClose={()=>setSnackbar(false)}>
        <Alert severity="success">{state?.message}</Alert>
      </Snackbar>
      
      <Snackbar open={error} autoHideDuration={4000} onClose={()=>setError(false)}>
        <Alert severity="error">{state?.message}</Alert>

      </Snackbar>
      
      
    </form>
  )
}