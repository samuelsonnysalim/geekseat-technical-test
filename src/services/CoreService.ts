import axios, {Method} from 'axios';

axios.defaults.baseURL = 'https://swapi.dev/api/';

interface ServiceOptions {
  url?: string;
  method?: Method | string;
}

interface RequestOptions {
  params: Record<string, any>;
}

type Service<T> = (options?: Partial<RequestOptions>) => Promise<T>;

export function createService<T = any>(options: ServiceOptions): Service<T> {
  return async (request?: Partial<RequestOptions>) =>
    (await axios.request<T>({...options, ...(request || {})})).data;
}
