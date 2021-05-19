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
	},
	{
		name: 'Pionnenroof',
		description: 'Er worden twee teams gemaakt. De spelers uit 1 team zijn de rovers, de spelers uit het andere team zijn de tikkers. Beide teams beginnen aan hun eigen kant van het veld. De tikkers hebben voor hen een rij met pionnen. Voor de rovers is het doel om zoveel mogelijk pionnen te roven. Zodra een rover een pion heeft gepakt mag deze getikt worden door een tikker. De rover moet proberen zonder getikt te worden de pion over de eigen achterlijn te krijgen. Ben je wel getikt? Dan moet de pion weer teruggelegd worden. Hoeveel pionnen kunnen de rovers pakken binnen 2 minuten?',
		category: category.tik,
		materials: [{
			name: materialName.pion,
			amount: 20,
			notes: 'of hoedjes',
		},
		{
			name: materialName.lint,
			notes: 'om eventueel teams duidelijk te verdelen',
		},
		{
			name: materialName.klok,
			notes: 'om de tijd bij de houden',
		},
		{
			name: materialName.fluit,
		}
		],
		minimumPlayers: 2,
		targetGroup: [1,2,3,4,5,6,7,8],
		rules: [ 'Rover met pion over de eigen lijn? Pion houden', 'Rover met pion getikt voordat eigen lijn bereikt is? Pion inleveren aan tikker', 'Tikker mag rover pas tikker als deze een pion gepakt heeft'],
		variation: [
			{
				description: 'Makkelijker voor de tikkers/moeilijker voor de rovers',
				actions: ['1 leerling tegelijk laten roven', 'Afstand tussen startlijn en tikker vergroten', '2 tikkers gebruiken']
			},
			{
				description: 'Moelijker voor de tikkers/makkelijker voor de rovers:',
				actions: ['Alle leerlingen tegelijk laten starten met roven', 'Speelveld kleiner maken']
			}
		]
	},
	{
		name: 'Fopbal',
		description: 'Maak een grote kring met één iemand in het midden (de fopper), die heeft de bal. De leerlingen in de kring (de vangers) houden de handen achter de rug. De leerling in het midden mag steeds de bal echt of nep (fop) gooien. Gooit de leerling nep, maar komen jouw handen wel zichtbaar achter jouw rug vandaag? Dan ben je af en ga je zitten. Gooit de leerling de bal echt maar vang jij deze niet? Dan ben je ook af en ga je zitten. Vang je de bal wel of blijven je handen netjes achter je rug als de fopper jou fopt? Dan blijf je meedoen. De laatste die over blijft wint en wordt de nieuwe fopper nemen.',
		category: category.bal,
		materials: [{
			name: materialName.bal,
			amount: 1
		},
		{
			name: materialName.fluit,
		}
		],
		minimumPlayers: 3,
		targetGroup: [1,2,3,4,5,6,7,8],
		rules: ['Bal onderhands gooien', 'Een slecht aangegooide bal telt niet, opnieuw proberen'],
		variation: [
			{
				description: 'Makkelijker',
				actions: ['Alle leerlingen in de kring hebben een extra kans. Tweede keer fout gemaakt? Dan pas ben je echt af en ga je zitten.', 'Kring groter maken om afstand van het gooien te vergroten.']
			},
			{
				description: 'Moeilijker',
				actions: ['Kring kleiner maken om afstand van gooien te verkleinen.']
			}
		]
	},
	{
		name: 'Moeder hoe laat is het?',
		description: 'De leerlingen maken een rij naast elkaar voor de pionnen, de docent gaat tegenover de leerlingen staan op minimaal 10 meter afstand. De docent is de ‘moeder’, de leerlingen zijn de kinderen. Op het teken van de docent zeggen de kinderen tegelijk ‘Moeder, moeder, hoe laat is het?’, dan kiest de docent een getal (1 t/m 12). Kiest de docent het getal 3 dan zegt hij/zij ‘Het is 3 uur’. Dan zetten de kinderen tegelijk 3 stappen vooruit. Daarna vragen ze opnieuw ‘Moeder, moeder, hoe laat is het?’, weer kiest de docent een getal en zegt bijvoorbeeld ‘Het is 8 uur’, de kinderen zetten nu tegelijk 8 stappen vooruit. Dit gaat zo door totdat het antwoord van de docent is ‘Het is bedtijd!’, dan moeten de kinderen zo snel mogelijk terugrennen naar de startlijn terwijl de docent probeert een van de kinderen te pakken. Is het de docent gelukt om een van de kinderen te pakken dan is dat kind de volgende ronde de ‘moeder’.',
		category: category.loop,
		materials: [
			{
				name: materialName.lint,
				amount: 1,
				notes: 'voor de moeder'
			},
			{
				name: materialName.pion,
				amount: 10,
				notes: 'om de startlijn te maken'
			}
		],
		minimumPlayers: 5,
		targetGroup: [1, 2, 3, 4, 5],
		rules: ['De kinderen moeten steeds tegelijk vragen ‘Moeder, moeder, hoe laat is het?’', 'Zegt moeder dat het 5 uur is, dan zetten de kinderen 5 stappen', 'Tijdens het lopen tellen de kinderen hardop de stappen'],
		variation: [
			{
				description: 'Makkelijker moeder/moeilijker kinderen',
				actions: ['Twee moeders','geven om de beurt aan hoe laat het is en bij \'Bedtijd!\' proberen ze allebei een kind te pakken.']
			},
			{
				description: 'Moeilijker moeder/makkelijker kinderen',
				actions: ['Tijdens het lopen tellen de kinderen hardop de stappen']
			}
		]
	},
	{
		name: 'Dieren parade',
		description: 'Bij dit spel is het de bedoeling dat de leerlingen zoveel mogelijk dieren gaan uitbeelden. Maak met pionnen twee lijnen met een aantal meter ertussen (ongeveer 10 meter). De leerlingen maken een rij naast elkaar op een van de lijnen, iedereen moet voldoende ruimte hebben en alle leerlingen kijken dezelfde kant op. De docent noemt een dier en de leerlingen lopen naar de overkant als het genoemde dier. Het is geen snelheidswedstrijd! Het gaat erom wie het beste dat dier na kan doen.',
		category: category.loop,
		materials: [
			{
				name: materialName.pion,
				amount: 10,
				notes: 'Je kan meer pionnen gebruiken om de lijnen beter zichtbaar te maken'
			}
		],
		minimumPlayers: 3,
		targetGroup: [1, 2, 3],
		rules: ['Het is geen wedstrijd', 'Ben je aan de overkant aangekomen dan draai je je weer om en ga je klaarstaan voor het volgende dier'],
		variation: ['Als het goed gaat kan je aan de leerlingen vragen of zij nog dieren kennen']
	},
	{
		name: 'Annemaria Koekoek',
		description: 'De leerlingen maken een rij naast elkaar op de startlijn. De docent staat op minimaal 10 meter afstand tegenover de leerlingen, de docent is de zoeker.  De zoeker draait zich met de rug naar de leerlingen toe en roept ‘’Annemaria Koekoek’, nu mogen de leerlingen proberen naar voren te lopen. Als de zoeker klaar is met roepen, draait deze zich om. De leerlingen moeten stoppen met lopen zodra de zoeker zich heeft omgedraaid. Als een leerling beweegt en de zoeker ziet dit, dan mag de zoeker de leerling terugsturen naar de startlijn. Bijvoorbeeld: ‘’Ja, (naam) jij bent af, ik zag je bewegen’. De leerling die af was, start opnieuw bij de startlijn en mag weer meedoen zodra de zoeker begint met roepen. De leerling die als eerste bij de zoeker is, heeft gewonnen en wordt de nieuwe zoeker.',
		category: category.loop,
		materials: [{
			name: materialName.pion,
			amount: 10,
			notes: 'om de startlijn te maken'
		}],
		minimumPlayers: 5,
		targetGroup: [1,2,3,4,5,6,7,8],
		rules: ['De leerling mag altijd lopen, maar zodra de zoeker je ziet is de kans groot dat je terug moet naar de startlijn.', 'Als een leerling loopt en de zoeker ziet het, dan is een leerling af.'],
		variation: [
			{
				description: 'Makkelijker zoekers/moeilijker lopers',
				actions: ['Twee zoekers bij de muur', 'De zoekers roepen samen Annemaria Koekoek', 'Bij het zoeken mogen ze beide kijken welke leerlingen er lopen']
			},
			{
				description: 'Moeilijker zoekers/makkelijker lopers',
				actions: ['Mee aan de hand van een docent of een andere leerling']
			}
		]
	}
]
