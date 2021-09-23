// index.tsx
import { useEffect, useState } from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';
import { Grid } from '@material-ui/core';
import dynamic from 'next/dynamic';
import { Header } from 'components/Header';
import List from 'components/List';
import { usePlaces } from 'context/usePlaces';
import { getWeatherService } from 'api';
import Script from 'next/script';

const MapWithNoSSR = dynamic(() => import('components/Map'), {
  ssr: false
});

const KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const URL = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${KEY}`;

const Home: NextPage = () => {
  const [weatherData, setWeatherData] = useState([]);
  const { bounds, coordinates, updateCoordinates, getPlaces, placeType } =
    usePlaces();

  useEffect(() => {
    // -- getting current location of the user using the built in browser geolocation api
    navigator.geolocation.getCurrentPosition(
      ({ coords }: GeolocationPosition) => {
        const { latitude, longitude } = coords;
        updateCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    if (bounds.ne && bounds.sw) {
      getWeatherService({ lat: coordinates.lat, lng: coordinates.lng }).then(
        (data) => setWeatherData(data)
      );

      getPlaces(placeType, bounds);
    }
  }, [placeType, bounds]);

  return (
    <>
      <Script src={URL} strategy="beforeInteractive" />
      <Head>
        <title>Travel Companion ✈</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List />
        </Grid>
        <Grid item xs={12} md={8}>
          <MapWithNoSSR weatherData={weatherData} />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
