import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Song } from '../SongListComponent/SongListComponent';
import AddSongDialog from '../Dialogs/AddSongDialog';
interface AlbumSongListAccordionProps{
  songs : Song[],
  artistId:string
  albumId:string,
  genreId:string

}


export default function AlbumSongListAccordion({props}:{props:AlbumSongListAccordionProps}) {
  return (
    <div style={{marginTop: '20px'}}>
      <Accordion sx={{backgroundColor: 'black'}}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">Show Album Songs</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className='flex flex-col items-center justify-center'>
            {props.songs.length >0 ? 
            props.songs.map((song:Song)=>{
              return(
                <div key={song.id} className='flex flex-row items-center justify-between w-full p-2'>
                  <p>{song.name}</p>
                  <p>{`${Math.floor(song.duration/60)}: ${song.duration %60 < 10 ? 0 :'' }${song.duration%60}`}</p>

                </div>
              )
            }) 
            : <Typography>No songs in this album</Typography> 
          }
            <AddSongDialog props={{albumid:props.albumId, defaultArtist:props.artistId, defaultGenre:props.genreId}}/> 
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
