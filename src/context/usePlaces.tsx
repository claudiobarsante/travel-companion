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

type Award = {
  smallImageUrl: string;
  displayName: string;
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
  imageLargeUrl: string;
  latitude: string;
  longitude: string;
  numReviews: number;
  phone: string;
  priceLevel: string;
  ranking: string;
  rating: number;
  tripAdvisorUrl: string;
  website: string;
};

const PLACE_INITIAL_STATE = {
  name: '',
  address: '',
  awards: [{ smallImageUrl: '', displayName: '' }],
  cuisine: [{ key: '', name: '' }],
  imageLargeUrl: '',
  latitude: '0',
  longitude: '0',
  numReviews: 0,
  phone: '',
  priceLevel: '',
  ranking: '',
  rating: 0,
  tripAdvisorUrl: '',
  website: ''
};

type PlacesContextData = {
  places: Place[];
  coordinates: Coordinates;
  bounds: Bounds;
  updateCoordinates: (coordinates: Coordinates) => void;
  updateBounds: (bounds: Bounds) => void;
};

const PlacesContext = createContext({} as PlacesContextData);

const PlacesProvider = ({ children }: PlacesProviderProps) => {
  const [places, setPlaces] = useState<Place[]>([PLACE_INITIAL_STATE]);
  const [coordinates, setCoordinates] = useState<Coordinates>(
    {} as Coordinates
  );
  const [bounds, setBounds] = useState<Bounds>({} as Bounds);

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

  return (
    <PlacesContext.Provider
      value={{ places, coordinates, bounds, updateCoordinates, updateBounds }}
    >
      {children}
    </PlacesContext.Provider>
  );
};

const usePlaces = () => useContext(PlacesContext);

export { PlacesProvider, usePlaces };
