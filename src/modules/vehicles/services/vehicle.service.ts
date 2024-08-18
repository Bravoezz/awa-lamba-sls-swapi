import KEYS from '../../shared/IoC/Keys';
import { injectable, inject } from 'tsyringe';
import { IVehicleService, IVehicleRepository } from '../contracts/vehicle.contracts';
import { IVehicle } from '../models/vehicle.model';

@injectable()
export class VehicleService implements IVehicleService
{
    constructor(@inject(KEYS.IVehicleRepository) private vehicleRepository: IVehicleRepository) {}

    async find(id: number): Promise<IVehicle | null>
    {
        const vehicle = await this.vehicleRepository.findById(id);

        if(!vehicle) return null;

        return {
            nombre: vehicle.name,
            modelo: vehicle.model,
            fabricante: vehicle.manufacturer,
            costo_en_creditos: vehicle.cost_in_credits,
            longitud: vehicle.length,
            velocidad_maxima: vehicle.max_atmosphering_speed,
            tripulacion: vehicle.crew,
            pasajeros: vehicle.passengers,
            capacidad_carga: vehicle.cargo_capacity,
            consumibles: vehicle.consumables,
            clase_vehiculo: vehicle.vehicle_class
        }
    }
}