import {createService} from './CoreService';

interface PeopleResponse {
  name: string;
  height: number;
  mass: number;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

interface PeoplePaginationResponse {
  count: number;
  next?: string;
  previous?: string;
  results: PeopleResponse[];
}

export const PeopleService = {
  paginatePeople: createService<PeoplePaginationResponse>({
    url: 'people',
    method: 'get',
  }),
  getPeople: createService<PeopleResponse>({
    url: 'people/:id',
    method: 'get',
  }),
};
