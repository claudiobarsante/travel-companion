import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';

import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';
import { Coordinates } from 'pages';

const KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

const Map = ({ setCoordinates, setBounds, coordinates, places }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: String(KEY) }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        onChange={(e) => {
          console.log('e', e);
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={() => {}}
      >
        {places?.map((place, i) => {
          const lat = place.latitude ? Number(place.latitude) : 0;
          const lng = place.longitude ? Number(place.longitude) : 0;
          return (
            <div
              key={i}
              className={classes.markerContainer}
              lat={lat}
              lng={lng}
            >
              {!isDesktop ? (
                <LocationOnOutlinedIcon color="primary" fontSize="large" />
              ) : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography
                    className={classes.typography}
                    variant="subtitle2"
                    gutterBottom
                  >
                    {' '}
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
        })}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
