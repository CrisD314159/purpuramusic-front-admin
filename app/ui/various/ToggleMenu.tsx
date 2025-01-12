
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import AlbumIcon from '@mui/icons-material/Album';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';

interface ToggleMenuProps {
  value: number,
  setValue: (value:number) => void
}


export default function ToggleMenu({props}:{props:ToggleMenuProps}) {

  return (
    <Box sx={{ width: 350}}>
      <BottomNavigation
        showLabels
        value={props.value}
        onChange={(event, newValue) => {
          props.setValue(newValue);
        }}
        sx={{borderRadius:50, border: '1px solid #7c07ab', background:'#000', boxShadow: '0px 0px 10px 7px #2f0c3d', zIndex: 1000, position: 'relative', top:10}}
      >
        <BottomNavigationAction label="Artists" icon={<InterpreterModeIcon />} />
        <BottomNavigationAction label="Genres" icon={<CollectionsBookmarkIcon />} />
        <BottomNavigationAction label="Albums" icon={<AlbumIcon />} />
        <BottomNavigationAction label="Songs" icon={<AudiotrackIcon />} />
      </BottomNavigation>
    </Box>
  );
}