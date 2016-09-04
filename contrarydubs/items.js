exports.BattleItems = {
    "choiceband": {
        inherit: true,
        onModifyAtk: function (atk) {
            return this.chainModify(2/3);
        }
    },
    "choicescarf": {
        inherit: true,
        onModifySpe: function (speMod) {
            return this.chain(speMod, 2/3);
        }
    },
    "choicespecs": {
        inherit: true,
        onModifySpA: function (atk) {
            return this.chainModify(2/3);
        }
    },
    "deepseascale": {
        inherit: true,
        onModifySpD: function (spd, pokemon) {
            if (pokemon.baseTemplate.species === 'Clamperl') {
                return this.chainModify(0.5);
            }
        }
    },
    "deepseatooth": {
        inherit: true,
        onModifySpA: function (spa, pokemon) {
            if (pokemon.baseTemplate.species === 'Clamperl') {
                return this.chainModify(0.5);
            }
        }
    },
    "eviolite": {
        inherit: true,
        onModifyDef: function (def, pokemon) {
            if (pokemon.baseTemplate.nfe) {
                return this.chainModify(2/3);
            }
        },
        onModifySpD: function (spd, pokemon) {
            if (pokemon.baseTemplate.nfe) {
                return this.chainModify(2/3);
            }
        }
    },
    "ironball": {
        inherit: true,
        onModifySpe: function (speMod) {
            return this.chain(speMod, 2);
        }
    },
    "lightball": {
        inherit: true,
        onModifyAtk: function (atk, pokemon) {
            if (pokemon.baseTemplate.baseSpecies === 'Pikachu') {
                return this.chainModify(0.5);
            }
        },
        onModifySpA: function (spa, pokemon) {
            if (pokemon.baseTemplate.baseSpecies === 'Pikachu') {
                return this.chainModify(0.5);
            }
        }
    },
    "metalpowder": {
        inherit: true,
        onModifyDef: function (def, pokemon) {
            if (pokemon.template.species === 'Ditto') {
                return this.chainModify(0.6);
            }
        }
    },
    "widelens": {
        inherit: true,
        onModifyMove: function (move, user, target) {
            if (typeof move.accuracy === 'number') {
                move.accuracy *= 10/11;
            }
        }
    },
    "zoomlens": {
        inherit: true,
        onModifyMove: function (move, user, target) {
            if (typeof move.accuracy === 'number' && !this.willMove(target)) {
                this.debug('Zoom Lens reducing accuracy');
                move.accuracy *= 5/6;
            }
        }
    }
};