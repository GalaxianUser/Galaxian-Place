'use strict';

exports.BattleScripts = {
	init: function () {
		let moves = {};
		for (let type in this.data.TypeChart) moves[type] = [];
		for (let move in this.data.Movedex) moves[this.data.Movedex[move].type].push(move);
		delete moves.Normal;
		for (let i in this.data.Learnsets) {
			let pokemon = this.data.Pokedex[i];
			if (pokemon.num > 0) {
				let learnset = this.modData('Learnsets', i).learnset;
				for (let type in moves) {
					if (this.getImmunity(type, pokemon) && this.getEffectiveness(type, pokemon) > 0) {
						for (let move of moves[type]) {
							if (!learnset[move]) learnset[move] = [];
							let set = new Set(learnset[move]);
							for (let gen = pokemon.num >= 650 ? 6 : pokemon.num >= 494 ? 5 : pokemon.num >= 387 ? 4 : 3; gen <= this.gen; gen++) {
								if (!set.has(gen + 'L') && !set.has(gen + 'M') && !set.has(gen + 'T')) learnset[move].push(gen + 'T');
							}
						}
					}
				}
			}
		}
	},
};
