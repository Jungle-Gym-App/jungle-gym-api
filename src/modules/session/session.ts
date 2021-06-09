import { v4 as uuidv4 } from 'uuid'
import { deleteSession, getSession, saveSession } from '#modules/session/sessionDB'
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
	'valid_from': string,
	'expires_in': number ,
	'expires_on': string
}




/**
 * Start a new session 
 * @returns a newly started session
 */
export async function startNewSession() : Promise<Session> {
	const session: Session = createSession()
	await saveSession(session)
	return session
}

/**
 * Revokes a session
 * @param accessToken the access token of the session to revoke
 * @returns 
 */
export async function revokeSession(accessToken: Session['access_token']) : Promise<void> {
	const session = await getSession(accessToken)
	if(session.status === 'active') return deleteSession(accessToken)
	else return
}

function createSession() : Session{
	const accessToken = uuidv4()
	const currentDateTime = Date.now()
	const validFrom = new Date(currentDateTime)
	const expiresIn = 1800000
	const expireDate = new Date(currentDateTime + expiresIn)

	const session: Session = {
		'status': SessionStatus.active,
		'access_token': accessToken,
		'valid_from': validFrom.toLocaleString(undefined, {timeZone: 'Europe/Amsterdam'}),
		'expires_in': expiresIn ,
		'expires_on': expireDate.toLocaleString(undefined, {timeZone: 'Europe/Amsterdam'})
	}

	return session
}

// function isExpired(expiresOn: Session['expires_on']): boolean {
// 	const expiresOnDate = new Date(expiresOn)
// 	const nowDate = new Date(Date.now())
// 	return nowDate > expiresOnDate
// }