'use server'

import { cookies } from "next/headers"
import { apiURL } from "../lib/definitions"

export const deleteArtistAPI = async(id:string)=>{
  const token = (await cookies()).get('token')?.value
  try {
    const response = await fetch(`${apiURL}/deleteArtist`, {
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({id})
    })

    const {success, message} = await response.json()

    return {success, message}

  } catch {
    return {success:false, message:'An error occured while trying to delete the artist'}
    
  }
}

export const deleteAlbumAPI = async(id:string)=>{
  const token = (await cookies()).get('token')?.value
  try {
    const response = await fetch(`${apiURL}/deleteAlbum`, {
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({id})
    })


    const {success, message} = await response.json()

    return {success, message}

  } catch {
    return {success:false, message:'An error occured while trying to delete the album'}
    
  }
}
export const deleteGenreAPI = async(id:string)=>{
  const token = (await cookies()).get('token')?.value
  try {
    const response = await fetch(`${apiURL}/deleteGenre`, {
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({id})
    })


    const {success, message} = await response.json()

    return {success, message}

  } catch {
    return {success:false, message:'An error occured while trying to delete the genre'}
    
  }
}
export const deleteSongAPI = async(id:string)=>{
  const token = (await cookies()).get('token')?.value
  try {
    const response = await fetch(`${apiURL}/deleteSong`, {
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({id})
    })


    const {success, message} = await response.json()

    return {success, message}

  } catch {
    return {success:false, message:'An error occured while trying to delete the song'}
    
  }
}