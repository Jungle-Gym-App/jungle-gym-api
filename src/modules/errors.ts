export enum ErrorTypes {
	general = 'INTERNAL_SERVER_ERROR',
	filter = 'INVALID_FILTER'
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
