import 'jest'
import 'reflect-metadata'
import { IVehicleRepository } from '../../../src/modules/vehicles/contracts/vehicle.contracts'
import { IVehicleSwapi } from '../../../src/modules/vehicles/models/vehicle.model'
import { VehicleService } from '../../../src/modules/vehicles/services/vehicle.service'

test('Should list a vehicle', async () => 
{
    const vehicleRepositoryMock: IVehicleRepository = {
        findById: jest.fn((id: number) => Promise.resolve<IVehicleSwapi>(
            {
                name: 'Sand Crawler',
                model: 'Digger Crawler',
                manufacturer: 'Corellia Mining Corporation',
                cost_in_credits: 150000,
                length: 36.8,
                max_atmosphering_speed: 30,
                crew: 46,
                passengers: 30,
                cargo_capacity: 50000,
                consumables: '2 months',
                vehicle_class: 'wheeled'
            }
        ))
    }

    const vehicleService = new VehicleService(vehicleRepositoryMock)

    const vehicle = await vehicleService.find(4)

    expect(vehicle).toBeInstanceOf(Object)

    expect(vehicle).toEqual(
        {
            nombre: 'Sand Crawler',
            modelo: 'Digger Crawler',
            fabricante: 'Corellia Mining Corporation',
            costo_en_creditos: 150000,
            longitud: 36.8,
            velocidad_maxima: 30,
            tripulacion: 46,
            pasajeros: 30,
            capacidad_carga: 50000,
            consumibles: '2 months',
            clase_vehiculo: 'wheeled'
        }
    )

    expect(vehicleRepositoryMock.findById).toHaveBeenCalledTimes(1)
})