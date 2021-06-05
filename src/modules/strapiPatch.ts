import { Game, Material, GameVariations, Category } from '#models/game'

export function strapiPatchAll(strapiGames: StrapiGame[]): Game[] {
	return strapiGames.map(strapiPatchSingle)
}

export function strapiPatchSingle(strapiGame: StrapiGame): Game {
	const game: Game = {
		id: typeof strapiGame.id === 'string' ? strapiGame.id : '',
		slug: typeof strapiGame.slug === 'string' ? strapiGame.slug : '',
		name: typeof strapiGame.name === 'string' ? strapiGame.name : '',
		description: typeof strapiGame.description === 'string' ? strapiGame.description : '',
		category: typeof strapiGame.category.name === 'string' ? strapiGame.category.name : '',
		materials: checkMaterial(strapiGame.materials),
		minimumPlayers: typeof strapiGame.minimumPlayers === 'string' ? Number(strapiGame.minimumPlayers) : NaN,
		targetGroup: Array.isArray(strapiGame.targetGroup) ? strapiGame.targetGroup.map((a) => parseInt(a.group))
			: [],
		rules: Array.isArray(strapiGame.rules) ? strapiGame.rules : [],
		variation: Array.isArray(strapiGame.variation) ? strapiGame.variation : []
	}
	return game
}


function checkMaterial(strapiMaterials: StrapiGame['materials']) : Material[] {
	if (Array.isArray(strapiMaterials)) {
		return strapiMaterials.map(
			(strapiMaterial): Material => {
				return {
					name: strapiMaterial.material.name,
					amount: Number(strapiMaterial.amount),
					notes: strapiMaterial.notes
				}
			}
		)
	} else return []
}

export interface StrapiGame {
	id: string;
	slug: string;
	name: string
	description: string
	category: {name: string}
	materials: {
		amount?: number | string | unknown;
		notes?: string;
		material: {name: string}
	}[]
	minimumPlayers: number
	targetGroup: {group: string}[]
	rules?: string[]
	variation?: string[] | GameVariations[]
	[key: string] : unknown
}

export interface StrapiMaterial {
	material: {name: string}
	amount?: number | string
	notes?: string
}