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
import { Song } from "../../SongListComponent/SongListComponent";
import ArtistEditDialog from "../../various/SelectMenus/ArtistEditDialog";
import dayjs from "dayjs";
import { UpdateSong } from "@/app/actions/updateActions";
import '@/app/css/FormComponents.css'


interface SongFormProps {
  song?: Song,
  edit?: boolean
}

export default function SongCreationForm({props}:{props:SongFormProps}){
   const [imageUrl, setImageUrl] = useState<string |null>(props.song?.imageUrl ?? "")
    const [state, action, pending] = useActionState(props.edit ? UpdateSong : CreateSong, undefined)
    const [snackbar, setSnackbar] = useState(false)
    const [error, setError] = useState(false)
    const [genre, setGenre] = useState<string[]>(props.song?.genres.map(genre => genre.id) ?? [""]) // Están en un array porque el componente ArtistSelectMenu espera un array, ya que puede ser multiple
    const [artist, setArtist] = useState<string[]>(props.song?.artists.map(artist=>artist.id) ?? [""])
    const [songUrl, setSongUrl] = useState<string | null>(props.song?.audioUrl ??"")
  
    useEffect(()=>{
      if(state?.success){
        setSnackbar(true)
      }else if (state?.success === false){
        setError(true)
      }
    }, [state?.success])
  return (
    <form action={action} className="w-full flex flex-col items-center">
      <ImageUploading props={{setImageUrl, success: state?.success, initialUrl:props.song?.imageUrl ?? null}}/>
      <TextField  value={imageUrl} name="imageUrl" sx={{display:'none'}}/>
      <TextField  value={songUrl} name="audioUrl"  sx={{display:'none'}}/>
      {
        props.edit && 
          <div>
            <TextField required name="id" value={props.song?.id} sx={{display:'none'}}/>
            <TextField required name="albumId" value={props.song?.albumId} sx={{display:'none'}}/>
          </div>
      }
      
      <div className="w-full flex flex-col items-center justify-center mt-10 formComponent">
        <h2 className="font-light text-2xl">Song Audio</h2>
        <SongUploading props={{ success:state?.success, setSongUrl:setSongUrl, initialName:props.song?.name ?? null}}/>

      </div>

      <div className=" flex flex-col items-center justify-center mt-10">
        <h2 className="font-light text-2xl">Song Data</h2>
        <TextField required name="artists" value={artist}  sx={{display:'none'}} />
        <TextField required name="genres" value={genre}  sx={{display:'none'}} />

        
          <TextField variant="filled" defaultValue={props.song?.name ?? ""} required name="name" label="Song Name" sx={{width:"100%", margin:'20px 0px'}} slotProps={{htmlInput:{maxLength:20, minLength:3}}} helperText="Min 3 characters, max 20"/>  
          {
            props.edit ?
            <ArtistEditDialog props={{buttonText:"Change Artist", setArtist, title:"Change Artist", artists:artist, multiple:true}}/>:
            <ArtistSelectMenu props={{artist, setArtist, multiple:true}}/>
          }
        <GenreSelectMenu props={{genre, setGenre, multiple:true}}/>

       
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker sx={{width:"100%", margin:'20px 0px'}} defaultValue={props.song?.releaseDate ? dayjs(props.song.releaseDate) : undefined} name="releaseDate"/>
          </LocalizationProvider>
        
        <TextField variant="filled" defaultValue={props.song?.duration ?? ""} required type="number" name="duration" label="Song Duration" sx={{width:"100%", margin:'20px 0px'}} slotProps={{htmlInput:{maxLength:20, minLength:3}}} helperText="Duration must be written in secs"/>
        
        <TextField defaultValue={props.song?.producerName ?? ""} variant="filled"  name="producerName" label="Producer" sx={{width:"100%", margin:'20px 0px'}} slotProps={{htmlInput:{minLength:10, maxLength:300}}} helperText="Min 10 characters, max 80"/>

        <TextField defaultValue={props.song?.writerName ?? ""} variant="filled" name="writerName" label="Writer" sx={{width:"100%", margin:'20px 0px'}} slotProps={{htmlInput:{minLength:10, maxLength:300}}} helperText="Min 10 characters, max 80"/>

        <TextField defaultValue={props.song?.recordLabel ?? ""} variant="filled" name="recordLabel" label="Record Label" sx={{width:"100%", margin:'20px 0px'}} slotProps={{htmlInput:{minLength:10, maxLength:300}}} helperText="Min 10 characters, max 80"/>
        
        <TextField defaultValue={ props.song?.lyrics ?? ""} variant="filled" name="lyrics" label="Song Lyrics" multiline sx={{width:"100%", margin:'20px 0px'}} slotProps={{htmlInput:{minLength:10, maxLength:300}}} helperText="Min 10 characters"/>


      </div>
      {
        props.edit?<Button type="submit"  variant="contained" disabled={pending}>Update Song</Button>:
        <Button type="submit"  variant="contained" disabled={pending}>Upload artist</Button>
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