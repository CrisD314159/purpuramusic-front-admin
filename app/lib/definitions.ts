
import {z} from 'zod';

export const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .trim(),
})
export const CreateArtistSchema = z.object({
  imageUrl: z.string(),
  name: z.string().min(3, { message: 'Name must be at least 3 characters long.' }).max(20, {message: "Name must be at least or less than 20 characters" }).trim(),
  description: z.string().min(10, { message: 'Name must be at least 3 characters long.' }).max(300, {message: "Description must be at least 20 characters long" }).trim(),
})
export const UpdateArtistSchema = z.object({
  id: z.string(),
  imageUrl: z.string(),
  name: z.string().min(3, { message: 'Name must be at least 3 characters long.' }).max(20, {message: "Name must be at least or less than 20 characters" }).trim(),
  description: z.string().min(10, { message: 'Name must be at least 3 characters long.' }).max(300, {message: "Description must be at least 20 characters long" }).trim(),
})
export const CreateGenreSchema = z.object({
  color:  z.string().min(3).max(10),
  name: z.string().min(2, { message: 'Name must be at least 3 characters long.' }).max(20, {message: "Name must be at least or less than 20 characters" }).trim(),
  description: z.string().min(10, { message: 'Name must be at least 3 characters long.' }).max(300, {message: "Description must be at least or less than 300 characters long" }).trim(),
})
export const UpdateGenreSchema = z.object({
  id:z.string(),
  color:  z.string().min(3).max(10),
  name: z.string().min(2, { message: 'Name must be at least 3 characters long.' }).max(20, {message: "Name must be at least or less than 20 characters" }).trim(),
  description: z.string().min(10, { message: 'Name must be at least 3 characters long.' }).max(300, {message: "Description must be at least or less than 300 characters long" }).trim(),
})
export const CreateSongSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters long.' }).max(25, {message: "Name must be at least or less than 25 characters" }).trim(),
  imageUrl: z.string(),
  audioUrl: z.string(),
  duration : z.string(),
  releaseDate: z.string(),
  genres: z.array(z.string()),
  artists: z.array(z.string())
})
export const UpdateSongSchema = z.object({
  id: z.string(),
  name: z.string().min(3, { message: 'Name must be at least 3 characters long.' }).max(25, {message: "Name must be at least or less than 25 characters" }).trim(),
  imageUrl: z.string(),
  audioUrl: z.string(),
  duration : z.string(),
  releaseDate: z.string(),
  genres: z.array(z.string()),
  artists: z.array(z.string())
})
export const CreateAlbumSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters long.' }).max(20, {message: "Name must be at least or less than 20 characters" }).trim(),
  imageUrl: z.string().url(),
  description: z.string().min(10, { message: 'Description must be at least 10 characters long.' }).max(300, {message: "Description must be at least or less than 300 characters long" }).trim(),
  releaseDate: z.string(),
  artistId: z.string(),
  genreId: z.string()
})
export const UpdateAlbumSchema = z.object({
  id: z.string(),
  name: z.string().min(3, { message: 'Name must be at least 3 characters long.' }).max(20, {message: "Name must be at least or less than 20 characters" }).trim(),
  imageUrl: z.string().url(),
  description: z.string().min(10, { message: 'Description must be at least 10 characters long.' }).max(300, {message: "Description must be at least or less than 300 characters long" }).trim(),
  releaseDate: z.string(),
  artistId: z.string(),
  genreId: z.string()
})

export type FormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
      success?: boolean
    }
  | undefined

export const apiURL = 'http://localhost:3030/apiprivate'
export const ASPapiURL = 'http://localhost:5188'


export interface ApiLoginResponse {
  success: boolean
  message: string
  token: string
  refreshToken: string
}

export interface ApiGeneralResponse {
  success: boolean
  message: string
}