import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';

import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';

import { usePlaces } from 'context/usePlaces';
import type { Bounds, Coordinates } from 'context/usePlaces';
import { useCallback } from 'react';
import mapCustomStyles from './mapCustomStyles';

const Map = ({ weatherData }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');
  const {
    places,
    placeRating,
    coordinates,
    updateClickedThumbnail,
    updateCoordinates,
    updateBounds
  } = usePlaces();

  const handleUpdateBounds = useCallback((bounds: Bounds) => {
    updateBounds(bounds);
  }, []);

  const handleUpdateCoordinates = useCallback((coordinates: Coordinates) => {
    updateCoordinates(coordinates);
  }, []);

  /**
   * For every marker/thumbnail that is generated I used as key the location_id property
   * that already comes with the api. So it will be easier to identify the item on
   * the <List/> component and scroll the list to the corresponding item
   */
  const handleUpdateClickedThumbnail = useCallback((locationId: string) => {
    updateClickedThumbnail(locationId);
  }, []);

  // if (loadError) {
  //   return <div>Map cannot be loaded right now, sorry.</div>;
  // }

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapCustomStyles
        }}
        onChange={(e: GoogleMapReact.ChangeEventValue) => {
          handleUpdateCoordinates({ lat: e.center.lat, lng: e.center.lng });
          handleUpdateBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => handleUpdateClickedThumbnail(child)}
      >
        {places?.map((place) => {
          const lat = place.latitude ? Number(place.latitude) : 0;
          const lng = place.longitude ? Number(place.longitude) : 0;

          if (Number(place.rating) > placeRating) {
            return (
              <div
                key={place.location_id}
                className={classes.markerContainer}
                data-lat={lat}
                data-lng={lng}
              >
                {!isDesktop ? (
                  <LocationOnOutlinedIcon color="primary" fontSize="large" />
                ) : (
                  <Paper elevation={3} className={classes.paper}>
                    <Typography variant="subtitle2" gutterBottom>
                      {place.name}
                    </Typography>
                    <img
                      className={classes.pointer}
                      src={
                        place.photo
                          ? place.photo.images.large.url
                          : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
                      }
                    />
                    <Rating
                      name="read-only"
                      size="small"
                      value={Number(place.rating)}
                      readOnly
                    />
                  </Paper>
                )}
              </div>
            );
          }
        })}
        {weatherData?.list?.length &&
          weatherData.list.map((data, i) => (
            <div key={i} data-lat={data.coord.lat} data-lng={data.coord.lon}>
              <img
                src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                height="100px"
              />
            </div>
          ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
