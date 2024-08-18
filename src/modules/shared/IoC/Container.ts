import KEYS from "./Keys";
import {container} from "tsyringe";

import { CharacterController } from "../../characters/controllers/character.controller";
import { CharacterService } from "../../characters/services/character.service";
import { CharacterRepository } from "../../characters/repositories/character.repository";

import { VehicleController } from "../../vehicles/controllers/vehicle.controller";
import { VehicleService } from "../../vehicles/services/vehicle.service";
import { VehicleRepository } from "../../vehicles/repositories/vehicle.repository";

container.register(KEYS.ICharacterController, { useClass: CharacterController });
container.register(KEYS.ICharacterService, { useClass: CharacterService });
container.register(KEYS.ICharacterRepository, { useClass: CharacterRepository });

container.register(KEYS.IVehicleController, { useClass: VehicleController });
container.register(KEYS.IVehicleService, { useClass: VehicleService });
container.register(KEYS.IVehicleRepository, { useClass: VehicleRepository });

export default container;