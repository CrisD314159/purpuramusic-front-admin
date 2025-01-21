'use client'

import { getSongById } from "@/app/actions/getApiRequests"
import { Alert, CircularProgress, Snackbar } from "@mui/material"
import useSWR from "swr"
import SongCreationForm from "../../Creation/songs/SongCreationForm"

interface EditFormProps{
  id:string
}

const fetchSong = async (id:string) => {
  try {
    const artist = await getSongById(id)
    return artist
  } catch (error) {
    throw error
  }
}

export default function EditSongClientComponent({props}:{props:EditFormProps}){
  const {data, error, isLoading} = useSWR(props.id, fetchSong)

  return (

    <div>
      <div className="flex justify-start p-5">
            <h1 className="font-light text-3xl">Update Song</h1>
        </div>
    <div style={{maxHeight:"calc(100vh - 154px)", overflowY:"auto"}} className="flex flex-col items-center">
               
      
              {isLoading ? <CircularProgress color='info'/>:
            <SongCreationForm props={{song:data, edit:true}}/>
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