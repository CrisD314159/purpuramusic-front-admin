'use server'
import { cookies } from "next/headers"
import { ApiGeneralResponse, apiURL } from "../lib/definitions"


export async function UpdateArtistRequest(id:string, imageUrl:string, name:string, description:string){
  try {
    const token = (await cookies()).get('token')?.value
    const response = await fetch(`${apiURL}/updateArtist`,
      {
        method: 'PUT',
        headers:{
          "Authorization": `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id, imageUrl, name, description})
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

export async function UpdateGenreRequest(id:string, color:string, name:string, description:string){
  try {
    const token = (await cookies()).get('token')?.value
    const response = await fetch(`${apiURL}/updateGenre`,
      {
        method: 'PUT',
        headers:{
          "Authorization": `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id, color, name, description})
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
export async function UpdateSongRequest(
  id:string, name:string, lyrics:string | undefined, imageUrl:string, audioUrl:string, duration:string, 
  producerName:string |undefined, writerName:string | undefined, recordLabel:string |undefined, releaseDate:string, 
   genres:string[], artists:string[], albumId:string
){

  const requestBody = {
    id,
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
    lyrics,
    albumId
  };
  try {
    const token = (await cookies()).get('token')?.value
    const response = await fetch(`${apiURL}/updateSong`,
      {
        method: 'PUT',
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

export async function UpdateAlbumRequest(
  id:string, name:string, artistId:string, imageUrl:string, genreId:string, 
  producerName:string | undefined, writerName:string | undefined, recordLabel:string | undefined, releaseDate:string, 
  description:string
){


  const requestBody ={
    id,
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
    const response = await fetch(`${apiURL}/updateAlbum`,
      {
        method: 'PUT',
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