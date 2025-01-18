'use client'
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import "@/app/css/ArtistComponent.css";
import useSWR from "swr";
import { useState } from "react";
import { getArtists } from "@/app/actions/getApiRequests";
import ArtistList from "./ArtistList";

export interface Artist {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export default function ArtistListComponent() {
  const [error, setError] = useState(false);

  // La función de obtención de datos para useSWR
  const fetchArtist = async () => {
    try {
      const { initialArtists } = await getArtists(0, 10);
      return initialArtists;
    } catch (err) {
      setError(true);
      throw err;
    }
  };

  // Llamada a useSWR con una clave y la función de obtención de datos
  const { data, error: swrError, isLoading } = useSWR("artists", fetchArtist);

  // Manejo de errores de SWR
  if (swrError) {
    console.log(error);
    setError(true);
  }

  return (
    <div className="flex flex-col items-center pt-3">
      {isLoading ? (
        <CircularProgress color="info" />
      ) : (
        <ArtistList props={{ initialArtists: data }} />
      )}

      <Snackbar open={error} onClose={() => setError(false)}>
        <Alert severity="error">Error loading artists</Alert>
      </Snackbar>
    </div>
  );
}