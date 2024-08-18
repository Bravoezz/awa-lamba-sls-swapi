import { Request, Response, NextFunction } from "express";
import { ValidationChain, validationResult } from "express-validator";

import { AsyncRequestHandler } from "../types/AsyncRequestHandler";

export const validate = (validations: ValidationChain[]): AsyncRequestHandler => {
	return async (
		req: Request,
		res: Response,
		next?: NextFunction
	): Promise<Response | undefined> =>
	{
		await Promise.all(validations.map((validation) => validation.run(req)));

		const errors = validationResult(req);

		if (errors.isEmpty())
        {
			if (next) next();
			return;
		}

		return res.status(422).json({
            res: false, message: "Error en la validación de campos", errors: errors.array().map(error => {
                const {msg, ...context} = error
                return {
                    message: msg,
                    context
                }
			})
		});
	};
};