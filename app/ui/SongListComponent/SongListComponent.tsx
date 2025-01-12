
import { Button } from "@mui/material"
import '@/app/css/ArtistComponent.css'
import Image from "next/image"

export default function AlbumListComponent(){
  const songs = [
    {
      id:'1',
      name: 'Abbey Road',
      Description: 'Abbey Road is the eleventh studio album by the English rock band the Beatles, released on 26 September 1969 by Apple Records. The recording sessions for the album were the last in which all four Beatles participated. Although Let It Be was the final album that the Beatles completed before the band\'s dissolution in April 1970, most of the album had been recorded before the Abbey Road sessions began.',
      pictureUrl: 'https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25',
      Artist: 'The Beatles',
      ReleaseDate: '26 September 1969',
      Genre: 'Rock'
    },
    {
      id:'2',
      name: 'Thriller',
      Description: 'Thriller is the sixth studio album by American singer Michael Jackson, released on November 30, 1982, by Epic Records. Reunited with Off the Wall producer Quincy Jones, Jackson was inspired to create an album where "every song was a killer". With the ongoing backlash against disco, Jackson moved in a new musical direction, incorporating pop, post-disco, rock, funk, and R&B into Thriller.',
      pictureUrl: 'https://i.scdn.co/image/ab67616d0000b273de437d960dda1ac0a3586d97',
      Artist: 'Michael Jackson',
      ReleaseDate: '30 November 1982',
      Genre: 'Pop'
    },
    {
      id:'3',
      name: 'The Dark Side of the Moon',
      Description: 'The Dark Side of the Moon is the eighth studio album by the English rock band Pink Floyd, released on 1 March 1973 by Harvest Records. Primarily developed during live performances, the band premiered an early version of the record several months before recording began. New material was recorded in two sessions in 1972 and 1973 at Abbey Road Studios in London.',
      pictureUrl: 'https://ressources.sat.qc.ca/uploads/2023/07/pinkfloyd_web_banner.png',
      Artist: 'Pink Floyd',
      ReleaseDate: '1 March 1973',
      Genre: 'Rock'
    },
    {
      id:'4',
      name: 'Back in Black',
      Description: 'Back in Black is the seventh studio album by Australian rock band AC/DC. It was released on 25 July 1980 by Albert Productions and Atlantic Records. It is the band\'s first album to feature lead singer Brian Johnson, following the death of previous lead singer Bon Scott.',
      pictureUrl: 'https://www.mmx.com.ar/wp-content/uploads/2023/09/723eae6b75785b9581f7da47ddfdcc29.jpg',
      Artist: 'AC/DC',
      ReleaseDate: '25 July 1980',
      Genre: 'Rock'
    }
  ]
  return (
    <div>
      {songs.map(albums=>{
        return (
           <div key={albums.id} className="flex items-center justify-center my-10 py-2 px-2 mainArtist">
            <div className="pb-4">
              <Image src={albums.pictureUrl} alt={albums.name} width={300} height={300} />
            </div>
            <div className="relative w-full">
              <div className="flex flex-col justify-center ml-6">
                <h3 className="mb-3 text-xl font-bold">{albums.name}</h3>
                <p className="font-normal">{albums.Artist}</p>
                <p className="font-normal">{albums.ReleaseDate}</p>
                <p className="font-normal">{albums.Genre}</p>
                <p className="font-medium">{albums.Description}</p>
                <div className="flex mt-8 justify-evenly">
                  <Button variant="outlined" color="primary">Edit Song</Button>
                  <Button variant="outlined" color="error">Delete Song</Button>
                </div>
              </div>
            </div>

          </div>
        )
      })}
    </div>
  )
}