'use client'
import { Alert, Button, Snackbar, TextField } from "@mui/material";
import ColorPickerComponent from "../../various/ColorPickerComponent";
import { useActionState, useEffect, useState } from "react";
import { CreateGenre } from "@/app/actions/createActions";

export default function GenreCreationForm(){
  const [state, action, pending] = useActionState(CreateGenre, undefined)
  const [snackbar, setSnackbar] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [hex, setHex] = useState("#9607f5")

  useEffect(()=>{
    if(state?.success){
      setSnackbar(true)
    }else if (state?.success === false){
      setError(true)
      setErrorMessage(state?.message)
    }

  }, [state?.success, state?.message])

  return(
    <form action={action} className="w-full flex flex-col items-center">
      <ColorPickerComponent props={{hex, setHex}}/>
      <div className=" flex flex-col items-center justify-center w-full">
        <h2 className="font-light text-2xl">Genre Data</h2>
        <div className="w-full my-7 flex justify-center">
          <TextField required label="Genre Name" sx={{width:"70%"}} name="name" variant="filled" slotProps={{htmlInput:{minLength:3, maxLength:20}}} helperText="Min 3 characters, max 20"/>
          <TextField required sx={{display:'none'}} name="color" variant="outlined" value={hex}/>
        </div>
        <div className="w-full flex justify-center my-7">
          <TextField required label="Genre Description" multiline sx={{width:"70%"}}  name="description" variant="filled" slotProps={{htmlInput:{minLength:3, maxLength:300}}} helperText="Min 3 characters, max 300"/>
        </div>
        
      </div>
        <Button type="submit" variant="contained" disabled={pending}>Create Genre</Button>

      <Snackbar open={snackbar} autoHideDuration={4000} onClose={()=>setSnackbar(false)}>
        <Alert variant="filled" severity="success">Genre created successfully</Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={4000} onClose={()=>setError(false)}>
        <Alert variant="filled" severity="error">{errorMessage??"There was an error while creating the genre"}</Alert>
      </Snackbar>

    </form>
  )
}