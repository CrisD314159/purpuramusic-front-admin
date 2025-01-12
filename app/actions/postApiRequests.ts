import { cookies } from "next/headers"
import {  ApiGeneralResponse, apiURL } from "../lib/definitions"
import { logout } from "./auth"

export async function LoginFetch(email:string, password:string){
  try {
    const response = await fetch(`${apiURL}/login/admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
  
    const data = await response.json()
    return data
  } catch {
    return {
      success: false,
      message: 'An error occured while trying to login'
    }
  }


}


export async function CreateArtistRequest(imageUrl:string, name:string, description:string){
  try {
    const token = (await cookies()).get('token')?.value
    if(!token) logout()
    const response = await fetch(`${apiURL}/createArtist`,
      {
        method: 'POST',
        headers:{
          "Authorization": `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({imageUrl, name, description})
      }
    )
    const data : ApiGeneralResponse = await response.json()
    return data
    

  } catch {
    return {
      success: false,
      message: 'An error occured while trying to create artist'
    }
    
  }
  
}
export async function CreateGenreRequest(color:string, name:string, description:string){
  try {
    const token = (await cookies()).get('token')?.value
    if(!token) logout()
    const response = await fetch(`${apiURL}/createGenre`,
      {
        method: 'POST',
        headers:{
          "Authorization": `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({color, name, description})
      }
    )
    const data : ApiGeneralResponse = await response.json()
    return data
    

  } catch {
    return {
      success: false,
      message: 'An error occured while trying to create artist'
    }
    
  }
  
}
export async function CreateSongRequest(
  name:string, lyrics:string, imageUrl:string, audioUrl:string, duration:string, 
  producerName:string, writerName:string, recordLabel:string, releaseDate:string, 
   genres:string[], artists:string[]
){
  try {
    const token = (await cookies()).get('token')?.value
    if(!token) logout()
    const response = await fetch(`${apiURL}/createGenre`,
      {
        method: 'POST',
        headers:{
          "Authorization": `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name, lyrics, imageUrl, audioUrl, duration, producerName, 
          writerName, recordLabel, releaseDate, genres, artists})
      }
    )
    const data : ApiGeneralResponse = await response.json()
    return data
    

  } catch {
    return {
      success: false,
      message: 'An error occured while trying to create artist'
    }
    
  }
  
}
export async function CreateAlbumRequest(
  name:string, artistId:string, imageUrl:string, genreId:string, 
  producerName:string, writerName:string, recordLabel:string, releaseDate:string, 
  description:string
){
  try {
    const token = (await cookies()).get('token')?.value
    if(!token) logout()
    const response = await fetch(`${apiURL}/createGenre`,
      {
        method: 'POST',
        headers:{
          "Authorization": `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name, artistId, imageUrl, genreId, producerName, 
          writerName, recordLabel, releaseDate, description})
      }
    )
    const data : ApiGeneralResponse = await response.json()
    return data
    

  } catch {
    return {
      success: false,
      message: 'An error occured while trying to create artist'
    }
    
  }
  
}