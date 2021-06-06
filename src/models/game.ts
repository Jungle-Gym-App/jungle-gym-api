import mongoose from 'mongoose'
const { Schema } = mongoose

export enum Category {
	tik ='Tikspel',
	bal = 'Balspel',
	loop = 'Loopspel',
	reactie = 'Reactiespel'
}

export enum MaterialName {
	lint = 'Lintje',
	fluit = 'Fluitje',
	hoepel = 'Hoepel',
	pion = 'Pion',
	klok = 'Stopwatch',
	bal = 'Bal'
}

export interface Material {
	name: MaterialName | string
	amount?: number | string | undefined
	notes?: string | undefined
}

export interface GameVariations {
	description: string,
	actions: string[]
}

export interface Game {
	id: string;
	slug: string;
	name: string
	description: string
	category: Category | string
	materials: Material[] | []
	minimumPlayers: number | undefined
	targetGroup: number[]
	rules?: string[]
	variation?: string[] | GameVariations[]
	[key: string] : unknown
}

const gameSchema = new Schema<Game>({
	name: { type: String, required: true },
	description:  { type: String, required: true },
	category:  { type: String, required: true, enum: ['tikspel', 'balspel', 'loopspel', 'reactiespel']},
	materials: [
		{
			name: { type: String, required: true, enum: ['lintje', 'fluitje', 'hoepel']},
			amount: Number,
			notes: String
		}
	],
	minimumPlayers: { type: Number, required: true },
	targetGroup: { type: Number, required: true },
	rules: [{type: String}],
	variation: [{
		description: {type: String, required: true},
		actions: [{type: String, required: true}]
	}]
})

export default gameSchema

