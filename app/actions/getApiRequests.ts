'use server'
import { cookies } from "next/headers"
import { ASPapiURL } from "../lib/definitions"

export const getMinGenres = async(url:string) => {
   const token = (await cookies()).get('token')?.value
  const res = await fetch(url, {
    method: 'GET',
    headers:{
      'Authorization': `Bearer ${token}`
    }
  })
  if(!res.ok){
    throw new Error('An error occured while trying to fetch genres')

  }

  return await res.json()
}
export const getMinArtists = async(url:string) => {
   const token = (await cookies()).get('token')?.value
  const res = await fetch(url, {
    method: 'GET',
    headers:{
      'Authorization': `Bearer ${token}`
    }
  })
  if(!res.ok){
    console.log(await res.json());
    throw new Error('An error occured while trying to fetch artists')

  }

  return await res.json()
}


export const getAlbums = async(offset:number, limit:number)=>{
  try {
    const response = await fetch(`${ASPapiURL}/album/getAlbums?offset=${offset}&limit=${limit}`, {cache:'no-store'})
    const albums = await response.json()
    return {initialAlbums: albums, error: false}
  } catch{
    return {initialAlbums: [], error: true}
  }
}

export const getArtists = async(offset:number, limit:number)=>{
  try {
    const response = await fetch(`${ASPapiURL}/artist/getArtists?offset=${offset}&limit=${limit}`, {cache:'no-store'})
    const artists = await response.json()
    return {initialArtists: artists, error: false}
  } catch{
    return {initialArtists: [], error: true}
  }
}

export const getSongs = async(offset:number, limit:number)=>{
  try {
    const response = await fetch(`${ASPapiURL}/song/getSongs?offset=${offset}&limit=${limit}`, {cache:'no-store'})
    const songs = await response.json()
    return {initialSongs: songs, error: false}
  } catch{
    return {initialSongs: [], error: true}
  }
}
export const getGenres = async()=>{
  try {
    const response = await fetch(`${ASPapiURL}/genre/getAll`, {cache:'no-store'})
    const genres = await response.json()
    return {initialGenres: genres, error: false}
  } catch{
    return {initialGenres: [], error: true}
  }
}


export const getArtistById = async (id:string)=>{
  try {
    const response = await fetch(`${ASPapiURL}/artist/getArtistProfile/${id}`, {cache:'no-store'})
    if(!response.ok) throw new Error('An error occured while trying to fetch artist')
    const artist = await response.json()
  return artist
  } catch (error) {

    throw error
    
  }
}
export const getGenreById = async (id:string)=>{
  try {
    const response = await fetch(`${ASPapiURL}/genre/getGenre/${id}`, {cache:'no-store'})
    if(!response.ok) throw new Error('An error occured while trying to fetch the genre')
    const genre = await response.json()
  return genre
  } catch (error) {

    throw error
    
  }
}
export const getAlbumById = async (id:string)=>{
  try {
    const response = await fetch(`${ASPapiURL}/album/getAlbum/${id}`, {cache:'no-store'})
    if(!response.ok) throw new Error('An error occured while trying to fetch the genre')
    const album = await response.json()
  return album
  } catch (error) {

    throw error
    
  }
}
export const getSongById = async (id:string)=>{
  try {
    const response = await fetch(`${ASPapiURL}/song/getSong/${id}`, {cache:'no-store'})
    if(!response.ok) throw new Error('An error occured while trying to fetch the genre')
    const album = await response.json()
  return album
  } catch (error) {

    throw error
    
  }
}