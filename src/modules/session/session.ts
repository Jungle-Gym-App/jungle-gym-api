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
	id: string
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
export async function startNewSession(id: string) : Promise<Session> {
	const session: Session = createSession(id)
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

export async function retrieveSession(accessToken: Session['access_token']) : Promise<Session> {
	return getSession(accessToken)
}

/**
 * Checks if the session is active
 * @param accessToken  the access token of the session to check
 * @returns resolves when session is active, rejects if not active anymore
 */
export async function checkSession(accessToken: Session['access_token']) : Promise<void>{
	const session = await getSession(accessToken)

	if(session.status !== SessionStatus.active) throw new apiError(`Session is ${session.status}`, ErrorTypes.session)
	else if(isExpired(session.expires_on)) {
		await deleteSession(accessToken, true)
		throw new apiError('Session is expired', ErrorTypes.session)
	}
}

function createSession(id: string) : Session{
	const accessToken = uuidv4()
	const currentDateTime = Date.now()
	const validFrom = new Date(currentDateTime)
	const expiresIn = 1800000
	const expireDate = new Date(currentDateTime + expiresIn)

	const session: Session = {
		id,
		'status': SessionStatus.active,
		'access_token': accessToken,
		'valid_from': validFrom.toISOString(),
		'expires_in': expiresIn,
		'expires_on': expireDate.toISOString()
	}

	return session
}

function isExpired(expiresOn: Session['expires_on']): boolean {
	const expiresOnDate = new Date(expiresOn)
	const nowDate = new Date(Date.now())
	return nowDate > expiresOnDate
}