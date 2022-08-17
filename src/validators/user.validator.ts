import { Request, Response, NextFunction } from 'express';
import { parseErrors } from '../errors/ajvError';
import { validateUser } from './userValidation.schema';

export const addUserValidator = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isValid = validateUser(req.body);
    if (!isValid && validateUser.errors) {
        const error = await parseErrors(validateUser.errors);
        return res.status(400).json({status: 'errors', code: 400, errors: error})
    }
    next();
};
