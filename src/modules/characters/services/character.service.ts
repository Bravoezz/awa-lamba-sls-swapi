import KEYS from '../../shared/IoC/Keys';
import { injectable, inject } from 'tsyringe';
import { ICharacterService, ICharacterRepository } from '../contracts/character.contracts';
import { ICharacter, ICharacterSwapi } from '../models/character.model';

@injectable()
export class CharacterService implements ICharacterService
{
    constructor(@inject(KEYS.ICharacterRepository) private characterRepository: ICharacterRepository) {}

    async list(source?: string): Promise<ICharacter[]>
    {
        switch(source) {
            case 'local':
                return await this.listLocal();
            case 'swapi':
                return await this.listSwapi();
            default:
                const localCharacters = await this.listLocal();
                const swapiCharacters = await this.listSwapi();

                return [...localCharacters, ...swapiCharacters];
        }
    }

    async create(character:ICharacter): Promise<boolean>
    {
        return await this.characterRepository.create(character);
    }

    private async listLocal(): Promise<ICharacter[]>
    {
        const lista = await this.characterRepository.listLocal();

        if(!lista) return [];

        return lista.map((item: ICharacter) =>
        {
            delete item.id;

            return {
                ...item,
                vehiculos: [],
                fuente_datos: 'local'
            }
        })
    }

    private async listSwapi(): Promise<ICharacter[]>
    {
        const lista = await this.characterRepository.listSwapi();

        return lista.map((item: ICharacterSwapi) =>
        {
            const vehiculos = item.vehicles.map((vehiculo: string) => {
                return vehiculo.replace('https://swapi.py4e.com/api', process.env.API_URL ?? 'http://localhost:3000' + '/api/v1');
            })
            
            return {
                nombre: item.name,
                estatura: parseInt(item.height),
                peso: parseInt(item.mass),
                color_cabello: item.hair_color,
                color_piel: item.skin_color,
                color_ojos: item.eye_color,
                fecha_nacimiento: item.birth_year,
                genero: item.gender,
                vehiculos,
                fuente_datos: 'swapi'
            }
        })
    }
}