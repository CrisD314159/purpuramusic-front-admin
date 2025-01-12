'use server'
import { apiURL } from "../lib/definitions";

export interface ImageUploadResponse {
  success: boolean;
  message: string;
  url: string;
}

export default async function ImageUpload(image:File | null){
  if(!image){
    return
  }
  try {
    const formData = new FormData();
  formData.append("image", image);
  const response = await fetch(`${apiURL}/image/upload`, {
    method: "POST",
    body: formData
  });

  const {success, message, url} : ImageUploadResponse = await response.json()


  return {success, message, url}
  } catch {
    return{
      success: false,
      message: 'An error occured while trying to upload the image',
      url:''
    }
    
  }
  

}