'use client'
import { Alert, Button, Grow, IconButton, Snackbar } from "@mui/material"
import { ChangeEvent, useEffect, useState } from "react"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import {SongUpload, UploadResponse} from "@/app/actions/fileUpload";

interface SongUploadProps {
  success:boolean | undefined,
  setSongUrl: (url:string) => void
}

export default function SongUploading({props}:{props:SongUploadProps}){
  const [songNamePreview, setSongNamePreview] = useState<string | null>("")
  const [songReady, setSongReady] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [snackbar, setSnackbar] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [upload, setUpload] = useState(false)

  useEffect(()=>{
    if(props.success){
      setSongNamePreview(null)
      console.log("Image uploaded successfully");
    }
  }, [props.success])


  const handleSongUpload = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files) return;
  
      const file = e.target.files[0];
      if (file.type.split('/')[0] !== 'audio' || file.size > 10000000 || file.name.split('.').pop() !== 'mp3') throw new Error("Song must be a valid audio file (mp3) less than 10MB");
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpload(true);
        setSongNamePreview(file.name)
      };
  
      reader.readAsDataURL(file);
      setSongReady(file);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        setError(true);
      }
    }
  };



  const handleUpload = async () => {
    try {
      if(!songReady) return
      setLoading(true)
      console.log("ready");
      const response : UploadResponse | undefined = await SongUpload(songReady)
      if(response?.success && response){
        setLoading(false)
        props.setSongUrl(response.url)
        setSnackbar(true)
        setUpload(false)
        return
      }
      setLoading(false)
      setError(true)
    } catch{
      setLoading(false)
      setError(true)
    }
  };


  return(
    <div className="flex flex-col items-center justify-center w-full">
      
      <div className="flex flex-col items-center justify-center w-80 h-12 mt-7 rounded-lg overflow-hidden bg-neutral-900" style={{boxShadow: '0 0 30px #ff40ff', border: '0.5px solid #ff40ff'}}>
        {songNamePreview ? !props.success && <IconButton size="large" color="info" ><MusicNoteIcon sx={{width:"50px", height:"50px"}} /></IconButton>:
        <IconButton size="large" disabled><MusicNoteIcon sx={{width:"50px", height:"50px"}} /></IconButton> }
      </div>
      <p style={{color:'#ff40ff'}} className="mt-5">{songNamePreview}</p>
      <label form="dropzone-file" className="flex flex-col items-center justify-center w-32 h-10 rounded-lg cursor-pointer hover:bg-fuchsia-400 border my-5" style={{borderColor: '#ff40ff'}}>
        <CloudUploadIcon color="info"/>
        <input id="dropzone-file" type="file" className="hidden" onChange={(e)=>{ 
        handleSongUpload(e)
        }} />
      </label>

      {upload && <Button onClick={handleUpload} variant="contained" disabled={loading} color="info">Upload Song</Button>}

      <Snackbar open={snackbar} TransitionComponent={Grow} autoHideDuration={3000} anchorOrigin={{vertical:'top', horizontal:'center'}} onClose={()=>setSnackbar(false)} message="Image uploaded successfully">
        <Alert
        onClose={()=>setSnackbar(false)}
        severity="success"
        variant="filled"
        >
          Song uploaded successfully
        </Alert>
      </Snackbar>
      <Snackbar open={error} TransitionComponent={Grow} autoHideDuration={5000} anchorOrigin={{vertical:'top', horizontal:'center'}} onClose={()=>setError(false)} message="Image uploaded successfully">
        <Alert
        onClose={()=>setError(false)}
        severity="error"
        variant="filled"
        >
          {errorMessage ?? "An error occurred uploading the song"}
        </Alert>
      </Snackbar>


      
    </div> 
  )
}