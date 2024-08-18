import { injectable } from "tsyringe";
import { IVehicleRepository } from "../contracts/vehicle.contracts";
import { IVehicleSwapi } from "../models/vehicle.model";

@injectable()
export class VehicleRepository implements IVehicleRepository
{
    async findById(id: number): Promise<IVehicleSwapi | undefined>
    {
        const response = await fetch(`https://swapi.py4e.com/api/vehicles/${id}/`);
        const vehicle = await response.json();

        return vehicle;
    }
}