import {createService} from './CoreService';

interface VehicleResponse {
  name: string;
  manufacturer: string;
}

export const VehicleService = {
  getVehicle: createService<VehicleResponse>({
    url: 'vehicles/:id',
    method: 'get',
  }),
};
