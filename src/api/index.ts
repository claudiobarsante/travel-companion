import axios from 'axios';

const URL =
  'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

const RAPID_API_HOST = String(process.env.NEXT_PUBLIC_RAPID_API_HOST);
const RAPID_API_KEY = String(process.env.NEXT_PUBLIC_RAPID_API_KEY);

export const getPlacesData = async (sw, ne) => {
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
    return data;
  } catch (error) {
    console.log('error');
  }
};
