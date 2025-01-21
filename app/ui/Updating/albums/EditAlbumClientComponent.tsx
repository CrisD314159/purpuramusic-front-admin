'use client'

import { getAlbumById } from "@/app/actions/getApiRequests"
import { Alert, CircularProgress, Snackbar } from "@mui/material"
import useSWR from "swr"
import AlbumCreationForm from "../../Creation/albums/AlbumCreationForm"

interface EditFormProps{
  id:string
}

const fetchAlbums = async (id:string) => {
  try {
    const artist = await getAlbumById(id)
    return artist
  } catch (error) {
    throw error
  }
}

export default function EditAlbumClientComponent({props}:{props:EditFormProps}){
  const {data, error, isLoading} = useSWR(props.id, fetchAlbums)



  return (

    <div>
      <div className="flex justify-start p-5">
            <h1 className="font-light text-3xl">Update Album</h1>
        </div>
    <div style={{maxHeight:"calc(100vh - 154px)", overflowY:"auto"}} className="flex flex-col items-center">
               
      
              {isLoading ? <CircularProgress color='info'/>:
            <AlbumCreationForm props={{album:data, edit:true}}/>
              }
            

                {error&& 
      <Snackbar open={error} autoHideDuration={4000}>
        <Alert severity="error">{"Error loading album"}</Alert>
     
      </Snackbar>
     }
    </div>
    </div>

  )
}