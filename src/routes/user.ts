import { User } from '#models/user'
import { findUserById } from '#modules/database/database'
import { Session } from '#modules/session/session'
import {Router, Request, Response, NextFunction } from 'express'
import { Document, LeanDocument } from 'mongoose'

const user: Router = Router()


user
	.use(loadUserInSession)
	.get('/', getUserDetails)
	.get('/gymles', getUserSavedGames)
	.post('/gymles/add', addGameToGymles)
	.post('/gymles/remove', removeGameFromGymles)

export default user 

async function loadUserInSession(req: Request, res: Response, next: NextFunction) {
	const session: Session = res.locals.session
	res.locals.userDocument = await findUserById(session.id)
	return next()
}

async function getUserDetails(req: Request, res: Response, next: NextFunction) {
	const removeSensitiveInformation = (doc: unknown , ret: Record<string, unknown>) => {
		const { _id, password, ...user } = ret
		return user
	}

	const userDocument: (User & Document) = res.locals.userDocument
	const user: LeanDocument<(User & Document)> | undefined = userDocument?.toObject({ transform: removeSensitiveInformation }) 

	return res.json(user)
}

async function getUserSavedGames(req: Request, res: Response, next: NextFunction) {
	return res.json(res.locals.userDocument.savedGames)
}


async function addGameToGymles(req: Request, res: Response, next: NextFunction) {
	const userDocument: (User & Document) = res.locals.userDocument
	const savedGames = Array.isArray(req.body) ? req.body : [req.body]
	const oldSavedGames = userDocument.savedGames
	const newSavedGames = [...new Set([...savedGames, ...oldSavedGames])]

	userDocument.savedGames = newSavedGames

	try {
		userDocument.save()
		res.json(newSavedGames)
	} catch(error) {
		next(error)
	}
}


async function removeGameFromGymles(req: Request, res: Response, next: NextFunction) {
	const userDocument: (User & Document) = res.locals.userDocument
	const gamesToRemove = Array.isArray(req.body) ? req.body : [req.body]
	const oldSavedGames = userDocument.savedGames
	const newSavedGames = oldSavedGames.filter((savedGame) => gamesToRemove.includes(savedGame))

	userDocument.savedGames = newSavedGames

	try {
		userDocument.save()
		res.json(newSavedGames)
	} catch(error) {
		next(error)
	}
}