import EditArtistForm from "@/app/ui/Updating/artists/EditArtistForm";

export default async function EditAlbumsPage(
  {params}:{params:Promise<{id:string}>}
){
  const id = (await params).id
  return (
   <div>
    <EditArtistForm props={{id}}/>
   </div>
  )
}