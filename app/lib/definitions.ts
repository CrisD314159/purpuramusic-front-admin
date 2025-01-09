
import {z} from 'zod';

export const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .trim(),
})

export type FormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

export const apiURL = 'http://localhost:3030/apiprivate'


export interface ApiLoginResponse {
  success: boolean
  message: string
  token: string
  refreshToken: string
}