export interface IVehicle {
    nombre: string;
    modelo: string;
    fabricante: string;
    costo_en_creditos: number;
    longitud: number;
    velocidad_maxima: number;
    tripulacion: number;
    pasajeros: number;
    capacidad_carga: number;
    consumibles: string;
    clase_vehiculo: string;
}

export interface IVehicleSwapi {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: number;
    length: number;
    max_atmosphering_speed: number;
    crew: number;
    passengers: number;
    cargo_capacity: number;
    consumables: string;
    vehicle_class: string;
}