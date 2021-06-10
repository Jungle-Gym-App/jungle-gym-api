import { User } from '#models/user'
import { findUserById } from '#modules/database/database'
import { apiError, ErrorTypes } from '#modules/errors'
import { Session } from '#modules/session/session'
import {Router, Request, Response, NextFunction } from 'express'
import { Document, LeanDocument } from 'mongoose'


const user: Router = Router()


user
	.get('/', getUserDetails)

export default user 



async function getUserDetails(req: Request, res: Response, next: NextFunction) {
	const removeSensitiveInformation = (doc: unknown , ret: Record<string, unknown>) => {
		const { _id, password, ...user } = ret
		return user
	}

	const session: Session = res.locals.session

	if(!session.id) return next(new apiError('No token in session', ErrorTypes.general))

	const userDocument = await findUserById(session.id)
	const user: LeanDocument<(User & Document)> | undefined = userDocument?.toObject({ transform: removeSensitiveInformation }) 

	return res.json(user)
}