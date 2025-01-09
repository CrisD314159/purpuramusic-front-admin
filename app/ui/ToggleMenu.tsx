
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import AlbumIcon from '@mui/icons-material/Album';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import { useState } from 'react';

export default function ToggleMenu() {
  const [value, setValue] = useState(0);

  return (
    <Box sx={{ width: 400}}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{borderRadius:50, border: '1px solid #7c07ab', background:'transparent', boxShadow: '0px 0px 10px 7px #2f0c3d', zIndex: 1000}}
      >
        <BottomNavigationAction label="Artists" icon={<InterpreterModeIcon />} />
        <BottomNavigationAction label="Genres" icon={<CollectionsBookmarkIcon />} />
        <BottomNavigationAction label="Albums" icon={<AlbumIcon />} />
        <BottomNavigationAction label="Songs" icon={<AudiotrackIcon />} />
      </BottomNavigation>
    </Box>
  );
}