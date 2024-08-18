import {ICharacterService, ICharacterController} from "../contracts/character.contracts";
import {Request, Response} from "express";
import {inject, injectable} from "tsyringe";
import KEYS from "../../shared/IoC/Keys";
import { stringVals } from "../../shared/helpers";

@injectable()
export class CharacterController implements ICharacterController
{
    constructor(@inject(KEYS.ICharacterService) private characterService: ICharacterService) {}

    async list(req: Request, res: Response): Promise<Response>
    {
        let source;
        if(req.query.source) source = req.query.source.toString();
        
        const characters = await this.characterService.list(source);

        return res.json({
            res: true,
            message: 'Personajes listados correctamente',
            data: characters
        })
    }

    async create(req: Request, res: Response): Promise<Response>
    {
        const character = await this.characterService.create(req.body);

        if(character){
            return res.json({
                res: true,
                message: 'Personaje creado correctamente',
                data: {
                    ...stringVals(req.body),
                    "vehiculos": [],
                    "fuente_datos": "local"
                }    
            })
        }
        else{
            return res.status(400).json({
                res: false,
                message: 'Error al crear el personaje'
            })
        }
    }
}