import {Router, Request, Response, NextFunction } from 'express'


const user: Router = Router()


user
	.get('/', getUserDetails)



export default user 



async function getUserDetails(req: Request, res: Response, next: NextFunction) {
	console.log()

	res.send('hello world')

}