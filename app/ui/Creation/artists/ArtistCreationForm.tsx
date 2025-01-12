'use client'
import { Alert, Button, Snackbar, TextField } from "@mui/material";
import ImageUploading from "../../various/ImageUploading";
import { useActionState, useEffect, useState } from "react";
import { CreateArtist } from "@/app/actions/createActions";

export default function ArtistCreationForm() {
  const [imageUrl, setImageUrl] = useState<string |null>("")
  const [state, action, pending] = useActionState(CreateArtist, undefined)
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
    <form action={action} className="w-full flex flex-col items-center ">
      <ImageUploading props={{setImageUrl, success: state?.success}}/>
      <TextField required value={imageUrl} name="imageUrl" sx={{display:'none'}}/>
      <div className="w-full flex flex-col items-center justify-center mt-10">
        <h2 className="font-light text-2xl">Artist Data</h2>
        <div className="my-7 w-full flex justify-center">
          <TextField variant="filled" required name="name" label="Artist Name" sx={{width:"70%"}} slotProps={{htmlInput:{maxLength:20, minLength:3}}} helperText="Min 3 characters, max 20"/>
        </div>

        <div className="my-7 w-full flex justify-center">
        <TextField variant="filled" required name="description" label="Artist Description" multiline sx={{width:"70%"}} slotProps={{htmlInput:{minLength:10, maxLength:300}}} helperText="Min 10 characters, max 300"/>

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