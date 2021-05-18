import { readFileSync } from 'fs'
import api from '#server'
import * as HTTPS from 'https'
import * as HTTP from 'http'
import { AddressInfo } from 'net'

const getPort = (server: HTTPS.Server | HTTP.Server) => {
	const adressInfo: AddressInfo | string | null = server.address()

	if(!adressInfo || typeof adressInfo === 'string') return ''
	else if(adressInfo) return adressInfo.port
}

// Start the server
if(process.env.NODE_ENV === 'production') {
	// Behind a reverse proxy with ssl termination
	const server: HTTP.Server = HTTP.createServer(api)

	server.on('listening', () => console.info(`[Server] listening on port ${getPort(server)}`))

	server.listen(process.env.PORT || 0)

} else if(process.env.NODE_ENV === 'development'){
	// Development using local HTTPS server
	const key: string = process.env.SSL_KEY || ''
	const cert: string = process.env.SSL_CERT || ''

	const server: HTTPS.Server = HTTPS.createServer({
		key: readFileSync(key),
		cert: readFileSync(cert)
	}, api)

	server.on('listening', () => console.info(`[Server] listening on https://localhost:${getPort(server)}`))
		
	server.listen(process.env.PORT || 0)
}