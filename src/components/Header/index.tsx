import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/search';
import { Autocomplete } from '@react-google-maps/api';
import useStyles from './styles';
import { CollectionsOutlined } from '@material-ui/icons';
import React, { useState } from 'react';
import { usePlaces } from 'context/usePlaces';

const Header = () => {
  const [autocomplete, setAutocomplete] = useState(null);

  const { updateCoordinates } = usePlaces();

  const handleOnLoad = (autoC: any) => {
    setAutocomplete(autoC);
  };

  const handleOnPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    updateCoordinates({ lat, lng });
  };
  const classes = useStyles();
  console.log('renderizei o header');
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          Travel Companion
        </Typography>
        <Box display="flex">
          <Typography variant="h6" className={classes.title}>
            Explore new places
          </Typography>
          {/* <Autocomplete
            onLoad={handleOnLoad}
            onPlaceChanged={handleOnPlaceChanged}
          > */}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search..."
              classes={{ root: classes.inputRoot, input: classes.inputInput }}
            />
          </div>
          {/* </Autocomplete> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(Header);
