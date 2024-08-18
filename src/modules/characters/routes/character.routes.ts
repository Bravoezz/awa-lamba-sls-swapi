import KEYS from '../../shared/IoC/Keys';
import container from "../../shared/IoC/Container";
import {asyncHandler} from "../../shared/helpers";

import {Request, Response, Router} from 'express';
import {validate} from "../../shared/middlewares/validation.middleware";
import {body,query} from "express-validator";
import { ICharacterController } from '../contracts/character.contracts';

const CharacterRoutes = Router();
const character = container.resolve<ICharacterController>(KEYS.ICharacterController);

/**
 *  @openapi
 *  /api/v1/characters/list:
 *   get:
 *    tags:
 *     - CharacterRoutes
 *    summary: Listado de personajes
 *    description: Se obtiene un listado de personajes desde la fuente de datos
 *    parameters:
 *     - in: query
 *       name: source
 *       schema:
 *         type: string
 *       description: Fuente de datos (local ó swapi)
 *       example: local
 *    responses:
 *     200:
 *       description: OK
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CharacterListResponse'
 *     400:
 *       description: Bad Request
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 */
CharacterRoutes.get('/list', [
    validate([
        query('source').optional({ nullable: true }).isIn(['local', 'swapi']).withMessage('Ingrese una fuente de datos válida')
    ]),
    asyncHandler((req: Request, res: Response) => character.list(req, res))
]);

/**
 *  @openapi
 *  /api/v1/characters/add:
 *   post:
 *    tags:
 *     - CharacterRoutes
 *    summary: Agregar un personaje
 *    description: Se agrega un personaje a la base de datos local
 *    requestBody:
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/CharacterCreateRequest'
 *    responses:
 *     200:
 *       description: OK
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CharacterCreateResponse'
 *     400:
 *       description: Bad Request
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 */
CharacterRoutes.post('/add', [
    validate([
        body('nombre').isLength({ min:5 }).withMessage('Ingrese un nombre válido'),
        body('color_ojos').isLength({ min:3 }).withMessage('Ingrese un color de ojos válido'),
        body('color_piel').isLength({ min:3 }).withMessage('Ingrese un color de piel válido'),
        body('color_cabello').isLength({ min:3 }).withMessage('Ingrese un color de cabello válido'),
        body('fecha_nacimiento').isLength({ min:4 }).withMessage('Ingrese una fecha según el Calendario Galáctico Estándar'),
        body('estatura').isNumeric().custom(value => parseFloat(value) >= 0).withMessage('Ingrese una estatura válida'),
        body('peso').isNumeric().custom(value => parseFloat(value) >= 0).withMessage('Ingrese un peso válido'),
        body('genero').isIn(['male', 'female', 'n/a']).withMessage('Ingrese un género válido')
    ]),
    asyncHandler((req: Request, res: Response) => character.create(req, res))
]);

export default CharacterRoutes;