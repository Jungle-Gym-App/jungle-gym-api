import {Router, Request, Response, NextFunction } from 'express'


const register: Router = Router()


register
	.post('/', createNewUser)



export default register 



async function createNewUser(req: Request, res: Response, next: NextFunction) {
	const { username, name, password, admin } = req.body

	res.send('hello world')
}