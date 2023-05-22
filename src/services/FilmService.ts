import {createService} from './CoreService';

interface FilmResponse {
  title: string;
  opening_crawl: string;
}

export const FilmService = {
  getFilm: createService<FilmResponse>({
    url: 'films/:id',
    method: 'get',
  }),
};
