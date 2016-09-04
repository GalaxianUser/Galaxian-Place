exports.BattleScripts = {
	init: function () {
		var typeCycle = {Normal: 'Dark', Dark: 'Grass', Grass: 'Rock', Rock: 'Flying', Flying: 'Ghost', Ghost: 'Fairy', Fairy: 'Bug', Bug: 'Steel', Steel: 'Ice', Ice: 'Poison', Poison: 'Fire', Fire: 'Psychic', Psychic: 'Ground', Ground: 'Fighting', Fighting: 'Water', Water: 'Electric', Electric: 'Dragon', Dragon: 'Normal'};
		
		//Batch Processing
		for (var i in this.data.Pokedex) {
			var types = this.data.Pokedex[i].types;
			var typec = [];
			for (var t = 0; t < types.length; t++) {
				typec[t] = (typeCycle[types[t]]) ? typeCycle[types[t]] : types[t];
			}
			this.modData('Pokedex', i).types = typec;
		}
		for (var i in this.data.Movedex) {
			var type = this.data.Movedex[i].type;
			this.modData('Movedex', i).type = (typeCycle[type]) ? typeCycle[type] : type;
		}
		for (var i in this.data.Items) {
			if (this.data.Items[i].onPlate) {
				var onPlate = this.data.Items[i].onPlate
				this.modData('Items', i).onPlate = (typeCycle[onPlate]) ? typeCycle[onPlate] : onPlate;
			}
		}
		
		//Cleanup [Moves]
		this.modData('Movedex', 'doomdesire').onTryHit = function (target, source) {
			source.side.addSideCondition('futuremove');
			if (source.side.sideConditions['futuremove'].positions[source.position]) {
				return false;
			}
			source.side.sideConditions['futuremove'].positions[source.position] = {
				duration: 3,
				move: 'doomdesire',
				targetPosition: target.position,
				source: source,
				moveData: {
					name: "Doom Desire",
					basePower: 140,
					category: "Special",
					flags: {},
					type: 'Ice'
				}
			};
			this.add('-start', source, 'Doom Desire');
			return null;
		};
		this.modData('Movedex', 'flyingpress').onEffectiveness = function (typeMod, type, move) {
			return typeMod + this.getEffectiveness('Ghost', type);
		};
		this.modData('Movedex', 'futuresight').onTryHit = function (target, source) {
			source.side.addSideCondition('futuremove');
			if (source.side.sideConditions['futuremove'].positions[source.position]) {
				return false;
			}
			source.side.sideConditions['futuremove'].positions[source.position] = {
				duration: 3,
				move: 'futuresight',
				targetPosition: target.position,
				source: source,
				moveData: {
					name: "Future Sight",
					basePower: 120,
					category: "Special",
					flags: {},
					ignoreImmunity: false,
					type: 'Ground'
				}
			};
			this.add('-start', source, 'move: Future Sight');
			return null;
		};
		this.modData('Movedex', 'judgment').onModifyMove = function (move, pokemon) {
			move.type = this.runEvent('Plate', pokemon, null, 'judgment', 'Dark');
		};
		this.modData('Movedex', 'stealthrock').effect.onSwitchIn = function (pokemon) {
			var typeMod = this.clampIntRange(pokemon.runEffectiveness('Flying'), -6, 6);
			this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
		};
		this.modData('Movedex', 'technoblast').onModifyMove = function (move, pokemon) {
			move.type = this.runEvent('Drive', pokemon, null, 'technoblast', 'Dark');
		};
		this.modData('Movedex', 'weatherball').onModifyMove = function (move) {
			switch (this.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.type = 'Psychic';
				break;
			case 'raindance':
			case 'primordialsea':
				move.type = 'Electric';
				break;
			case 'sandstorm':
				move.type = 'Flying';
				break;
			case 'hail':
				move.type = 'Poison';
				break;
			}
		};
		
		//Cleanup [Abilities]
		this.modData('Abilities', 'aerilate').onModifyMove = function (move, pokemon) {
			if (move.type === 'Dark' && move.id !== 'naturalgift') {
				move.type = 'Ghost';
				if (move.category !== 'Status') pokemon.addVolatile('aerilate');
			}
		};
		this.modData('Abilities', 'blaze').onModifyAtk = function (atk, attacker, defender, move) {
			if (move.type === 'Psychic' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Blaze boost');
				return this.chainModify(1.5);
			}
		};
		this.modData('Abilities', 'blaze').onModifySpA = function (atk, attacker, defender, move) {
			if (move.type === 'Psychic' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Blaze boost');
				return this.chainModify(1.5);
			}
		};
		this.modData('Abilities', 'darkaura').onAnyTryPrimaryHit = function (target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Grass') {
				source.addVolatile('aura');
			}
		};
		this.modData('Abilities', 'fairyaura').onAnyTryPrimaryHit = function (target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Bug') {
				source.addVolatile('aura');
			}
		};
		this.modData('Abilities', 'normalize').onModifyMove = function (move) {
			if (move.id !== 'struggle') {
				move.type = 'Dark';
			}
		};
		this.modData('Abilities', 'overgrow').onModifyAtk = function (atk, attacker, defender, move) {
			if (move.type === 'Rock' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Overgrow boost');
				return this.chainModify(1.5);
			}
		};
		this.modData('Abilities', 'overgrow').onModifySpA = function (atk, attacker, defender, move) {
			if (move.type === 'Rock' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Overgrow boost');
				return this.chainModify(1.5);
			}
		};
		this.modData('Abilities', 'pixilate').onModifyMove = function (move, pokemon) {
			if (move.type === 'Dark' && move.id !== 'naturalgift') {
				move.type = 'Bug';
				if (move.category !== 'Status') pokemon.addVolatile('pixilate');
			}
		};
		this.modData('Abilities', 'refrigerate').onModifyMove = function (move, pokemon) {
			if (move.type === 'Dark' && move.id !== 'naturalgift') {
				move.type = 'Poison';
				if (move.category !== 'Status') pokemon.addVolatile('refrigerate');
			}
		};
		this.modData('Abilities', 'sandforce').onBasePower = function (basePower, attacker, defender, move) {
			if (this.isWeather('sandstorm')) {
				if (move.type === 'Ice' || move.type === 'Fighting' || move.type === 'Flying') {
					this.debug('Sand Force boost');
					return this.chainModify([0x14CD, 0x1000]);
				}
			}
		},
		this.modData('Abilities', 'swarm').onModifyAtk = function (atk, attacker, defender, move) {
			if (move.type === 'Steel' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Swarm boost');
				return this.chainModify(1.5);
			}
		};
		this.modData('Abilities', 'swarm').onModifySpA = function (atk, attacker, defender, move) {
			if (move.type === 'Steel' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Swarm boost');
				return this.chainModify(1.5);
			}
		};
		this.modData('Abilities', 'torrent').onModifyAtk = function (atk, attacker, defender, move) {
			if (move.type === 'Electric' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Torrent boost');
				return this.chainModify(1.5);
			}
		};
		this.modData('Abilities', 'torrent').onModifySpA = function (atk, attacker, defender, move) {
			if (move.type === 'Electric' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Torrent boost');
				return this.chainModify(1.5);
			}
		};
		
		//Cleanup [Arceus]
		this.modData('Statuses', 'arceus').onSwitchIn = function (pokemon) {
			var type = 'Dark';
			if (pokemon.ability === 'multitype') {
				type = pokemon.getItem().onPlate;
				if (!type || type === true) {
					type = 'Dark';
				}
			}
			pokemon.setType(type, true);
		};
	}
};
};
