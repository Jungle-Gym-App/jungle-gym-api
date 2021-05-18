import { Game, category, materialName } from '#models/game'

export const games: Game[] = [
	{
		name: 'Kat en Muis',
		description: 'Er wordt een kat gekozen, de rest is een muis. Ben je een muis, dan stop je een lintje in je broek, zodat het lijkt op een staart. Het doel van het spel is dat de katten de muizen vangen. Dit doen ze door een lintje uit de broek te trekken. Als dit is gelukt moet het lintje aan de juf of meester gegeven worden. Is jouw lintje afgepakt? Dan ga je aan de kant zitten. Het spel is afgelopen als alle lintjes gepakt zijn.',
		category: category.tik,
		materials: [{
			name: materialName.lint,
			notes: 'Even veel lintjes als leerlingen'
		}],
		minimumPlayers: 5,
		targetGroup: [1,2,3,4,5,6,7,8],
		rules: ['Lintje moet zichtbaar zijn voor de kat'],
		variation: [
			{
				description: 'Makkelijker kat/moeilijker muis',
				actions: ['Met meerdere katten beginnen', 'Af? Dan word je ook een kat (bij een groep van 15 tot 30 leerlingen)', 'Iedereen is een kat en iedereen is een muis, wordt jouw lintje afgepakt dan probeer je zo snel mogelijk een nieuw lintje af te pakken. Heb je een staart en pak je er nog een af, dan doe je die schuin om je nek.']
			},
			{
				description: 'Moeilijker kat/makkelijker muis',
				actions: ['Met minder katten beginnen', 'Staarten korter, meer in de broek stoppen','Af? Dan aan de kant staan']
			}
		]
	}
]
