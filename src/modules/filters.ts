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
	else throw new apiError(`Got unknown category: ${material}`, ErrorTypes.filter)

	function checkSyntax(material: string) {
		const materialEnums: string[] = Object.values(MaterialName)
		return materialEnums.includes(material)
	}

}
