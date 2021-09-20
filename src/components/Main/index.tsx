import { Grid } from '@material-ui/core';
import dynamic from 'next/dynamic';
import List from '../List';

import Header from '../Header';

const MapWithNoSSR = dynamic(() => import('../Map'), {
  ssr: false
});

const Main = () => {
  return (
    <>
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List />
        </Grid>
        <Grid item xs={12} md={8}>
          <MapWithNoSSR />
        </Grid>
      </Grid>
    </>
  );
};

export default Main;
