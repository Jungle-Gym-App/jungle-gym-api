import {Request, Response, ErrorRequestHandler, NextFunction} from 'express'

export enum ErrorTypes {
	general = 'INTERNAL_SERVER_ERROR',
	filter = 'INVALID_FILTER',
	login = 'INCORRECT_LOGIN'
}


/**
 * @param  {string} message detail of the error
 * @param  {ErrorTypes} [type] the type of error 
 */
export class apiError extends Error {
	type: ErrorTypes = ErrorTypes.general
	message = 'Internal Server Error'

	constructor(message?: string, type?: ErrorTypes) {
		super()
		if(message) this.message = message
		if(type) this.type = type
	}
}


export function handleErrors(error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction  ) : void {
	if(error instanceof apiError) {
		switch (error.type) {
		case ErrorTypes.filter:
			res.status(400).json(error)
			break
		case ErrorTypes.login:
			res.set('WWW-Authenticate', 'Basic realm=').status(401).json(error)
			break
		default:
			res.status(500).json(ErrorTypes.general)
		}
	} else {
		res.status(500).json(ErrorTypes.general)
	}
}