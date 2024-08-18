import { Request, Response } from 'express'
import { ICharacter, ICharacterSwapi } from '../models/character.model'

export interface ICharacterRepository{
    listLocal(): Promise<ICharacter[] | undefined>;
    listSwapi(): Promise<ICharacterSwapi[]>;
    create(character: ICharacter): Promise<boolean>;
}

export interface ICharacterService{
    list(source?: string): Promise<ICharacter[]>;
    create(character: ICharacter): Promise<boolean>;
}

export interface ICharacterController{
    list(req: Request, res: Response): Promise<Response>;
    create(req: Request, res: Response): Promise<Response>;
}