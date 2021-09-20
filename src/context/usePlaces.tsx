import { useContext, createContext } from 'react';

type PlacesProviderProps = {
  children: React.ReactNode;
};

const PlacesContext = createContext({});

const PlacesProvider = ({ children }: PlacesProviderProps) => {
  return <PlacesContext.Provider value={}>{children}</PlacesContext.Provider>;
};

const usePlaces = () => useContext(PlacesContext);

export { PlacesProvider, usePlaces };
