'use server'
import { ApiGeneralResponse, CreateAlbumSchema, CreateArtistSchema, CreateGenreSchema, CreateSongSchema, FormState } from "../lib/definitions";
import { CreateAlbumRequest, CreateArtistRequest, CreateGenreRequest, CreateSongRequest } from "./postApiRequests";

export async function CreateArtist(state:FormState, formdata: FormData){
  const formValidation = CreateArtistSchema.safeParse({
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

  const {imageUrl, name, description} = formValidation.data

  const response: ApiGeneralResponse | undefined = await CreateArtistRequest(imageUrl, name, description)

  return {
    success: response?.success,
    message: response?.message
  }  
}

export async function CreateGenre(state:FormState, formdata: FormData){
  const formValidation = CreateGenreSchema.safeParse({
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

  const {color, name, description} = formValidation.data

  const response: ApiGeneralResponse | undefined = await CreateGenreRequest(color, name, description)
  console.log(response);

  return {
    success: response?.success,
    message: response?.message
  }  

}
export async function CreateSong(state:FormState, formdata: FormData){
  const formValidation = CreateSongSchema.safeParse({
    name: formdata.get('name'),
    lyrics: formdata.get('lyrics'),
    imageUrl: formdata.get('imageUrl'),
    audioUrl: formdata.get('audioUrl'),
    duration: formdata.get('duration'),
    producerName: formdata.get('producerName'),
    writerName: formdata.get('writerName'),
    recordLabel: formdata.get('recordLabel'),
    releaseDate: formdata.get('releaseDate'),
    genres: formdata.getAll('genres'),
    artists: formdata.getAll('artists')
  })

  if(!formValidation.success){
    return {
      success: false,
      message: "Check the fields and try again",
    }
  }

  const {name, lyrics, imageUrl, audioUrl, duration, producerName, writerName, recordLabel, releaseDate, genres, artists} = formValidation.data

  const response: ApiGeneralResponse | undefined = await CreateSongRequest
  (name, lyrics??"", imageUrl, audioUrl, duration, producerName??"", writerName??"", recordLabel??"", releaseDate, genres, artists)

  return {
    success: response?.success,
    message: response?.message
  }  



}


export async function CreateAlbum(state:FormState, formdata: FormData){
  const formValidation = CreateAlbumSchema.safeParse({
    name: formdata.get('name'),
    imageUrl: formdata.get('imageUrl'),
    description: formdata.get('duration'),
    artistId: formdata.get('artistId'),
    genreId: formdata.get('genreId'),
    producerName: formdata.get('producerName'),
    writerName: formdata.get('writerName'),
    recordLabel: formdata.get('recordLabel'),
    releaseDate: formdata.get('releaseDate')
  })

  if(!formValidation.success){
    return {
      success: false,
      message: "Check the fields and try again",
    }
  }

  const {name, artistId, imageUrl, genreId, producerName, writerName, recordLabel, releaseDate, description} = formValidation.data

  const response: ApiGeneralResponse | undefined = await CreateAlbumRequest
  (name, artistId, imageUrl, genreId, producerName??"", writerName??"", recordLabel??"", releaseDate, description)

  return {
    success: response?.success,
    message: response?.message
  } 

}