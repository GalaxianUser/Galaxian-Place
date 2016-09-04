'use strict';

exports.BattleScripts = {
	init: function() {
		for (let i in this.data.Pokedex) {
			let template = this.getTemplate(i);
			let stats = [];
			let baseStats = this.data.Pokedex[i].baseStats;
			for (let s in baseStats) {
				if (s !== 'hp' || !(template.isMega || template.isPrimal)) stats.push(baseStats[s]);
			}
			let lowest = Math.min.apply(Math, stats);
			let highest = Math.max.apply(Math, stats);
			for (let s in baseStats) {
				if (s == 'hp' && (template.isMega || template.isPrimal)) {
					baseStats.hp = this.getTemplate(this.data.Pokedex[i].baseSpecies).baseStats.hp;
				} else if (this.data.Pokedex[i].baseStats[s] === lowest) {
					baseStats[s] = highest;
				} else if (this.data.Pokedex[i].baseStats[s] === highest) {
					baseStats[s] = lowest;
				}
			}
			this.modData('Pokedex', i).baseStats = baseStats;
		}
	},
};
