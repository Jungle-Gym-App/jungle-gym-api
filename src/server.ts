import express, { ErrorRequestHandler, Request, Response } from 'express'

const api = express()

api
	
	.use((req: Request, res: Response) => res.status(404).send('Not found'))
	.use((err: ErrorRequestHandler, req: Request, res: Response) => res.status(500).send('Not found'))

export default api