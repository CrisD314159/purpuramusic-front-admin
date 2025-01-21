import EditAlbumClientComponent from "@/app/ui/Updating/albums/EditAlbumClientComponent"

export default async function EditAlbumsPage({params}: {params: Promise<{id: string}>}) {
  const id = (await params).id
  return (
    <EditAlbumClientComponent props={{id}}/>
  )

}