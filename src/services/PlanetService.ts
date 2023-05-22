import {createService} from './CoreService';

interface PlanetResponse {
  name: string;
}

export const PlanetService = {
  getPlanet: createService<PlanetResponse>({
    url: 'planets/:id',
    method: 'get',
  }),
};
