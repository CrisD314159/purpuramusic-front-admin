'use client'
import { Alert, Button, TextField } from "@mui/material";
import login from "../actions/auth";
import Image from "next/image";
import { useActionState } from "react";

export default function LoginForm(){
  const [state, action, pending] = useActionState(login, undefined)
 
  return (
    
    <form action={action} className="flex flex-col items-center justify-center w-full py-4 loginform">
       <div className="flex flex-col items-center justify-center">
        {state?.message &&  <Alert severity="warning">{state.message}</Alert>}
      </div>
      <div>
        <Image src="/purpura-entire-logo.png" alt="logo" width={250} height={250} />
        
      </div>

      <div className="flex flex-col items-center justify-center space-y-2">
        <TextField required label="Email" type="email" color="secondary" name="email" variant="standard" error={!!state?.errors?.email} helperText={state?.errors?.email && <p>{state.errors.email}</p>}/>
       
      </div>

      <div className="flex flex-col items-center justify-center mt-5 mb-12">
      <TextField
          label="Password"
          required
          type="password"
          name="password"
          autoComplete="current-password"
          variant="standard"
          color="secondary"
          helperText={state?.errors?.password && <p>{state.errors.password}</p>}
          error={!!state?.errors?.password}
        />
      </div>
      
      <div>
        <Button disabled={pending} type="submit" variant="outlined" color="primary">Login</Button>
      </div>

     
     
    </form>
    

  )
}