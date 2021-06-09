
export enum SessionStatus {
	active = 'active',
	revoked = 'revoked',
	expired = 'expired'
}


export interface Session {
	[propname: string]: string| number,
	'status': SessionStatus,
	'access_token': string,
	'expires_in': number ,
	'expires_on': string
}