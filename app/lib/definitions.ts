
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
export const CreateGenreSchema = z.object({
  color:  z.string().min(3).max(10),
  name: z.string().min(2, { message: 'Name must be at least 3 characters long.' }).max(20, {message: "Name must be at least or less than 20 characters" }).trim(),
  description: z.string().min(10, { message: 'Name must be at least 3 characters long.' }).max(300, {message: "Description must be at least or less than 300 characters long" }).trim(),
})
export const CreateSongSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters long.' }).max(20, {message: "Name must be at least or less than 20 characters" }).trim(),
  lyrics: z.string().min(10, { message: 'Lyrics must be at least 3 characters long.' }).optional(),
  imageUrl: z.string(),
  audioUrl: z.string(),
  duration : z.string(),
  producerName: z.string().min(3, { message: 'Name must be at least 3 characters long.' }).max(20, {message: "Name must be at least or less than 20 characters" }).optional(),
  writerName: z.string().min(3, { message: 'Name must be at least 3 characters long.' }).max(20, {message: "Name must be at least or less than 20 characters" }).optional(),
  recordLabel: z.string().min(3, { message: 'Name must be at least 3 characters long.' }).max(20, {message: "Name must be at least or less than 20 characters" }).optional(),
  releaseDate: z.string(),
  genres: z.array(z.string()),
  artists: z.array(z.string())
})
export const CreateAlbumSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters long.' }).max(20, {message: "Name must be at least or less than 20 characters" }).trim(),
  imageUrl: z.string(),
  description: z.string().min(10, { message: 'Name must be at least 3 characters long.' }).max(300, {message: "Description must be at least or less than 300 characters long" }).trim(),
  producerName: z.string().min(3, { message: 'Name must be at least 3 characters long.' }).max(20, {message: "Name must be at least or less than 20 characters" }).optional(),
  writerName: z.string().min(3, { message: 'Name must be at least 3 characters long.' }).max(20, {message: "Name must be at least or less than 20 characters" }).optional(),
  recordLabel: z.string().min(3, { message: 'Name must be at least 3 characters long.' }).max(20, {message: "Name must be at least or less than 20 characters" }).optional(),
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