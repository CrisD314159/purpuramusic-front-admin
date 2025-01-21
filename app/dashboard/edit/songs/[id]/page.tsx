import EditSongClientComponent from "@/app/ui/Updating/songs/EditSongClientComponent";

export default async function EditSongsPage(
{
  params
}
:{
  params: Promise<{id:string}>
}

){
  const id = (await params).id
  return (
   <EditSongClientComponent props={{id}} />
  )
}