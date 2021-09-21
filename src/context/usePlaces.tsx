import { getPlaceService } from 'api';
import { useContext, createContext, useState } from 'react';

type PlacesProviderProps = {
  children: React.ReactNode;
};

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

const BOUNDS_INITIAL_STATE = {
  ne: {
    lat: 0,
    lng: 0
  },
  sw: {
    lat: 0,
    lng: 0
  }
};

type Award = {
  images: {
    small: string;
  };
  display_name: string;
};

type Cuisine = {
  key: string;
  name: string;
};

export type Place = {
  name: string;
  address: string;
  awards: Award[];
  cuisine: Cuisine[];
  photo: {
    images: {
      large: {
        url: string;
      };
    };
  };
  latitude: string;
  longitude: string;
  num_reviews: string;
  phone: string;
  price_level: string;
  ranking: string;
  rating: string;
  web_url: string;
  website: string;
};

const PLACE_INITIAL_STATE = {
  name: '',
  address: '',
  awards: [
    {
      images: {
        small: ''
      },
      display_name: ''
    }
  ],
  cuisine: [
    {
      key: '',
      name: ''
    }
  ],
  photo: {
    images: {
      large: {
        url: ''
      }
    }
  },
  latitude: '0',
  longitude: '0',
  num_reviews: '0',
  phone: '',
  price_level: '',
  ranking: '',
  rating: '0',
  web_url: '',
  website: ''
};

type PlacesContextData = {
  places: Place[];
  coordinates: Coordinates;
  bounds: Bounds;
  updateCoordinates: (coordinates: Coordinates) => void;
  updateBounds: (bounds: Bounds) => void;
  getPlaces: (bounds: Bounds) => void;
};

const PlacesContext = createContext({} as PlacesContextData);

const PlacesProvider = ({ children }: PlacesProviderProps) => {
  const [places, setPlaces] = useState<Place[]>([PLACE_INITIAL_STATE]);
  const [coordinates, setCoordinates] = useState<Coordinates>(
    {} as Coordinates
  );
  const [bounds, setBounds] = useState<Bounds>(BOUNDS_INITIAL_STATE);

  const updateCoordinates = (coordinates: Coordinates) => {
    setCoordinates({ lat: coordinates.lat, lng: coordinates.lng });
  };

  const updateBounds = (bounds: Bounds) => {
    setBounds({
      ne: {
        lat: bounds.ne.lat,
        lng: bounds.ne.lng
      },
      sw: {
        lat: bounds.sw.lat,
        lng: bounds.sw.lng
      }
    });
  };

  const getPlaces = async (bounds: Bounds) => {
    const response: Place[] = await getPlaceService(bounds);
    if (response) {
      setPlaces(response);
    }
  };

  console.log('bounds', bounds);
  console.log('coordinates', coordinates);

  return (
    <PlacesContext.Provider
      value={{
        places,
        coordinates,
        bounds,
        updateCoordinates,
        updateBounds,
        getPlaces
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};

const usePlaces = () => useContext(PlacesContext);

export { PlacesProvider, usePlaces };
