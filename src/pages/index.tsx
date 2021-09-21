// index.tsx
import { useEffect, useState } from 'react';
import Head from 'next/head';
import type { GetStaticProps, NextPage } from 'next';
import { Grid } from '@material-ui/core';
import dynamic from 'next/dynamic';
import Header from 'components/Header';
import List from 'components/List';
import { getPlaceService } from '../api';
import { usePlaces } from 'context/usePlaces';

const MapWithNoSSR = dynamic(() => import('components/Map'), {
  ssr: false
});

const Home: NextPage = () => {
  const { bounds, coordinates, places, updateCoordinates, getPlaces } =
    usePlaces();

  useEffect(() => {
    // -- getting current location of the user using the built in browser geolocation api
    navigator.geolocation.getCurrentPosition(
      ({ coords }: GeolocationPosition) => {
        const { latitude, longitude } = coords;
        updateCoordinates({ lat: latitude, lng: longitude });
      }
    );
    getPlaces(bounds);
  }, []);

  // useEffect(() => {
  //   console.log(coordinates, bounds);
  //   getPlaceService(bounds.sw, bounds.ne).then((data) => {
  //     console.log('data', data);
  //     setPlaces(data);
  //   });
  // }, [coordinates, bounds]);

  return (
    <>
      <Head>
        <title>Travel Companion ✈</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          {/* <List places={places} /> */}
        </Grid>
        <Grid item xs={12} md={8}>
          <MapWithNoSSR />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;

// export const getStaticProps: GetStaticProps = async () => {
//   const data = await getPlacesData();
//   console.log('data: ' + JSON.stringify(data));
//   return {
//     props: { data }
//   };
// };
