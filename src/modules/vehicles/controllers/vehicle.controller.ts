import { IVehicleService, IVehicleController } from "../contracts/vehicle.contracts";
import {Request, Response} from "express";
import {inject, injectable} from "tsyringe";
import KEYS from "../../shared/IoC/Keys";

@injectable()
export class VehicleController implements IVehicleController{
    constructor(@inject(KEYS.IVehicleService) private vehicleService: IVehicleService) {}

    async one(req: Request, res: Response): Promise<Response>
    {
        const vehicle = await this.vehicleService.find(parseInt(req.params.id));

        return res.json({
            res: true,
            message: 'Vehículo encontrado correctamente',
            data: vehicle
        })
    }
}