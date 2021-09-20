// index.tsx
import { useEffect, useState } from 'react';
import Head from 'next/head';
import type { GetStaticProps, NextPage } from 'next';
import { Grid } from '@material-ui/core';
import dynamic from 'next/dynamic';
import Header from 'components/Header';
import List from 'components/List';
import { getPlacesData } from '../api';

const MapWithNoSSR = dynamic(() => import('components/Map'), {
  ssr: false
});

export type Coordinates = {
  lat: number;
  lng: number;
};

export type Bounds = {
  ne: {
    lat: number;
    lng: number;
  };
  sw: {
    lat: number;
    lng: number;
  };
};

const Home: NextPage = () => {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState<Coordinates>({
    lat: 0,
    lng: 0
  });
  const [bounds, setBounds] = useState<Bounds>({
    ne: {
      lat: 0,
      lng: 0
    },
    sw: {
      lat: 0,
      lng: 0
    }
  });

  useEffect(() => {
    // -- getting current location of the user using the built in browser geolocation api
    navigator.geolocation.getCurrentPosition(
      ({ coords }: GeolocationPosition) => {
        const { latitude, longitude } = coords;
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    console.log(coordinates, bounds);
    getPlacesData(bounds.sw, bounds.ne).then((data) => {
      console.log('data', data);
      setPlaces(data);
    });
  }, [coordinates, bounds]);

  return (
    <>
      <Head>
        <title>Travel Companion ✈</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List places={places} />
        </Grid>
        <Grid item xs={12} md={8}>
          <MapWithNoSSR
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            places={places}
          />
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
