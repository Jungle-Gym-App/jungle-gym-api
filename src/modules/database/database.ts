import UserSchema, { User } from '#models/user'
import mongoose, { ConnectOptions, Model } from 'mongoose'

const { createConnection } =  mongoose

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
	private connection: mongoose.Connection | null = null
	private backOff = 0
	uri: string;
	options?: ConnectOptions
	models: Map<string, Model<User>> = new Map()

	constructor(uri: string, options?: ConnectOptions) {
		this.uri = uri
		this.options = options
	}

	get ready() : boolean {
		return this.connection?.readyState === 1 
	}

	connect() {
		if(!uri && !this.uri) throw new Error('No uri specified')
		else {
			this.connection = createConnection(this.uri, this.options)
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

	
			if(this.connection instanceof mongoose.Connection) {
				const userModel = this.connection.model<User>('User', UserSchema)
				this.models.set('users', userModel)
	
				this.connection.on('open', () => {
					console.log('[DB] connection open', this.connection?.name, this.connection?.host)			
					this.backOff = 1
				})
		
				// Disconnection - Mongoose will attempt to reconnect
				this.connection.on('disconnected', () => {
					console.log('[DB] disconnected')
				}) 
		
				// Errors - on failure on initial connection, but also on other errors on the connection (not on disconnect)
				this.connection.on('error', () => {
					console.error('[DB] error on connection')
				})
			}	
		}

	

	}
}

const database = new Database(uri, options)

database.connect()


export const databaseStatus = () : boolean => database.ready


export async function findUserByUsername(username: User['username']) : Promise<(User & mongoose.Document ) | null> {
	const UserModel: Model<User> | undefined = database.models.get('users')

	if(UserModel) {
		const currentUser = await UserModel.findOne({username}).exec()
		return currentUser
	} else return null
}

export async function findUserById(id: string) : Promise<(User & mongoose.Document ) | null> {
	const UserModel: Model<User> | undefined = database.models.get('users')

	if(UserModel) {
		const currentUser = await UserModel.findById(id).exec()
		return currentUser
	} else return null
}