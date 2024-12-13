import axios from 'axios';
import { AdsLocationType } from 'globalTypes';

const baseURL = 'http://localhost:3001/api/advertisement';

export const getAds = async (type?: AdsLocationType) => {
  try {
    const response = await axios.get(baseURL + (type ? `?type=${type}` : ''));
    return response.data.map((ad: any) => ({
      ...ad,
      redirectPath: ad.redirectPath?.startsWith('https://') || ad.redirectPath?.startsWith('http://') ? ad.redirectPath : `https://${ad.redirectPath}`,
    }));
  } catch (error) {
    console.log('Error while getting ads data');
    return null;
  }
};

export const getAdminAds = async () => {
  try {
    const response = await axios.get(`${baseURL}/admin`);
    return response.data;
  } catch (error) {
    console.log('Error while getting admin ads data');
    return null;
  }
};
