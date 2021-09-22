import axios from 'axios';
import type { Bounds, Coordinates, Place } from 'context/usePlaces';

const TRAVEL_ADVISOR_API_HOST = String(
  process.env.NEXT_PUBLIC_TRAVEL_ADVISOR_API_HOST
);
const TRAVEL_ADVISOR_API_KEY = String(
  process.env.NEXT_PUBLIC_TRAVEL_ADVISOR_API_KEY
);

export const getPlaceService = async (placeType: string, bounds: Bounds) => {
  const URL = `https://travel-advisor.p.rapidapi.com/${placeType}/list-in-boundary`;

  const { sw, ne } = bounds;

  const options = {
    params: {
      bl_latitude: sw.lat,
      tr_latitude: ne.lat,
      bl_longitude: sw.lng,
      tr_longitude: ne.lng
    },
    headers: {
      'x-rapidapi-host': TRAVEL_ADVISOR_API_HOST,
      'x-rapidapi-key': TRAVEL_ADVISOR_API_KEY
    }
  };

  try {
    const {
      data: { data }
    } = await axios.get(URL, options);
    return data as Place[];
  } catch (error) {
    console.log('error');
  }
};

export const getWeatherService = async ({ lat, lng }: Coordinates) => {
  // --
  const URL = 'https://community-open-weather-map.p.rapidapi.com/find';

  const options = {
    params: { lat, lon: lng },
    headers: {
      'x-rapidapi-key': process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY,
      'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
    }
  };

  try {
    if (lat && lng) {
      const { data } = await axios.get(URL, options);

      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
