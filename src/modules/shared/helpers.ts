import { Request, Response, NextFunction } from "express";
import { AsyncRequestHandler } from "./types/AsyncRequestHandler";

export const asyncHandler = (fn: AsyncRequestHandler): AsyncRequestHandler => {
	return (req: Request, res: Response, next?: NextFunction) => {
		return Promise.resolve(fn(req, res, next)).catch(next);
	};
}

export const stringVals = (inputJson: Record<string, any>): Record<string, string> =>
{
	const result: Record<string, string> = {};

	for (const key in inputJson) {
		if (Object.prototype.hasOwnProperty.call(inputJson, key)) {
			// Convertir el valor a cadena
			const valueAsString = String(inputJson[key]);
			// Asignar el valor convertido al resultado
			result[key] = valueAsString;
		}
	}

	return result;
}