'use client'
import { getArtistById } from '@/app/actions/getApiRequests';
import { Avatar } from '@mui/material';
import {useState } from 'react';
import useSWR from 'swr';

interface DeleteDialogProps {
  setArtist: (artist: string[]) => void;
  buttonText:string;
  title: string;
  artists:string[];
  multiple?: boolean;

}

interface ArtistValues {
  Id: string;
  Name: string;
  PictureUrl:string;
}

export default function ArtistEditDialog({props}:{props:DeleteDialogProps}) {
  const [artist, setArtist] = useState<ArtistValues[]>([])



  const fetcher = async () => {
    if(props.multiple && props.artists.length > 1){
      props.artists.forEach(async (artistId)=>{
        const artist = await getArtistById(artistId)
        setArtist(artists => [...artists, {Id:artistId, Name:artist.name, PictureUrl:artist.imageUrl}])
        console.log(artist);
      })
    }else if (props.artists.length === 1){
        const artistId = props.artists[0]
        const artist = await getArtistById(artistId)
        setArtist([{Id:artistId, Name:artist.name, PictureUrl:artist.imageUrl}])
        console.log(artist);
    }
  }
  const {isLoading} = useSWR("artist", fetcher, {revalidateOnFocus:false})
  

  return (
<div className="flex flex-col items-center w-80 mt-4">
  {isLoading ? (
    <p className="text-purple-500">Loading...</p>
  ) : (
    artist.map((artist, index) => (
      <div
        key={index}
        className="flex flex-col items-center w-full mb-6 p-5 border border-purple-500 rounded-lg shadow-lg bg-gradient-to-br from-purple-700 via-purple-900 to-black text-white"
      >
        <div className="flex flex-row items-center w-full mb-3">
          <Avatar alt={artist.Name} src={artist.PictureUrl} sx={{ width: 60, height: 60 }} />
          <p className="ml-4 text-xl font-bold">{artist.Name}</p>
        </div>
        <div className="w-full h-1 mt-4 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      </div>
    ))
  )}
</div>
  );
}
