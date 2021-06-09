import { v4 as uuidv4 } from 'uuid'
import { saveSession } from '#modules/session/sessionDB'
import { ErrorTypes, apiError } from '#modules/errors'

export enum SessionStatus {
	active = 'active',
	revoked = 'revoked',
	expired = 'expired'
}
export interface Session {
	[propname: string]: string| number,
	'status': SessionStatus,
	'access_token': string,
	'expires_in': number ,
	'expires_on': string
}




/**
 * Start a new session 
 * @returns a newly started session
 */
export async function startNewSession() : Promise<Session> {
	const session: Session = createSession()

	try {
		await saveSession(session)
		return session

	} catch(error) {
		// [LOG]
		console.log(error)
		throw error instanceof apiError ? error : new apiError('SessionDB error', ErrorTypes.general)
	}
}

// function checkSession() {

// }

// function refreshSession() {

// }

// function revokeSession() {

// }


export function createSession() : Session{
	const accessToken = uuidv4()
	const currentDateTime = Date.now()
	const expiresIn = 1800000
	const expireDate = new Date(currentDateTime + expiresIn)

	const session: Session = {
		'status': SessionStatus.active,
		'access_token': accessToken,
		'expires_in': expiresIn ,
		'expires_on': expireDate.toLocaleString(undefined, {timeZone: 'Europe/Amsterdam'})
	}

	return session
}