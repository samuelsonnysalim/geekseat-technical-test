import {createService} from './CoreService';

interface SpeciesResponse {
  name: string;
  classification: string;
}

export const SpeciesService = {
  getSpecies: createService<SpeciesResponse>({
    url: 'species/:id',
    method: 'get',
  }),
};
