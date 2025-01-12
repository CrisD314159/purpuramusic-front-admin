import { cookies } from "next/headers";
import { apiURL } from "./definitions";
import { createSession} from "./session";


export async function checkIsloggedIn() {
  try {
    const token = (await cookies()).get('token')?.value
    const refresh = (await cookies()).get('refresh')?.value
    if(!token && refresh){
      return await refreshToken()
    }
  const response = await fetch(`${apiURL}/login/checkToken`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token })
  })

  const {success} = await response.json()

  if(!success){
    return await refreshToken()
  }

  return true
  } catch {
    return false
  }

}

async function refreshToken(){
  try {
    const refreshToken = (await cookies()).get('refresh')?.value
    if(!refreshToken) return false

    const response = await fetch(`${apiURL}/refresh/admin`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken })
    })

    const {success, token} = await response.json()

    if(!success){
      return false
    }

    await createSession(token, refreshToken)

    return true
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(String(error));
    }
    
  }
  
}