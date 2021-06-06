import { apiError, ErrorTypes } from '#modules/errors'
import { Game, Category, MaterialName} from '#models/game'



export function filterCategory(games: Game[], category: Category | Category[] | unknown) :Game[] {

	if(!category) return games
	else if(Array.isArray(category) && category.every(checkSyntax)) return games.filter((game) => category.includes(game.category))
	else if(typeof category === 'string' && checkSyntax(category)) return games.filter((game) => category === game.category)
	else throw new apiError(`Got unknown category: ${category}`, ErrorTypes.filter)

	function checkSyntax(category: string) {
		const categoryEnums: string[] = Object.values(Category)
		return categoryEnums.includes(category)
	}
}

export function filterMaterial(games: Game[], material: MaterialName | MaterialName[] | unknown) :Game[] {

	if(!material) return games
	else if(Array.isArray(material) && material.every(checkSyntax)) return games.filter((game) => game.materials.some((gameMaterial) => material.includes(gameMaterial.name)))
	else if(typeof material === 'string' && checkSyntax(material)) return games.filter((game) => game.materials.some((gameMaterial) => material === gameMaterial.name))
	else throw new apiError(`Got unknown material: ${material}`, ErrorTypes.filter)

	function checkSyntax(material: string) {
		const materialEnums: string[] = Object.values(MaterialName)
		return materialEnums.includes(material)
	}

}

export function filterGroup(games: Game[], targetGroups: Game['targetGroup'] | number | unknown) :Game[] {
	if(!targetGroups) return games
	else if(Array.isArray(targetGroups) && targetGroups.every(checkSyntax)) {
		const mappedGroups = targetGroups.map((group) => Number(group))
		return games.filter((game) => game.targetGroup.some((group) => mappedGroups.includes(group)))
	}
	else if(checkSyntax(targetGroups)) return games.filter((game) => game.targetGroup.some((group) => Number(targetGroups) === group))
	else throw new apiError(`Got unknown targetGroup: ${targetGroups}`, ErrorTypes.filter)

	function checkSyntax(targetGroup: number | unknown) {
		const group = Number(targetGroup)
		return !isNaN(group) && group >= 1 && group <= 8
	}
}

export function filterPlayerAmount(games: Game[], minimumPlayers: Game['minimumPlayers'] | unknown) :Game[] {
	const players = Number(minimumPlayers)
	
	if(minimumPlayers && isNaN(players)) throw new apiError(`Got unknown minimum players: ${minimumPlayers}`, ErrorTypes.filter)
	else if(players && !isNaN(players)) return games.filter((game) => game.minimumPlayers ? game.minimumPlayers <= players : undefined)
	else return games
}
