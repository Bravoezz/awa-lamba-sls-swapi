import 'jest'
import 'reflect-metadata'
import { ICharacterRepository } from '../../../src/modules/characters/contracts/character.contracts'
import { ICharacterSwapi } from '../../../src/modules/characters/models/character.model'
import { CharacterService } from '../../../src/modules/characters/services/character.service'

test('Should list swapi characters', async () => 
{
    const characterRepositoryMock: ICharacterRepository = {
        listSwapi: jest.fn(() => Promise.resolve<ICharacterSwapi[]>(
            [
                {
                    "name": "Luke Skywalker", 
                    "height": "172", 
                    "mass": "77", 
                    "hair_color": "blond", 
                    "skin_color": "fair", 
                    "eye_color": "blue", 
                    "birth_year": "19BBY", 
                    "gender": "male", 
                    "vehicles": [
                        "https://swapi.py4e.com/api/vehicles/14/", 
                        "https://swapi.py4e.com/api/vehicles/30/"
                    ]
                }, 
                {
                    "name": "Leia Organa", 
                    "height": "150", 
                    "mass": "49", 
                    "hair_color": "brown", 
                    "skin_color": "light", 
                    "eye_color": "brown", 
                    "birth_year": "19BBY", 
                    "gender": "female", 
                    "vehicles": [
                        "https://swapi.py4e.com/api/vehicles/30/"
                    ]
                }
            ]
        )),
        listLocal: jest.fn(),
        create: jest.fn()
    }

    const characterService = new CharacterService(characterRepositoryMock)

    const characters = await characterService.list('swapi')

    expect(characters).toBeInstanceOf(Array)

    expect(characters).toEqual(
        [
            {
                nombre: 'Luke Skywalker',
                estatura: 172,
                peso: 77,
                color_cabello: 'blond',
                color_piel: 'fair',
                color_ojos: 'blue',
                fecha_nacimiento: '19BBY',
                genero: 'male',
                vehiculos: [
                    "http://localhost:3000/api/v1/vehicles/14/", 
                    "http://localhost:3000/api/v1/vehicles/30/"
                ],
                fuente_datos: 'swapi'
            },
            {
                nombre: 'Leia Organa',
                estatura: 150,
                peso: 49,
                color_cabello: 'brown',
                color_piel: 'light',
                color_ojos: 'brown',
                fecha_nacimiento: '19BBY',
                genero: 'female',
                vehiculos: [
                    "http://localhost:3000/api/v1/vehicles/30/"
                ],
                fuente_datos: 'swapi'
            }
        ]
    )

    expect(characterRepositoryMock.listSwapi).toHaveBeenCalledTimes(1)
})
