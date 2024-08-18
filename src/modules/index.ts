import { Router } from "express";

import CharacterRoutes from "./characters/routes/character.routes";
import VehicleRoutes from "./vehicles/routes/vehicle.routes";

export const loadModules = (): Router =>
{
	const mainRouter = Router();
    
    mainRouter.use("/characters", CharacterRoutes);
    mainRouter.use("/vehicles", VehicleRoutes);

    return mainRouter;
};