'use client'

import { getArtistById } from "@/app/actions/getApiRequests"
import { Alert, CircularProgress, Snackbar } from "@mui/material"
import useSWR from "swr"
import ArtistCreationForm from "../../Creation/artists/ArtistCreationForm"

interface EditFormProps{
  id:string
}

const fetchArtist = async (id:string) => {
  try {
    const artist = await getArtistById(id)
    return artist
  } catch (error) {
    throw error
  }
}

export default function EditArtistClientComponent({props}:{props:EditFormProps}){
  const {data, error, isLoading} = useSWR(props.id, fetchArtist)



  return (

    <div>
      <div className="flex justify-start p-5">
            <h1 className="font-light text-3xl">Update Artist</h1>
        </div>
    <div style={{maxHeight:"calc(100vh - 154px)", overflowY:"auto"}} className="flex flex-col items-center">
               
      
              {isLoading ? <CircularProgress color='info'/>:
            <ArtistCreationForm props={{artist:data, edit:true}}/>
              }
            

                {error&& 
      <Snackbar open={error} autoHideDuration={4000}>
        <Alert severity="error">{"Error loading artist"}</Alert>
     
      </Snackbar>
     }
    </div>
    </div>

       
     


            

    

  )
}