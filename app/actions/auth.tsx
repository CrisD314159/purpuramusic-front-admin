'use server'
import { redirect } from "next/navigation";
import { ApiLoginResponse, apiURL, FormState, LoginFormSchema } from "../lib/definitions";
import { createSession, deleteSession } from "../lib/session";



export default async function login(state:FormState, formdata: FormData){
  const formValidation = LoginFormSchema.safeParse({
    email: formdata.get('email'),
    password: formdata.get('password')
  })

  if(!formValidation.success){
    return {
      errors: formValidation.error.flatten().fieldErrors
    }
  }

  const {email, password} = formValidation.data

  const response = await fetch(`${apiURL}/login/admin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })

  const {success, message, token, refreshToken} : ApiLoginResponse = await response.json()

  if(!success){
    return {
      message
    }
  }

  await createSession(token, refreshToken)

  redirect('/dashboard')

}

export async function logout() {
  deleteSession()
  redirect('/')
}


