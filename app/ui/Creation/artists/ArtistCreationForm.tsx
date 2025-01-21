'use client'
import { Alert, Button, Snackbar, TextField } from "@mui/material";
import ImageUploading from "../../various/UploadingInputs/ImageUploading";
import { useActionState, useEffect, useState } from "react";
import { CreateArtist } from "@/app/actions/createActions";
import { Artist } from "../../ArtistListComponent/ArtistListComponent";
import { UpdateArtist } from "@/app/actions/updateActions";
import '@/app/css/FormComponents.css'

interface ArtistFormProps {
  artist?: Artist,
  edit?: boolean
}

export default function ArtistCreationForm({props}:{props:ArtistFormProps}){
  const [imageUrl, setImageUrl] = useState<string |null>(props.artist?.imageUrl ?? "")
  const [state, action, pending] = useActionState(props.edit ? UpdateArtist : CreateArtist, undefined)
  const [snackbar, setSnackbar] = useState(false)
  const [error, setError] = useState(false)

  useEffect(()=>{
    if(state?.success){
      setSnackbar(true)
    }else if (state?.success === false){
      setError(true)
    }
  }, [state?.success])

  return (
    <form action={action} className="flex flex-col items-center ">
      <ImageUploading props={{setImageUrl, success: state?.success, initialUrl:props.artist?.imageUrl ?? null}} />
      <TextField required value={imageUrl} name="imageUrl" sx={{display:'none'}}/>
      {
        props.edit && <TextField required value={props.artist?.id} name="id" sx={{display:'none'}}/>
      }
  
  <div className="flex flex-col items-center justify-center mt-10 formComponent">
      <h2 className="font-light text-2xl">Artist Data</h2>
            
          <TextField variant="filled" required name="name" defaultValue={props.artist?.name ?? ""} sx={{width:'100%', margin:'20px 0px'}} label="Artist Name" slotProps={{htmlInput:{maxLength:20, minLength:3}}} helperText="Min 3 characters, max 20"
          
          />
        
          <TextField variant="filled" defaultValue={props.artist?.description?? ""} required name="description" sx={{width:'100%', margin:'20px 0px'}} label="Artist Description" multiline slotProps={{htmlInput:{minLength:10, maxLength:300}}} helperText="Min 10 characters, max 300"/>

        {
          props.edit?<Button type="submit"  variant="contained" disabled={pending}>Update artist</Button>:
          <Button type="submit"  variant="contained" disabled={pending}>Upload artist</Button>
        }
        

        <Snackbar open={snackbar} autoHideDuration={4000} onClose={()=>setSnackbar(false)}>
          <Alert severity="success">{state?.message}</Alert>
        </Snackbar>
        
        <Snackbar open={error} autoHideDuration={4000} onClose={()=>setError(false)}>
          <Alert severity="error">{state?.message}</Alert>

        </Snackbar>

  </div>
     
      
      
    </form>
  )
}