
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';
import useSWR from 'swr';
import { apiURL } from '@/app/lib/definitions';
import { getMinArtists } from '@/app/actions/getApiRequests';
import { useDebouncedCallback } from 'use-debounce';
import { Alert, Avatar, Snackbar } from '@mui/material';

interface ArtistValues {
  Id: string;
  Name: string;
  PictureUrl:string;
}

interface ArtistMenuProps{
  artist: string[];
  setArtist: (artist: string[]) => void;
  multiple?: boolean;
}

export default function ArtistSelectMenu({props}:{props:ArtistMenuProps}) {
  const [input, setInput] = useState('');
  const {data, error, mutate} = useSWR(input ?`${apiURL}/getMinimalArtists/artist?name=${input}`
    :`${apiURL}/getMinimalArtists/artist`, getMinArtists)
    

  const debounce = useDebouncedCallback((input:string)=>{
    setInput(input)
    mutate()

  }, 400)

    const handleChange = (value:string|undefined) => {
      if(!value) return
      console.log(value);
      props.setArtist(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };

  const artists = data?.data ?? [{Id:"0", Name:"No artists found"}]
  return (
    <div style={{width:"70%"}}>
      <Autocomplete
        id="country-select-demo"
        sx={{ width: '100%' }}
        multiple={props.multiple}
        options={artists}
        autoHighlight
        onChange={(e, value) => {
          if (Array.isArray(value)) {
            handleChange(value.map(v => v.Id).join(','));
          } else {
            handleChange(value?.Id);
          }
        }}
        getOptionKey={(option:ArtistValues) => option.Id}
        getOptionLabel={(option:ArtistValues) => option.Name}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <Box
              key={key}
              component="li"
              sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
              {...optionProps}
            >
              <Avatar
                sx={{ width: 24, height: 24, mr: 1 }}
                src={option.PictureUrl}
              />
              {option.Name}
            </Box>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            value={input}
            onChange={(e)=>debounce(e.target.value)}
            label="Choose an artist"
            slotProps={{
              htmlInput: {
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              },
            }}
          />
        )}
      />


        {
          error &&  <Snackbar open={true} autoHideDuration={4000}>
          <Alert severity="error">{"There was an error while fetching the artists data"}</Alert>
        </Snackbar>
        }
       
    
    

    </div>
  );
}
