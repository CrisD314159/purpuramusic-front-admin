'use server'
import { AddSongToAlbumSchema, ApiGeneralResponse, CreateAlbumSchema, CreateArtistSchema, CreateGenreSchema, CreateSongSchema, FormState } from "../lib/definitions";
import { separateArray } from "../lib/various";
import { AddSongToAlbumRequest, CreateAlbumRequest, CreateArtistRequest, CreateGenreRequest, CreateSongRequest } from "./postApiRequests";

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

  const genresSplited = separateArray(formdata.getAll('genres')[0].toString())
  const artistsSplited = separateArray(formdata.getAll('artists')[0].toString())

  console.log(genresSplited, artistsSplited);
  
  const formValidation = CreateSongSchema.safeParse({
    name: formdata.get('name') as string,
    imageUrl: formdata.get('imageUrl') as string,
    audioUrl: formdata.get('audioUrl') as string,
    duration: formdata.get('duration') as string,
    genres: genresSplited,
    releaseDate: formdata.get('releaseDate') as string,
    artists: artistsSplited
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

  const {name, imageUrl, audioUrl, duration, releaseDate, genres, artists} = formValidation.data

  const response: ApiGeneralResponse | undefined = await CreateSongRequest
  (name, lyrics, imageUrl, audioUrl, duration, producerName, writerName, recordLabel, releaseDate, genres, artists)

  console.log(response);

  return {
    success: response?.success,
    message: response?.message
  }  
}

export async function AddSongToAlbum(state:FormState, formdata: FormData){

  const genresSplited = separateArray(formdata.getAll('genres')[0].toString())
  const artistsSplited = separateArray(formdata.getAll('artists')[0].toString())
  
  const formValidation = AddSongToAlbumSchema.safeParse({
    name: formdata.get('name') as string,
    albumId: formdata.get('albumId') as string,
    audioUrl: formdata.get('audioUrl') as string,
    duration: formdata.get('duration') as string,
    genres: genresSplited,
    artists: artistsSplited
  })

  const lyrics = formdata.get('lyrics')?.toString() === ''? "Not Provided" : formdata.get('lyrics')?.toString()
  if(!formValidation.success){
    return {
      success: false,
      message: "Check the fields and try again",
    }
  }

  const {name, audioUrl, duration, genres, artists, albumId} = formValidation.data

  const response: ApiGeneralResponse | undefined = await AddSongToAlbumRequest
  (name, albumId, lyrics, audioUrl, duration, genres, artists)

  console.log(response);

  return {
    success: response?.success,
    message: response?.message
  }  
}


export async function CreateAlbum(state:FormState, formdata: FormData){
  console.log(formdata.get('releaseDate'));
  const formValidation = CreateAlbumSchema.safeParse({
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

  const {name, artistId, imageUrl, genreId, releaseDate, description} = formValidation.data

  const response: ApiGeneralResponse | undefined = await CreateAlbumRequest
  (name, artistId, imageUrl, genreId, producerName, writerName , recordLabel, releaseDate, description)

  return {
    success: response?.success,
    message: response?.message
  } 

}