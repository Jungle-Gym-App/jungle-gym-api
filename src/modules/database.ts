import { Connection, ConnectOptions, createConnection} from 'mongoose'

const address = process.env.DB_ADDRESS
const port = process.env.DB_PORT
const production = process.env.NODE_ENV === 'production'
const uri = production ? `mongodb+srv://${address}` : `mongodb://${address}:${port}`

const options: ConnectOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
	authSource: 'admin',
	dbName: process.env.DB_NAME,
	user: process.env.DB_USERNAME,
	pass: process.env.DB_PASSWORD
}

class Database {
	private connection: Connection | Promise<Connection> | null = null
	private backOff = 0

	connect(uri: string, options?: ConnectOptions) {
		this.connection = createConnection(uri, options)
		// Database Events 
		// Rejection - only if initial connection failed (Mongoose will NOT attempt to reconnect)
		if(this.connection instanceof Promise) {
			this.connection.catch(() => {
				if(this.backOff > 10) this.backOff = 10
				console.log(`[DB] Cannot connect, retrying in ${this.backOff} minutes`)
				this.connection = null
				setTimeout(this.connect.bind(this), this.backOff++ * 1000 * 60)
			})
		}

		if(this.connection instanceof Connection) {
			const {name, host} = this.connection

			this.connection.on('open', () => {
				console.log(`[DB] connection with ${name} on ${host}`)			
				this.backOff = 1
			})
	
			// Disconnection - Mongoose will attempt to reconnect
			this.connection.on('disconnected', () => {
				console.log('[DB] disconnected')
			}) 
	
			// Errors - on failure on initial connection, but also on other errors on the connection (not on disconnect)
			this.connection.on('error', () => {
				console.error('[DB] error on connection - ', name)
			})
		}
		

	}



}