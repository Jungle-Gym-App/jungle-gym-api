import {Router, Request, Response, NextFunction } from 'express'
import { user } from '#mock/user'
import { v4 as uuidv4 } from 'uuid'
import { apiError, ErrorTypes } from '#modules/errors'

const auth: Router = Router()


auth
	.post('/login', handleLoginRequest)

export default auth 


function handleLoginRequest(req: Request, res: Response, next: NextFunction) {
	const { username, password } = req.body
	
	// check login information
	if(username !== user.username || password !== user.password) return next(new apiError('Wrong username or password', ErrorTypes.login))

	// create a token, create expire
	const accessToken = uuidv4()
	const currentDateTime = Date.now()
	const expiresIn = 1800000
	const expireDate = new Date(currentDateTime + expiresIn)

	const session = {
		'access_token': accessToken,
		'expires_in': expiresIn ,
		'expires_on': expireDate.toLocaleString(undefined, {timeZone: 'Europe/Amsterdam'})
	}

	return res.json(session)
}

