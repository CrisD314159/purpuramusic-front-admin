
import { Button } from "@mui/material"
import '@/app/css/ArtistComponent.css'

export default function GenreListComponent(){
  const genres = [
    {
      id:'1',
      name: 'Rock',
      Description: 'Rock music is a broad genre of popular music that originated as "rock and roll" in the United States in the late 1940s and early 1950s, developing into a range of different styles in the mid-1960s and later, particularly in the United States and the United Kingdom.',
      color: 'red',
    },
    {
      id:'2',
      name: 'Pop',
      Description: 'Pop music is a genre of popular music that originated in its modern form during the mid-1950s in the United States and the United Kingdom. The terms "popular music" and "pop music" are often used interchangeably, although the former describes all music that is popular and includes many disparate styles.',
      color: 'blue',
    },
    {
      id:'3',
      name: 'Reggaeton',
      Description: 'Reggaeton is a music style that originated in Puerto Rico during the late 1990s. It is influenced by hip hop and Latin American and Caribbean music. Vocals include rapping and singing, typically in Spanish.',
      color: 'green',
    },
    {
      id:'4',
      name: 'Metal',
      Description: 'Heavy metal is a genre of rock music that developed in the late 1960s and early 1970s, largely in the United Kingdom and the United States. With roots in blues rock, psychedelic rock, and acid rock, heavy metal bands developed a thick, massive sound, characterized by distortion, extended guitar solos, emphatic beats, and loudness.',
      color: 'orange',
    }
  ]
  return (
    <div>
      {genres.map(genres=>{
        return (
          <div key={genres.id} className="flex items-center justify-center rounded my-10 py-2 px-2 mainArtist" style={{boxShadow:`2px 2px 2px 1px ${genres.color}`}}>
            <div className="relative w-full">
              <div className="flex flex-col justify-center ml-6">
                <h3 className="mb-3 text-xl font-bold" style={{color:`${genres.color}`}}>{genres.name}</h3>
                <p className="font-extralight">{genres.Description}</p>
                <div className="flex mt-8 justify-evenly">
                  <Button variant="outlined" color="primary">Edit Genre</Button>
                  <Button variant="outlined" color="error">Delete Genre</Button>
                </div>
              </div>

            </div>

          </div>
        )
      })}
    </div>
  )
}