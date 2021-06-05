import { Game } from '#models/game'
import fetch from 'node-fetch'
import { StrapiGame, strapiPatchAll, strapiPatchSingle } from '#modules/strapiPatch'

export function getAllGames() : Promise<Game[]> {
	return fetch(`${process.env.STRAPI_CMS_URL}/games`)
		.then((res) => {
			if(res.ok) return res.json()
			else throw res
		})
		.then((strapiGames: StrapiGame[]) => strapiPatchAll(strapiGames))
}

export function getSingleGame(id: string) : Promise<Game> {
	return fetch(`${process.env.STRAPI_CMS_URL}/games/${id}`)
		.then((res) => {
			if(res.ok) return res.json()
			else throw res
		})
		.then((strapiGame: StrapiGame) => strapiPatchSingle(strapiGame))
}