"use strict";

exports.BattleScripts = {
	randomSummerCup2016Team: function (side) {
		let team = [];
		let variant = (this.random(2) === 1);
		let sets = {
		'Weedle': {
				species: 'Weedle', ability: 'Light Metal', item: 'Black Glasses', gender: 'M',
				moves: ['roost', 'toxic', 'oblivionwing', 'seismictoss'],
				evs: {def:252, spd:252, spe:4,},  nature: 'Adamant',
			},
	    'Kyogre': {
				species: 'Kyogre-Primal', ability: 'Desolate Land', item: 'Choice Specs', gender: 'M',
				moves: ['hydropump', 'bodyslam', 'thunderpunch', 'rage'],
				evs: {atk:252, def:252, spe:4,},  nature: 'Timid',
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