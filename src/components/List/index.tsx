import React, { useState } from 'react';
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@material-ui/core';

import PlaceDetails from '../PlaceDetails';

import useStyles from './styles';
import type { Place } from 'context/usePlaces';

type Props = {
  places: Place[];
};
const List = ({ places }: Props) => {
  const [type, setType] = useState<string>('restaurants');
  const [rating, setRating] = useState<number>(0);

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Restaurants, Hotels & Attractions around you
      </Typography>
      <FormControl className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select
          value={type}
          onChange={(e: React.ChangeEvent<{ value: unknown }>) =>
            setType(e.target.value as string)
          }
        >
          <MenuItem value="restaurants">Restaurants</MenuItem>
          <MenuItem value="hotels">Hotels</MenuItem>
          <MenuItem value="attractions">Attractions</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Rating</InputLabel>
        <Select
          value={rating}
          onChange={(e: React.ChangeEvent<{ value: unknown }>) =>
            setRating(e.target.value as number)
          }
        >
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={3}>Above 3.0</MenuItem>
          <MenuItem value={4}>Above 4.0</MenuItem>
          <MenuItem value={4.5}>Above 4.5</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3} className={classes.list}>
        {places?.map((place, index) =>
          place.name ? (
            <Grid item key={index} xs={12}>
              <PlaceDetails place={place} />
            </Grid>
          ) : null
        )}
      </Grid>
    </div>
  );
};

export default List;
