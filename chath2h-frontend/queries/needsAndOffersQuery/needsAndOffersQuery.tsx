import axios from 'axios';
import { AgeValue, MyNeedsAndOffers, needOfferLink } from 'globalTypes';

export const getMyNeedsAndOffers = async (): Promise<MyNeedsAndOffers | null> => {
  try {
    const response = await axios.get('http://localhost:3001/api/users/my-needs-and-offers');
    console.log('Fetched Needs and Offers:', response.data); // Debugging
    return response.data;
  } catch (error) {
    console.error('Error while getting needs and offers data:', error);
    return null;
  }
};

export const getFilteredNeedsOrOffer = async (
  isNeed: boolean,
  limit: number,
  sort?: string | number,
  category?: string | number,
  language?: string | number,
  gender?: string | number,
  age?: AgeValue,
  page?: number,
  id?: string
): Promise<any> => {
  try {
    const newFilters = {
      ['area.name']: category,
      ['user.language']: language,
      ['user.gender']: gender,
      ['user.age']: age,
      ['_id']: id,
    };

    const sortBy = sort ? JSON.stringify({ createdAt: sort }) : '';
    const finalUrl = `/${
      isNeed ? needOfferLink.NEEDS : needOfferLink.OFFERS
    }?limit=${limit}&page=${page}&sortBy=${sortBy}&filterBy=${JSON.stringify(newFilters)}`;

    console.log('API URL:', finalUrl); // Debugging
    const response = await axios.get(finalUrl);

    console.log('Filtered Needs or Offers:', response.data); // Debugging
    return response.data;
  } catch (error) {
    console.error(`Error while getting ${isNeed ? 'Needs' : 'Offers'} data:`, error);
    return null;
  }
};

export const removeNeedOrOffer = async (offerId: string, isNeed: boolean): Promise<any> => {
  const temporaryUrl = isNeed ? 'needs' : '/coach-offer';
  try {
    const response = await axios.delete(`${temporaryUrl}/${offerId}`);
    console.log('Deleted Successfully:', response.data); // Debugging
    return response.data;
  } catch (error) {
    console.error('Error while deleting offer data:', error);
    return null;
  }
};
