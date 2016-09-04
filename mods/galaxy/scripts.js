"use strict";

exports.BattleScripts = {
	randomGalaxyTeam: function (side) {
		let team = [];
		let variant = (this.random(2) === 1);
		let sets = {
			'???': {
				species: 'Mew', ability: 'Aura Break', item: 'Mental Herb', gender: 'M',
				moves: ['recover', 'celebrate', 'darkpulse', 'hypnosis'],
				evs: {spa:252, spd:252, spe:4,}, nature: 'Timid',
			},	
			'adelkorbi': {
				species: 'Charizard', ability: 'Solar Power', item: 'Charizardite Y', gender: 'M',
				moves: ['fireblast', 'solarbeam', 'airslash', 'happyhour'],
				evs: {def:4, spa:252, spe:252}, nature: 'Timid',
			},
			'alakaking': {
				species: 'Alakazam', ability: 'Parental Bond', item: 'Alakazite', gender: 'M',
				moves: ['playrough', 'ironhead', 'flareblitz', 'celebrate'],
				evs: {hp:4, atk:252, spe:252}, nature: 'Jolly',
			},
			'Andry~PM': {
				species: 'Diancie-Mega', ability: 'Pixilate', item: 'Leftovers', gender: 'M',
				moves: ['extremespeed', 'fake out', 'celebrate', 'earthquake'],
				evs: {hp:4, atk:252, spe:252,}, nature: 'Jolly',
			},
			'Based P.B': {
				species: 'Drifloon', ability: 'Prankster', item: 'Eviolite', gender: 'M',shiny: true,
				moves: ['recover', 'willowisp', 'darkpulse', 'holdhands'],
				evs: {hp:252, def:112, spd:144}, nature: 'Careful',
			},
			'bla <3': {
				species: 'Giratina-Origin', ability: 'Adaptability', item: 'Griseous Orb', gender: 'M',
				moves: ['spacialrend', 'shadowball', 'happyhour', 'recover'],
				evs: {def:4, spa:252, spe:252}, nature: 'Timid',
			},
			'ChikoRanium': {
				species: 'Meganium', ability: 'Simple', item: 'Leftovers', gender: 'M',
				moves: ['quiverdance', 'storedpower', 'celebrate', 'recover'],
				evs: {hp:252, def:252, spa:4}, nature: 'Bold',
			},
			'DaniPika97': {
				species: 'Pikachu', ability: 'Speed Boost', item: 'Light Ball', gender: 'M',
				moves: ['volttackle', 'icebeam', 'protect', 'happyhour'],
				evs: {hp:4, atk:196, spa:56, spe:252}, nature: 'Hasty',
			},
			'DarkChampionMew2': {
				species: 'Mewtwo', ability: 'Prankster', item: 'Leftovers', gender: 'M',
				moves: ['psychocut', 'taunt', 'recover', 'celebrate'],
				evs: {hp:252, atk:4, def:128, spd:128}, nature: 'Careful',
			},
			'Dlyvk': {
				species: 'Lucario-Mega', ability: 'Adaptability', item: 'Fist Plate', gender: 'M',
				moves: ['closecombat', 'bulletpunch', 'meteormash', 'celebrate'],
				evs: {atk:252, def:4, spe:252}, nature: 'Jolly',
			},
			'Emaxy': {
				species: 'Samurott', ability: 'Harvest', item: 'Sitrus Berry', gender: 'F',
				moves: ['bellydrum', 'waterfall', 'celebrate', 'bravebird'],
				evs: {hp:4, atk:252, spe:252}, nature: 'Jolly',
			},
			'Galaxy Bot': {
			  	species: 'Magnezone', ability: 'Sheer Force', item: 'Life Orb', gender: 'M',
				moves: ['flashcannon', 'thunderbolt', 'flamethrower', 'happyhour'],
				evs: {spa:252, spd:4, spe:252,}, nature: 'Modest',
			},
			'Ghesisect': {
			  	species: 'Xatu', ability: 'Magic Bounce', item: 'Leftovers', gender: 'M',
				moves: ['psystrike', 'happyhour', 'focusblast', 'shadowball'],
				evs: {hp:4, spa:252, spe:252,}, nature: 'Timid',
			},
			'Goomy Bot': {
				species: 'Ledian', ability: 'Compound Eyes', item: 'Life Orb', gender: 'M',
				moves: ['nastyplot', 'hurricane', 'bugbuzz', 'celebrate'],
				evs: {hp:252, spa:252, def:4}, nature: 'Timid',
			},
			'Great Max na Oreh!': {
				species: 'Breloom', ability: 'Technician', item: 'Focus Sash', gender: 'M',
				moves: ['bulletseed', 'machpunch', 'shiftgear', 'celebrate'],
				evs: {atk:252, def:4, spe:252}, nature: 'Adamant',
			},
			'HAXorus24': {
				species: 'Haxorus', ability: 'Protean', item: 'Life Orb', gender: 'M', shiny: true,
				moves: ['dragonrush', 'precipiceblades', 'holdhands'', 'dragondance'],
				evs: {hp:4, atk:252, spe:252}, nature: 'Jolly',
			},
			'Hazard': {
				species: 'Latios', ability: 'No Guard', item: 'Soul Dew', gender: 'M',
				moves: ['spacialrend', 'psystrike', 'hurricane', 'celebrate'],
				evs: {def: 8, spa:252, spe:252}, nature: 'Timid',
			},
			'HHolden': {
				species: 'Terrakion', ability: 'Pure Power', item: 'Choice Band', gender: 'M',
				moves: ['closecombat', 'stoneedge', 'vcreate', 'holdhands'],
				evs: {atk:252, def:4, spe:252,}, nature: 'Adamant',
			},
			'Hydreigon106': {
				species: 'Hydreigon', ability: 'Protean', item: 'Choice Scarf', gender: 'M',
				moves: ['dracometeor', 'darkpulse', 'fireblast', 'happyhour'],
				evs: {def:4, spa:252, spe:252,}, nature: 'Timid',
			},
			'InuAway': {
				species: 'Lunatone', ability: 'Simple', item: 'Leftovers', gender: 'M',
				moves: ['ancientpower', 'celebrate', 'cosmicpower', 'recover'],
				evs: {hp: 252, def:84, spd:174}, nature: 'Calm',
			},
			'LaCoopSeiTu': {
				species: 'Pikachu-Rock-Star', ability: 'Prankster', item: 'Eviolite', gender: 'M',
				moves: ['extremespeed', 'holdhands', 'volttackle', 'earthquake'],
				evs: {hp:252, def:4, spe: 252}, nature: 'Jolly',
			},
			'Lepter': {
				species: 'Butterfree', ability: 'Compound Eyes', item: 'Life Orb', gender: 'M',
				moves: ['bugbuzz', 'hurricane', 'gigadrain', 'celebrate'],
				evs: {hp:4, spa:252, spe:252}, nature: 'Timid',
			},
			'l\'hackuo': {
				species: 'Infernape', ability: 'Levitate', item: 'Life Orb', gender: 'M',
				moves: ['flareblitz', 'earthquake', 'celebrate', 'machpunch'],
				evs: {atk:252, def:4, spe:252}, nature: 'Jolly',
			},
			'Margdoor': {
				species: 'Torterra', ability: 'Magic Guard', item: 'Life Orb', gender: 'M',
				moves: ['woodhammer', 'headsmash', 'happyhour', 'bravebird'],
				evs: {hp:252, atk:252, spe:4}, nature: 'Adamant',
			},
			'MaxDrakon': {
				species: 'Garchomp', ability: 'Multiscale', item: 'Garchompite', gender: 'M',
				moves: ['earthquake', 'celebrate', 'fireblast', 'dragonclaw'],
				evs: {hp:4, atk:252, spe:252}, nature: 'Lonely',
			},
			'Mega Bruh': {
				species: 'Charizard', ability: 'Adaptability', item: 'Charizardite X', gender: 'M',shiny: true,
				moves: ['firepunch', 'earthquake', 'holdhands', 'dragonclaw'],
				evs: {hp:4, atk:252, speed:252}, nature: 'Jolly',
			},
			'Melody.L': {
			  	species: 'Meloetta', ability: 'Regenerator', item: 'Assault Vest', gender: 'F',
				moves: ['boomburst', 'psystrike', 'celebrate', 'aurasphere'],
				evs: {hp:160 , spa:252, spe:96,}, nature: 'Modest',
			},
			'Oneye': {
				species: 'Jirachi', ability: 'Pure Power', item: 'Leftovers', gender: 'M',
				moves: ['kingsshield', 'ironhead', 'icepunch', 'happyhour'],
				evs: {hp:216, spd:184, spe:108,}, nature: 'Careful',
			},
			'Peter Pan PM': {
			  	species: 'Dragonair', ability: 'Multiscale', item: 'Dragon Fang', gender: 'M',
				moves: ['icebeam', 'hydropump', 'happyhour', 'dracometeor'],
				evs: {hp:4 , spa:252, spe:252,}, nature: 'Modest',
			},
			'Phoenix Wright': {
				species: 'Braviary', ability: 'Aerilate', item: 'Lum Berry', gender: 'M',shiny: true,
				moves: ['return', 'holdhands', 'roost', 'highjumpkick'],
				evs: {hp:120, atk:252, spe:136}, nature: 'Adamant',
			},
			'Pogba': {
				species: 'Slowbro', ability: 'Illusion', item: 'Life Orb', gender: 'M',
				moves: ['originpulse', 'recover', 'celebrate', 'magmastorm'],
				evs: {hp:252, spa:252, spd:4}, nature: 'Modest',
			},
			'Pokekit': {
				species: 'Shaymin-Sky', ability: 'Protean', item: 'Sitrus Berry', gender: 'M',
				moves: ['seedflare', 'blueflare', 'celebrate','recover'],
				evs: {hp:4, spa:252, spe:252}, nature: 'Modest',
			},
			'R@teMyTe@m': {
				species: 'Lickilicky', ability: 'Simple', item: 'Sitrus Berry', gender: 'M',
				moves: ['swordsdance', 'playrough', 'precipiceblades', 'happyhour'],
				evs: {hp:248, atk:252, spd:8}, nature: 'Adamant',
			},
			'Ray91': {
				species: 'Garbodor', ability: 'Levitate', item: 'Black Sludge', gender: 'M',
				moves: ['heavyslam', 'gunkshot', 'holdhands', 'slackoff'],
				evs: {hp:248, def:252, spd:8}, nature: 'Bold',
			},
			'Red0 PM': {
				species: 'Swampert', ability: 'Drizzle', item: 'Swampertite', gender: 'M',
				moves: ['bellydrum', 'waterfall', 'celebrate', 'earthquake'],
				evs: {atk:252, def:4, spe:252}, nature: 'Adamant',
			},
			'RedCardForretress': {
				species: 'Forretress', ability: 'Sturdy', item: 'Red Card', gender: 'M',
				moves: ['stealthrock', 'spikes', 'celebrate', 'uturn'],
				evs: {hp:252, def:252, spd:4}, nature: 'Bold',
			},
			'SamuelBest': {
				species: 'Dragonite', ability: 'Flash Fire', item: 'Flame Plate', gender: 'M',
				moves: ['roost', 'happyhour', 'dragonclaw', 'firepunch'],
				evs: {hp:92, atk:192, spd:32, speed:192}, nature: 'Adamant',
			},
			'SamuZan': {
				species: 'Dunsparce', ability: 'Parental Bond', item: 'Leftovers',
				moves: ['dragondance', 'return', 'outrage', 'celebrate'],
				evs: {atk:252, def:4, spe:252,}, nature: 'Adamant',
			},
			'Shadia': {
				species: 'Zoroark', ability: 'Bad Dreams', item: 'Leftovers', gender: 'F',
				moves: ['darkpulse', 'substitute', 'happyhour', 'tailglow'],
				evs: {def:4, spa:252, spe:252,}, nature: 'Timid',
			},
			'Sunding': {
				species: 'Arceus', ability: 'Simple', item: 'Chople Berry', gender: 'M',shiny: true,
				moves: ['tailglow', 'boomburst', 'happyhour', 'shadowball'],
				evs: {spa:252, def:4, spe:252}, nature: 'Timid',
			},
			'TheR4m_': {
				species: 'Weavile', ability: 'Moxie', item: 'Life Orb', gender: 'M',
				moves: ['iciclecrash', 'holdhands', 'knockoff', 'bravebird'],
				evs: {hp:4, atk:252, spe:252}, nature: 'Jolly',
			},
			'Waifu99': {
				species: 'Mega-Mewtwo-X', ability: 'Shell Armor', item: 'Power Herb', gender: 'M',
				moves: ['geomancy', 'secretsword', 'celebrate', 'taunt'],
				evs: {def:4, spa:252, spe:252,}, nature: 'Timid',
			},
			'Xtradollar $even': {
				species: 'Manaphy', ability: 'Simple', item: 'Leftovers', gender: 'M',
				moves: ['calmmind', 'scald', 'icebeam', 'happyhour'],
				evs: {hp:248, def:252, spd:8,}, nature: 'Impish',
			},
			'Zeus Mike': {
				species: 'Cacturne', ability: 'Parental Bond', item: 'Choice Band', gender: 'M',
				moves: ['hornleech', 'suckerpunch', 'holdhands', 'iciclecrash'],
				evs: {atk:252, def:4, spe:252}, nature: 'Jolly',
			},
		};

		// Generate the team randomly.
		let pool = Object.keys(sets);
		for (let i = 0; i < 6; i++) {
			let name = this.sampleNoReplace(pool);
			let set = sets[name];
			set.level = 100;
			set.name = name;
			if (!set.ivs) {
				set.ivs = {hp:31, atk:31, def:31, spa:31, spd:31, spe:31};
			} else {
				for (let iv in {hp:31, atk:31, def:31, spa:31, spd:31, spe:31}) {
					set.ivs[iv] = iv in set.ivs ? set.ivs[iv] : 31;
				}
			}
			// Assuming the hardcoded set evs are all legal.
			if (!set.evs) set.evs = {hp:84, atk:84, def:84, spa:84, spd:84, spe:84};
			set.moves = [this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves)];
			team.push(set);
		}

		return team;
	},
};
