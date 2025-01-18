'use client'

import ArtistCreationForm from "@/app/ui/Creation/artists/ArtistCreationForm"


export default function ArtistsPage(){

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full flex items-center justify-start p-5">
        <h1 className="font-light text-3xl">Create Artist</h1>
      </div>
    <div className="flex flex-col items-center p-5 w-full"  style={{maxHeight:"calc(100vh - 154px)", overflowY:"auto"}}>
        <ArtistCreationForm props={{edit:false}}/>
      </div>
    </div>
  )
}