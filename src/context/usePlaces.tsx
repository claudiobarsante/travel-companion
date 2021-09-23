import { getPlaceService } from 'api';
import { useContext, createContext, useState, useCallback } from 'react';

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

export const BOUNDS_INITIAL_STATE = {
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
  location_id: string;
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
  location_id: '',
  num_reviews: '0',
  phone: '',
  price_level: '',
  ranking: '',
  rating: '0',
  web_url: '',
  website: ''
};

type PlacesContextData = {
  bounds: Bounds;
  clickedThumbnailId: string;
  coordinates: Coordinates;
  isLoading: boolean;
  places: Place[];
  placeType: string;
  placeRating: number;
  getPlaces: (placeType: string, bounds: Bounds) => void;
  updateBounds: (bounds: Bounds) => void;
  updateClickedThumbnail: (thumbnailId: string) => void;
  updateCoordinates: (coordinates: Coordinates) => void;
  updatePlaceType: (type: string) => void;
  updatePlaceRating: (rating: number) => void;
};

const PlacesContext = createContext({} as PlacesContextData);

const PlacesProvider = ({ children }: PlacesProviderProps) => {
  const [boundsParms, setBoundsParms] = useState<Bounds>(BOUNDS_INITIAL_STATE);
  const [clickedThumbnailId, setClickedThumbnailId] = useState<string>('');
  const [coordinates, setCoordinates] = useState<Coordinates>(
    {} as Coordinates
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [places, setPlaces] = useState<Place[]>([PLACE_INITIAL_STATE]);
  const [placeType, setPlaceType] = useState<string>('restaurants');
  const [placeRating, setPlaceRating] = useState<number>(0);

  const updateCoordinates = (coordinates: Coordinates) => {
    setCoordinates({ lat: coordinates.lat, lng: coordinates.lng });
  };

  const updateBounds = useCallback((bounds: Bounds) => {
    // -- There's no need to update bounds if they are equal to the previous bound
    if (
      !Object.is(boundsParms, BOUNDS_INITIAL_STATE) &&
      Object.is(bounds, boundsParms)
    )
      return false;

    setBoundsParms({
      ne: {
        lat: bounds.ne.lat,
        lng: bounds.ne.lng
      },
      sw: {
        lat: bounds.sw.lat,
        lng: bounds.sw.lng
      }
    });
  }, []);

  const updateClickedThumbnail = (thumbnailId: string) => {
    setClickedThumbnailId(thumbnailId);
  };

  const updatePlaceType = (type: string) => {
    setPlaceType(type);
  };

  const updatePlaceRating = (rating: number) => {
    setPlaceRating(rating);
  };

  const getPlaces = async (placeType: string, bounds: Bounds) => {
    setIsLoading(true);
    const response: Place[] = await getPlaceService(placeType, bounds);
    setIsLoading(false);
    if (response) {
      setPlaces(response);
    }
  };

  return (
    <PlacesContext.Provider
      value={{
        bounds: boundsParms,
        clickedThumbnailId,
        coordinates,
        isLoading,
        places,
        placeType,
        placeRating,
        getPlaces,
        updateBounds,
        updateClickedThumbnail,
        updateCoordinates,
        updatePlaceType,
        updatePlaceRating
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};

const usePlaces = () => useContext(PlacesContext);

export { PlacesProvider, usePlaces };
