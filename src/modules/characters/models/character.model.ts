type Gender = "male" | "female" | "n/a";
type DataSource = "swapi" | "local";

export interface ICharacter {
    id?: string;
    nombre: string;
    estatura: number;
    peso: number;
    color_cabello: string;
    color_piel: string;
    color_ojos: string;
    fecha_nacimiento: string;
    genero: Gender;
    vehiculos?: string[];
    fuente_datos?: DataSource;
}

export interface ICharacterSwapi {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    vehicles: string[];
    gender: Gender;
}