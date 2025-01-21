import { getMinGenres } from "@/app/actions/getApiRequests";
import { apiURL } from "@/app/lib/definitions";
import {  FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import useSWR from "swr";


interface GenreValues{
  Id:string,
  Name:string
}

interface GenreProps{
  genre: string[],
  setGenre: (genre:string[])=>void,
  multiple?: boolean
}


export default function GenreSelectMenu({props}:{props:GenreProps}){
  const {data, error, isLoading} = useSWR(`${apiURL}/getMinGenres`, getMinGenres) // swr hook to fetch data from the api, syntaxis (url, fetcher function, options)


  const handleChange = (event: SelectChangeEvent<typeof props.genre>) => {
    const {
      target: { value },
    } = event;
    props.setGenre(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  const genres = data?.data ?? [{Id:"0", Name:"No genres found"}] // if data is not loaded, set genres to an empty array

  return(
    <FormControl sx={{width:"100%", margin:'20px 0px'}}>
      <InputLabel id="artistInputLabel">Genre</InputLabel>
      <Select labelId="artistInputLabel" value={props.genre} label="Artist" variant="outlined" multiple={props.multiple}
      onChange={handleChange}
      >
        {error ? <MenuItem disabled>Error loading data</MenuItem>:
        isLoading ? <MenuItem disabled>Loading...</MenuItem> : 
        genres.map((genre:GenreValues)=>{
          return <MenuItem key={genre.Id} value={genre.Id}>{genre.Name}</MenuItem>
        })

        }
      </Select>
    </FormControl>
  )
}