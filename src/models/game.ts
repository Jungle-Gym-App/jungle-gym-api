import { Schema } from "mongoose";

export enum category {
	tikspel ='tikspel',
	bal = 'balspel',
	loop = 'loopspel',
	reactie = 'reactiespel'
}

export enum materialName {
	lint = 'lintje',
	fluit = 'fluitje',
	hoepel = 'hoepel'
}

export interface material {
	name: materialName;
	amount?: number | string;
	notes?: string;
}

export interface GameVariations {
	title: string,
	actions: string[]
}

export interface Game {
	title: string
	description: string
	category: category
	materials: material[]
	minimumPlayers: number
	targetGroup: number[]
	rules?: string[]
	variation?: string[] | GameVariations[]
}

const gameSchema = new Schema<Game>({
	title: { type: String, required: true },
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
		title: {type: String, required: true},
		actions: [{type: String, required: true}]
	}]
})

export default gameSchema

