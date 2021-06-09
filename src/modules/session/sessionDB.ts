import { Tedis } from 'tedis'
import { Session } from '#modules/session/session'
import { apiError, ErrorTypes } from '#modules/errors'

const host: string | undefined = process.env.SESSION_DB_URL
const port: number | undefined = Number(process.env.SESSION_DB_PORT)
const password: string | undefined = process.env.SESSION_DB_PASSWORD
const username: string | undefined = process.env.SESSION_DB_USERNAME
const tls: string | boolean = Boolean(process.env.SESSION_DB_TLS)

let sessionDB: Tedis | undefined

connectToDatabase()


export function saveSession(session: Session) : Promise<void>  {
	if(!sessionDB) return Promise.reject(new apiError('SessionDB offline', ErrorTypes.general))

	return sessionDB.hmset(session.access_token, session)
		.then((status) => {
			if(status === 'OK') return undefined
			else throw 'NOT OK'
		})
}


function connectToDatabase() {
	console.info('Connecting to DB')
	if (typeof port === 'number' && !isNaN(port) && typeof host === 'string') {
		const options: {
			host: string;
			port: number;
			password?: string;
			username?: string;
			tls?: {key: Buffer, cert: Buffer};
		} = { host, port }
	
		if (Boolean(password) && typeof password === 'string') options.password = password
		if (Boolean(username) && typeof username === 'string') options.username = username
		if (tls) options.tls = { key: Buffer.from(''), cert: Buffer.from('')}
	
		sessionDB = new Tedis(options)

		let dbError: Error
	
		sessionDB.on('connect', () => console.log('SessionDB connected'))
		sessionDB.on('error', (error) => dbError = error)
		sessionDB.on('close', (had_error) => {
			console.log('SessionDB closed', dbError && had_error ? dbError : 'Normal Closure')

			sessionDB = undefined
			setTimeout(connectToDatabase, 300000)
		})
	}
}