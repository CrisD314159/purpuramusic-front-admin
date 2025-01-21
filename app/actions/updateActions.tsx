'use server'

import { ApiGeneralResponse, FormState, UpdateAlbumSchema, UpdateArtistSchema, UpdateGenreSchema, UpdateSongSchema } from "../lib/definitions"
import { separateArray } from "../lib/various"
import { UpdateAlbumRequest, UpdateArtistRequest, UpdateGenreRequest, UpdateSongRequest } from "./putApiRequests"

export async function UpdateArtist(state:FormState, formdata: FormData){
  const formValidation = UpdateArtistSchema.safeParse({
    id: formdata.get('id'),
    imageUrl: formdata.get('imageUrl'),
    name: formdata.get('name'),
    description: formdata.get('description')
  })

  if(!formValidation.success){
    return {
      success: false,
      message: "Check the fields and try again",
    }
  }

  const {id, imageUrl, name, description} = formValidation.data

  const response: ApiGeneralResponse | undefined = await UpdateArtistRequest(id, imageUrl, name, description)

  return {
    success: response?.success,
    message: response?.message
  }  
}

export async function UpdateGenre(state:FormState, formdata: FormData){
  const formValidation = UpdateGenreSchema.safeParse({
    id: formdata.get('id'),
    color: formdata.get('color'),
    name: formdata.get('name'),
    description: formdata.get('description')
  })

  if(!formValidation.success){
    return {
      success: false,
      message: "Check the fields and try again",
    }
  }

  const {id, color, name, description} = formValidation.data

  const response: ApiGeneralResponse | undefined = await UpdateGenreRequest(id, color, name, description)
  console.log(response);

  return {
    success: response?.success,
    message: response?.message
  }  

}
export async function UpdateSong(state:FormState, formdata: FormData){

  const genresSplited = separateArray(formdata.getAll('genres')[0].toString())
  const artistsSplited = separateArray(formdata.getAll('artists')[0].toString())

  console.log(genresSplited, artistsSplited);
  
  const formValidation = UpdateSongSchema.safeParse({
    id: formdata.get('id') as string,
    name: formdata.get('name') as string,
    imageUrl: formdata.get('imageUrl') as string,
    audioUrl: formdata.get('audioUrl') as string,
    duration: formdata.get('duration') as string,
    genres: genresSplited,
    releaseDate: formdata.get('releaseDate') as string,
    artists: artistsSplited,
    albumId: formdata.get('albumId') as string
  })

  const writerName = formdata.get('writerName')?.toString() === ''? "Not Provided" : formdata.get('writerName')?.toString()
  const recordLabel =  formdata.get('recordLabel')?.toString() === ''? "Not Provided" : formdata.get('recordLabel')?.toString()
  const producerName = formdata.get('producerName')?.toString() === ''? "Not Provided" : formdata.get('producerName')?.toString()
  const lyrics = formdata.get('lyrics')?.toString() === ''? "Not Provided" : formdata.get('lyrics')?.toString()
  if(!formValidation.success){
    return {
      success: false,
      message: "Check the fields and try again",
    }
  }

  const {id, name, imageUrl, audioUrl, duration, releaseDate, genres, artists, albumId} = formValidation.data

  const response: ApiGeneralResponse | undefined = await UpdateSongRequest
  (id, name, lyrics, imageUrl, audioUrl, duration, producerName, writerName, recordLabel, releaseDate, genres, artists, albumId)

  console.log(response);

  return {
    success: response?.success,
    message: response?.message
  }  
}


export async function UpdateAlbum(state:FormState, formdata: FormData){
  console.log(formdata.get('releaseDate'));
  const formValidation = UpdateAlbumSchema.safeParse({
    id: formdata.get('id'),
    name: formdata.get('name'),
    imageUrl: formdata.get('imageUrl'),
    description: formdata.get('description'),
    artistId: formdata.get('artistId'),
    genreId: formdata.get('genreId'),
    releaseDate: formdata.get('releaseDate')
  })

  const writerName = formdata.get('writerName')?.toString() === '' ? 'Not Provided' : formdata.get('writerName')?.toString()
  const recordLabel = formdata.get('recordLabel')?.toString() === '' ? 'Not Provided' : formdata.get('recordLabel')?.toString()
  const producerName= formdata.get('producerName')?.toString() ===''? 'Not Provided' : formdata.get('producerName')?.toString()
  console.log(formValidation.error);
  if(!formValidation.success){
    return {
      success: false,
      message: "Check the fields and try again",
    }
  }

  const {id, name, artistId, imageUrl, genreId, releaseDate, description} = formValidation.data

  const response: ApiGeneralResponse | undefined = await UpdateAlbumRequest
  (id, name, artistId, imageUrl, genreId, producerName, writerName , recordLabel, releaseDate, description)

  return {
    success: response?.success,
    message: response?.message
  } 

}