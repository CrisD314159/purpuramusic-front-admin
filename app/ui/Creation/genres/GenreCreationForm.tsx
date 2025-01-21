'use client'
import { Alert, Button, Snackbar, TextField } from "@mui/material";
import ColorPickerComponent from "../../various/ColorPickerComponent";
import { useActionState, useEffect, useState } from "react";
import { CreateGenre } from "@/app/actions/createActions";
import { Genre } from "../../GenreListComponent/GenreListComponent";
import { UpdateGenre } from "@/app/actions/updateActions";
import '@/app/css/FormComponents.css'

interface GenreFormProps {
  genre?: Genre,
  edit?: boolean
}

export default function GenreCreationForm({props}:{props:GenreFormProps}){
  const [state, action, pending] = useActionState(props.edit ? UpdateGenre : CreateGenre, undefined)
  const [snackbar, setSnackbar] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [hex, setHex] = useState(props.genre?.color ?? "#9607f5")

  useEffect(()=>{
    if(state?.success){
      setSnackbar(true)
    }else if (state?.success === false){
      setError(true)
      setErrorMessage(state?.message)
    }

  }, [state?.success, state?.message])

  return(
    <form action={action} className="flex flex-col items-center">
      <ColorPickerComponent props={{hex, setHex}}/>
      <div className=" flex flex-col items-center justify-center formComponent">
        <h2 className="font-light text-2xl">Genre Data</h2>

        {
          props.edit && <TextField required value={props.genre?.id} name="id" sx={{display:'none'}}/>
        }
        
        <TextField required sx={{display:'none'}} name="color" variant="outlined" value={hex}/>
       
        <TextField required defaultValue={props.genre?.name ?? ""} label="Genre Name" sx={{width:"100%", margin:'20px 0px'}} name="name" variant="filled" slotProps={{htmlInput:{minLength:3, maxLength:20}}} helperText="Min 3 characters, max 20"/>

       
        <TextField required label="Genre Description" defaultValue={props.genre?.description ?? ""} multiline sx={{width:"100%", margin:'20px 0px'}}  name="description" variant="filled" slotProps={{htmlInput:{minLength:3, maxLength:300}}} helperText="Min 3 characters, max 300"/>
  
      </div>

        {
          props.edit?<Button type="submit"  variant="contained" disabled={pending}>Update Genre</Button>:
          <Button type="submit"  variant="contained" disabled={pending}>Create Genre</Button>
        }

      <Snackbar open={snackbar} autoHideDuration={4000} onClose={()=>setSnackbar(false)}>
        <Alert variant="filled" severity="success">{state?.message}</Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={4000} onClose={()=>setError(false)}>
        <Alert variant="filled" severity="error">{errorMessage??"There was an error while creating the genre"}</Alert>
      </Snackbar>

    </form>
  )
}