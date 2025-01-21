'use client'

import { getGenreById } from "@/app/actions/getApiRequests"
import { Alert, CircularProgress, Snackbar } from "@mui/material"
import useSWR from "swr"
import GenreCreationForm from "../../Creation/genres/GenreCreationForm"

interface EditFormProps{
  id:string
}

const fetchGenre = async (id:string) => {
  try {
    const artist = await getGenreById(id)
    return artist
  } catch (error) {
    throw error
  }
}

export default function EditGenreClientComponent({props}:{props:EditFormProps}){
  const {data, error, isLoading} = useSWR(props.id, fetchGenre)



  return (

    <div>
      <div className="flex justify-start p-5">
            <h1 className="font-light text-3xl">Update Genre</h1>
        </div>
    <div style={{maxHeight:"calc(100vh - 154px)", overflowY:"auto"}} className="flex flex-col items-center">
               
      
              {isLoading ? <CircularProgress color='info'/>:
            <GenreCreationForm props={{genre:data, edit:true}}/>
              }
            

                {error&& 
      <Snackbar open={error} autoHideDuration={4000}>
        <Alert severity="error">{"Error loading genre"}</Alert>
     
      </Snackbar>
     }
    </div>
    </div>

       
     


            

    

  )
}