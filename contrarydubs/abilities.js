exports.BattleAbilities = {
    "angerpoint": {
        inherit: true,
        onAfterDamage: function (damage, target, source, move) {
            if (!target.hp) return;
            if (move && move.effectType === 'Move' && move.crit) {
                target.setBoost({atk: 6});
                this.add('-setboost', target, 'atk', -12, '[from] ability: Anger Point');
            }
        }
    },
    "chlorophyll": {
        inherit: true,
        onModifySpe: function (speMod) {
            if (this.isWeather(['sunnyday', 'desolateland'])) {
                return this.chain(speMod, -2);
            }
        }
    },
    "compoundeyes": {
        inherit: true,
        onSourceAccuracy: function (accuracy) {
            if (typeof accuracy !== 'number') return;
            this.debug('compoundeyes - decreasing accuracy');
            return accuracy / 1.3;
        }
    },
    "defeatist": {
        inherit: true,
        onModifyAtk: function (atk, pokemon) {
            if (pokemon.hp < pokemon.maxhp / 2) {
                return this.chainModify(2);
            }
        },
        onModifySpA: function (spa, pokemon) {
            if (pokemon.hp < pokemon.maxhp / 2) {
                return this.chainModify(2);
            }
        }
    },
    "flowergift": {
        inherit: true,
        onAllyModifyAtk: function (atk) {
            if (this.effectData.target.template.speciesid !== 'cherrim') return;
            if (this.isWeather(['sunnyday', 'desolateland'])) {
                return this.chainModify(2/3);
            }
        },
        onAllyModifySpD: function (spd) {
            if (this.effectData.target.template.speciesid !== 'cherrim') return;
            if (this.isWeather(['sunnyday', 'desolateland'])) {
                return this.chainModify(2/3);
            }
        }
    },
    "furcoat": {
        inherit: true,
        onModifyDef: function (def) {
            return this.chainModify(0.5);
        }
    },
    "guts": {
        inherit: true,
        onModifyAtk: function (atk, pokemon) {
            if (pokemon.status) {
                return this.chainModify(2/3);
            }
        }
    },
    "hugepower": {
        inherit: true,
        onModifyAtk: function (atk) {
            return this.chainModify(0.5);
        }
    },
    "hustle": {
        inherit: true,
        onModifyAtk: function (atk) {
            return this.modify(atk, 2/3);
        },
        onModifyMove: function (move) {
            if (move.category === 'Physical' && typeof move.accuracy === 'number') {
                move.accuracy *= 1.25;
            }
        }
    },
    "marvelscale": {
        inherit: true,
        onModifyDef: function (def, pokemon) {
            if (pokemon.status) {
                return this.chainModify(2/3);
            }
        }
    },
    "minus": {
        inherit: true,
        onModifySpA: function (spa, pokemon) {
            var allyActive = pokemon.side.active;
            if (allyActive.length === 1) {
                return;
            }
            for (var i = 0; i < allyActive.length; i++) {
                if (allyActive[i] && allyActive[i].position !== pokemon.position && !allyActive[i].fainted && allyActive[i].hasAbility(['minus', 'plus'])) {
                    return this.chainModify(2/3);
                }
            }
        }
    },
    "plus": {
        inherit: true,
        onModifySpA: function (spa, pokemon) {
            var allyActive = pokemon.side.active;
            if (allyActive.length === 1) {
                return;
            }
            for (var i = 0; i < allyActive.length; i++) {
                if (allyActive[i] && allyActive[i].position !== pokemon.position && !allyActive[i].fainted && allyActive[i].hasAbility(['plus', 'minus'])) {
                    return this.chainModify(2/3);
                }
            }
        }
    },
    "purepower": {
        inherit: true,
        onModifyAtk: function (atk) {
            return this.chainModify(0.5);
        }
    },
    "quickfeet": {
        inherit: true,
        onModifySpe: function (speMod, pokemon) {
            if (pokemon.status) {
                return this.chain(speMod, 2/3);
            }
        }
    },
    "sandrush": {
        inherit: true,
        onModifySpe: function (speMod, pokemon) {
            if (this.isWeather('sandstorm')) {
                return this.chain(speMod, 0.5);
            }
        }
    },
    "sandveil": {
        inherit: true,
        onAccuracy: function (accuracy) {
            if (typeof accuracy !== 'number') return;
            if (this.isWeather('sandstorm')) {
                this.debug('Sand Veil - increasing accuracy');
                return accuracy * 1.25;
            }
        }
    },
    "slowstart": {
        inherit: true,
        effect: {
            duration: 5,
            onStart: function (target) {
                this.add('-start', target, 'Slow Start');
            },
            onModifyAtkPriority: 5,
            onModifyAtk: function (atk, pokemon) {
                return this.chainModify(2);
            },
            onModifySpe: function (speMod, pokemon) {
                return this.chain(speMod, 2);
            },
            onEnd: function (target) {
                this.add('-end', target, 'Slow Start');
            }
        }
    },
    "snowcloak": {
        inherit: true,
        onAccuracy: function (accuracy) {
            if (typeof accuracy !== 'number') return;
            if (this.isWeather('hail')) {
                this.debug('Snow Cloak - increasing accuracy');
                return accuracy * 1.25;
            }
        }
    },
    "solarpower": {
        inherit: true,
        onModifySpA: function (spa, pokemon) {
            if (this.isWeather(['sunnyday', 'desolateland'])) {
                return this.chainModify(2/3);
            }
        },
        onWeather: function (target, source, effect) {
            if (effect.id === 'sunnyday' || effect.id === 'desolateland') {
                this.heal(target.maxhp / 8);
            }
        }
    },
    "swiftswim": {
        inherit: true,
        onModifySpe: function (speMod, pokemon) {
            if (this.isWeather(['raindance', 'primordialsea'])) {
                return this.chain(speMod, 0.5);
            }
        }
    },
    "tangledfeet": {
        inherit: true,
        onAccuracy: function (accuracy, target) {
            if (typeof accuracy !== 'number') return;
            if (target && target.volatiles['confusion']) {
                this.debug('Tangled Feet - increasing accuracy');
                return accuracy * 2;
            }
        }
    },
    "unburden": {
        inherit: true,
        effect: {
            onModifySpe: function (speMod, pokemon) {
                if (!pokemon.item) {
                    return this.chain(speMod, 0.5);
                }
            }
        }
    },
    "victorystar": {
        inherit: true,
        onAllyModifyMove: function (move) {
            if (typeof move.accuracy === 'number') {
                move.accuracy *= 10/11;
            }
        }
    }
};
