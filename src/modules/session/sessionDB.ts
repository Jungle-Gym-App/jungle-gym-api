import { Tedis } from 'tedis'

const host: string | undefined = process.env.SESSION_DB_URL
const port: number | undefined = Number(process.env.SESSION_DB_PORT)
const password: string | undefined = process.env.SESSION_DB_PASSWORD
const username: string | undefined = process.env.SESSION_DB_USERNAME
const tls: string | boolean = Boolean(process.env.SESSION_DB_TLS)

let sessionDB: Tedis | undefined

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

	sessionDB.on('connect', () => console.log('SessionDB connected'))
	sessionDB.on('error', (error) => {
		console.log(error)
	})
	sessionDB.on('close', (had_error) => {
		console.log('SessionDB closed', had_error)
	})
}

export default sessionDB


// function createNewSession() {


// }

// function checkSession() {

// }

// function refreshSession() {

// }

// function revokeSession() {

// }