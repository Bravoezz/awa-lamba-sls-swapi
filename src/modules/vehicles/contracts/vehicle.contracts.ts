import { Request, Response } from 'express'
import { IVehicle, IVehicleSwapi } from '../models/vehicle.model'

export interface IVehicleRepository{
    findById(id: number): Promise<IVehicleSwapi | undefined>;
}

export interface IVehicleService{
    find(id: number): Promise<IVehicle | null>;
}

export interface IVehicleController{
    one(req: Request, res: Response): Promise<Response>;
}