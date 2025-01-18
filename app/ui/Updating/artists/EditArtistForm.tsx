'use client'

interface EditFormProps{
  id:string
}

export default function EditArtistForm({props}:{props:EditFormProps}){
  return (
    <div>
      {props.id}
    </div>
  )
}