'use client'
import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { useActionState, useEffect, useState } from "react";
import { AddSongToAlbum } from "@/app/actions/createActions";
import GenreSelectMenu from "../../various/SelectMenus/GenreSelectMenu";
import ArtistSelectMenu from "../../various/SelectMenus/ArtistSelectMenu";
import SongUploading from "../../various/UploadingInputs/SongUploading";
import ArtistEditDialog from "../../various/SelectMenus/ArtistEditDialog";

import '@/app/css/FormComponents.css'


interface SongFormProps {
  albumid:string,
  defaultArtists?: string,
  defaultGenre?: string,
}

export default function AddSongDialogForm({props}:{props:SongFormProps}){
    const [state, action, pending] = useActionState(AddSongToAlbum, undefined)
    const [snackbar, setSnackbar] = useState(false)
    const [error, setError] = useState(false)// Están en un array porque el componente ArtistSelectMenu espera un array, ya que puede ser multiple
    const [artist, setArtist] = useState<string[]>([props.defaultArtists ?? ""])
    const [genre, setGenre] = useState<string[]>([props.defaultGenre ?? ""])
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
      <TextField  value={songUrl} name="audioUrl"  sx={{display:'none'}}/>
   
      <TextField required name="albumId" value={props.albumid} sx={{display:'none'}}/>

      
      <div className="w-full flex flex-col items-center justify-center mt-10 formComponent">
        <h2 className="font-light text-2xl">Song Audio</h2>
        <SongUploading props={{ success:state?.success, setSongUrl:setSongUrl}}/>

      </div>

      <div className=" flex flex-col items-center justify-center mt-10">
        <h2 className="font-light text-2xl">Song Data</h2>
        <TextField required name="artists" value={artist}  sx={{display:'none'}} />
        <TextField required name="genres" value={genre}  sx={{display:'none'}} />

        
        <TextField variant="filled" defaultValue={""} required name="name" label="Song Name" sx={{width:"100%", margin:'20px 0px'}} slotProps={{htmlInput:{maxLength:20, minLength:3}}} helperText="Min 3 characters, max 20"/>  
     
        <h2 className="font-light text-2xl">Current Artists</h2>
        <ArtistEditDialog props={{buttonText:"Change Artist", setArtist, title:"Change Artist", artists:artist, multiple:true}}/>
        
        <h2 className="font-light text-2xl">Add More Artists</h2>
        <ArtistSelectMenu props={{artist, setArtist, multiple:true}}/>

        <GenreSelectMenu props={{genre, setGenre, multiple:true}}/>

        <TextField variant="filled" defaultValue={ ""} required type="number" name="duration" label="Song Duration" sx={{width:"100%", margin:'20px 0px'}} slotProps={{htmlInput:{maxLength:20, minLength:3}}} helperText="Duration must be written in secs"/>
        
        <TextField defaultValue={ ""} variant="filled" name="lyrics" label="Song Lyrics" multiline sx={{width:"100%", margin:'20px 0px'}} slotProps={{htmlInput:{minLength:10, maxLength:300}}} helperText="Min 10 characters"/>


      </div>

        <Button type="submit"  variant="contained" disabled={pending}>Add song to album</Button>
      

      <Snackbar open={snackbar} autoHideDuration={4000} onClose={()=>setSnackbar(false)}>
        <Alert severity="success">{state?.message}</Alert>
      </Snackbar>
      
      <Snackbar open={error} autoHideDuration={4000} onClose={()=>setError(false)}>
        <Alert severity="error">{state?.message}</Alert>

      </Snackbar>
      
      
    </form>
  )
}