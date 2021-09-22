import axios from 'axios';
import type { Bounds, Place } from 'context/usePlaces';

const RAPID_API_HOST = String(process.env.NEXT_PUBLIC_RAPID_API_HOST);
const RAPID_API_KEY = String(process.env.NEXT_PUBLIC_RAPID_API_KEY);

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
      'x-rapidapi-host': RAPID_API_HOST,
      'x-rapidapi-key': RAPID_API_KEY
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
