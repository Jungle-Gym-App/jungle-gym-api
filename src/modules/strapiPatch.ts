import { Game, Material, GameVariations, Category } from '#models/game'

export function strapiPatchAll(strapiGames: StrapiGame[]): Game[] {
	return strapiGames.map(strapiPatchSingle)
}

export function strapiPatchSingle(strapiGame: StrapiGame): Game {
	console.log(strapiGame)
	const game: Game = {
		id: typeof strapiGame.id === 'string' ? strapiGame.id : '',
		slug: typeof strapiGame.slug === 'string' ? strapiGame.slug : '',
		name: typeof strapiGame.name === 'string' ? strapiGame.name : '',
		description: typeof strapiGame.description === 'string' ? strapiGame.description : '',
		category: typeof strapiGame.category.name === 'string' ? strapiGame.category.name : '',
		materials: checkMaterial(strapiGame.materials),
		minimumPlayers: typeof strapiGame.minimumPlayers === 'string' ? Number(strapiGame.minimumPlayers) : undefined,
		targetGroup: Array.isArray(strapiGame.targetGroup) ? strapiGame.targetGroup.map((a) => parseInt(a.group))
			: [],
		rules: Array.isArray(strapiGame.rules) ? strapiGame.rules.map((a) => a.description) : [],
		variation: gameVariation(strapiGame.variation),
		updatedAt: strapiGame.updatedAt
	}
	return game
}


function gameVariation(strapiVariation: StrapiGame['variation']) : GameVariations[]  {
	if(strapiVariation && Array.isArray(strapiVariation)) {
		return strapiVariation.map((strapiVariation: { description: string, actions: [{description: string}]}) => {
			const gameVariations: GameVariations = {
				description: strapiVariation.description,
				actions: strapiVariation.actions.map((action) => action.description)
			}
		
			
			return gameVariations
		})
	} else return []
}


function checkMaterial(strapiMaterials: StrapiGame['materials']) : Material[] {
	if (Array.isArray(strapiMaterials)) {
		return strapiMaterials.map(
			(strapiMaterial: {
				amount?: number | string | undefined;
				notes?: string;
				material: {name: string}
			} ): Material => {
				const gameMaterial: Material = {
					name: strapiMaterial.material.name,
					amount: strapiMaterial.amount ? strapiMaterial.amount : undefined,
					notes: strapiMaterial.notes ? strapiMaterial.notes : undefined
				}

				return gameMaterial
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
		amount?: number | string | undefined;
		notes?: string;
		material: {name: string}
	}[]
	minimumPlayers: number
	targetGroup: {group: string}[]
	rules?: {description: string}[]
	variation?: { description: string, actions: [{description: string}]}
	updatedAt: string
	[key: string] : unknown
}

export interface StrapiMaterial {
	material: {name: string}
	amount?: number | string
	notes?: string
}