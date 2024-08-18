import {Request, Response, RequestHandler, NextFunction} from "express";
import {BaseError} from "../error";

export const ErrorMiddleware = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
): Response => 
{
	if(err instanceof BaseError) {
		const { statusCode, errors } = err;
		return res.status(statusCode).send({ errors });
	}

	// Unhandled errors
	console.error(err)
	return res.status(500).json({ errors: [{ message: "Error desconocido" }] });
};

export const NotFoundMiddleware: RequestHandler = (req: Request, res: Response) =>
{
	return res.status(404).json({
		errors: [
			{
				message: "No encontrado"
			}
		]
	});
};