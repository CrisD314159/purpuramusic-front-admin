'use client'
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import AlbumIcon from '@mui/icons-material/Album';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import { useRouter } from "next/navigation";

export default function CreationSpeedDial(){
  const router = useRouter()
  const items = [
    {icon: <PersonAddIcon/>, name: "Create Artist", link: "/dashboard/create/artists"},
    {icon: <CollectionsBookmarkIcon/>, name: "Create Genre", link: "/dashboard/create/genres"},
    {icon: <AlbumIcon/>, name: "Create Album", link: "/dashboard/create/albums"},
    {icon: <LibraryMusicIcon/>, name: "Create Song", link: "/dashboard/create/songs"}
  ]


  return (
    <Box sx={{ position: 'absolute', bottom: 20, right: 20, zIndex: 1000 }}>
       <SpeedDial
       
        ariaLabel="Item creation speed dial" direction="up"
        icon={<SpeedDialIcon/>}
        color="secondary"
        >
          {items.map((item, index)=>{
          return (
            <SpeedDialAction
              title={item.name}
              key={index}
              icon={item.icon}
              tooltipTitle={item.name}
              onClick={()=>router?.push(item.link)}/>
              )
          })}
      
      </SpeedDial>
    </Box>
  )
}