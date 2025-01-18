import SongCreationForm from "@/app/ui/Creation/songs/SongCreationForm";

export default function SongsPage(){
  return (
    <div className="flex flex-col items-center justify-center">
          <div className="w-full flex items-center justify-start p-5">
            <h1 className="font-light text-3xl">Create Single Song</h1>
          </div>
        <div className="flex flex-col items-center p-5 w-full"  style={{maxHeight:"calc(100vh - 154px)", overflowY:"auto"}}>
            <SongCreationForm/>
          </div>
        </div>
  )
}