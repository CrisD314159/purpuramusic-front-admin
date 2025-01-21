import EditArtistClientComponent from "@/app/ui/Updating/artists/EditArtistClientComponent";

export default async function EditAlbumsPage(
  {params}:{params:Promise<{id:string}>}
){
  const id = (await params).id
  return ( 
    <EditArtistClientComponent props={{id}}/>
  )
}