'use client'

import { useState } from "react";
import ToggleMenu from "../ui/various/ToggleMenu"
import dynamic from "next/dynamic";
import '@/app/css/ContentContainer.css'

const ArtistComponent = dynamic(()=> import("../ui/ArtistListComponent/ArtistListComponent"))
const GenreComponent = dynamic(()=> import("../ui/GenreListComponent/GenreListComponent"))
const SongComponent = dynamic(()=> import("../ui/SongListComponent/SongListComponent"))
const AlbumComponent = dynamic(()=> import("../ui/AlbumListComponent/AlbumListComponent"))


export default function DashboardPage(){
  const [value, setValue] = useState(0);
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="toolContainer">
        <div className="typeToggleMenu pt-10 flex items-center justify-center">
          <ToggleMenu props={{ value, setValue }} />
        </div>
      </div>
      <div className="contentContainer">
        <div>
          {value == 0 && <ArtistComponent/>}
          {value == 1 && <GenreComponent/>}
          {value == 2 && <AlbumComponent/>}
          {value == 3 && <SongComponent/>}
        </div>
      </div>
    </div>
  )
}