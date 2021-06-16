import mongoose from 'mongoose'
const { Schema } = mongoose

export interface User {
	_id?: 'string',
	username: 'string',
	password: 'string',
	name: 'string',
	admin: boolean,
	savedGames: string[]
}


const UserSchema = new Schema<User>({
	name: {type: String, required: true},
	password: {type: String, required: true},
	username: {type: String, required: true},
	admin: {type: Boolean, default: false},
	savedGames: [{type: String}]
})

export default UserSchema