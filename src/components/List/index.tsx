import React, { useEffect, useState } from 'react';
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
import { usePlaces } from 'context/usePlaces';

type Props = {
  places: Place[];
};
const List = ({ places }: Props) => {
  const {
    clickedThumbnailId,
    isLoading,
    placeType,
    placeRating,
    updatePlaceRating,
    updatePlaceType
  } = usePlaces();

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Restaurants, Hotels & Attractions around you
      </Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select
              value={placeType}
              onChange={(e: React.ChangeEvent<{ value: unknown }>) =>
                updatePlaceType(e.target.value as string)
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
              value={placeRating}
              onChange={(e: React.ChangeEvent<{ value: unknown }>) =>
                updatePlaceRating(e.target.value as number)
              }
            >
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {places?.map((place) =>
              place.name ? (
                <Grid item key={place.location_id} xs={12}>
                  <PlaceDetails
                    place={place}
                    selected={clickedThumbnailId === place.location_id}
                    refProp={place.location_id}
                  />
                </Grid>
              ) : null
            )}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
