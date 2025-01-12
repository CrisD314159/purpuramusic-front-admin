import GenreCreationForm from "@/app/ui/Creation/genres/GenreCreationForm";

export default function GenresPage(){
  return (
    <div className="flex flex-col items-center justify-center">
         <div className="w-full flex items-center justify-start p-5">
           <h1 className="font-light text-3xl">Create Genre</h1>
         </div>
       <div className="flex flex-col items-center p-5 w-full"  style={{maxHeight:"calc(100vh - 154px)", overflowY:"auto"}}>
          <GenreCreationForm/>
         </div>
       </div>
  )
}