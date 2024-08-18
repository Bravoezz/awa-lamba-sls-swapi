import KEYS from '../../shared/IoC/Keys';
import container from "../../shared/IoC/Container";
import {asyncHandler} from "../../shared/helpers";

import {Request, Response, Router} from 'express';
import {validate} from "../../shared/middlewares/validation.middleware";
import { IVehicleController } from '../contracts/vehicle.contracts';
import { param } from 'express-validator';

const VehicleRoutes = Router();
const vehicle = container.resolve<IVehicleController>(KEYS.IVehicleController);

/**
 *  @openapi
 *  /api/v1/vehicles/{id}:
 *   get:
 *    tags:
 *     - VehicleRoutes
 *    summary: Datos de un vehículo
 *    description: Se obtiene la información de un vehículo desde la swapi
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description: Id del vehículo
 *       example: 4
 *    responses:
 *     200:
 *       description: OK
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VehicleResponse'
 *     400:
 *       description: Bad Request
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse' 
 */
VehicleRoutes.get('/:id', [
    validate([
        param("id").isInt({ min: 1 }).withMessage("Id no válido"),
    ]),
    asyncHandler((req: Request, res: Response) => vehicle.one(req, res))
]);

export default VehicleRoutes;