import EditGenreClientComponent from "@/app/ui/Updating/genres/EditGenreClientComponent";

export default async function EditAlbumsPage(
{
  params
}
:{
  params: Promise<{id:string}>
}

){
  const id = (await params).id
  return (
   <EditGenreClientComponent props={{id}} />
  )
}