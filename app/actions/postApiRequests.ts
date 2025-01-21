import { cookies } from "next/headers"
import {  ApiGeneralResponse, apiURL } from "../lib/definitions"

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
  name:string, lyrics:string | undefined, imageUrl:string, audioUrl:string, duration:string, 
  producerName:string |undefined, writerName:string | undefined, recordLabel:string |undefined, releaseDate:string, 
   genres:string[], artists:string[]
){

  const requestBody = {
    name,
    imageUrl,
    audioUrl,
    duration,
    releaseDate,
    genres,
    artists,
    producerName,
    writerName,
    recordLabel,
    lyrics
  };
  try {
    const token = (await cookies()).get('token')?.value
    const response = await fetch(`${apiURL}/createSongSingle`,
      {
        method: 'POST',
        headers:{
          "Authorization": `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
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
export async function AddSongToAlbumRequest(
  name:string, albumId:string, lyrics:string | undefined, audioUrl:string, duration:string, genres:string[], artists:string[]
){

  const requestBody = {
    name,
    audioUrl,
    duration,
    albumId,
    genres,
    artists,
    lyrics
  };
  try {
    const token = (await cookies()).get('token')?.value
    const response = await fetch(`${apiURL}/addSongToAlbum`,
      {
        method: 'POST',
        headers:{
          "Authorization": `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
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
  producerName:string | undefined, writerName:string | undefined, recordLabel:string | undefined, releaseDate:string, 
  description:string
){


  const requestBody ={
    name,
    artistId,
    imageUrl,
    genreId,
    producerName,
    writerName,
    recordLabel,
    releaseDate,
    description
  }
  try {
    const token = (await cookies()).get('token')?.value
    
    const response = await fetch(`${apiURL}/createAlbum`,
      {
        method: 'POST',
        headers:{
          "Authorization": `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      }
    )
    const data : ApiGeneralResponse = await response.json()
    return data
    

  } catch {
    return {
      success: false,
      message: 'An error occured while trying to create the album'
    }
    
  }
  
}