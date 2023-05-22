import {createService} from './CoreService';

interface StarshipResponse {
  name: string;
  manufacturer: string;
}

export const StarshipService = {
  getStarship: createService<StarshipResponse>({
    url: 'starships/:id',
    method: 'get',
  }),
};
