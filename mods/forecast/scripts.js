'use strict';
 
exports.BattleScripts = {
    nextTurn: function () {
        this.turn++;
        if (this.turn % 12 === 1) {
            //this.clearWeather();
            this.setWeather('hail');
        }
        else if (this.turn % 12 === 4) {
            //this.clearWeather();
            this.setWeather('sunnyday');
        }
        else if (this.turn % 12 === 7) {
            //this.clearWeather();
            this.setWeather('sandstorm');
        }
        else if (this.turn % 12 === 10) {
            //this.clearWeather();
            this.setWeather('raindance');
        }
        let allStale = true;
        let oneStale = false;
        for (let i = 0; i < this.sides.length; i++) {
            for (let j = 0; j < this.sides[i].active.length; j++) {
                let pokemon = this.sides[i].active[j];
                if (!pokemon) continue;
                pokemon.moveThisTurn = '';
                pokemon.usedItemThisTurn = false;
                pokemon.newlySwitched = false;
                pokemon.disabledMoves = {};
                this.runEvent('DisableMove', pokemon);
                if (!pokemon.ateBerry) pokemon.disableMove('belch');
                if (pokemon.lastAttackedBy) {
                    if (pokemon.lastAttackedBy.pokemon.isActive) {
                        pokemon.lastAttackedBy.thisTurn = false;
                    } else {
                        pokemon.lastAttackedBy = null;
                    }
                }
 
                pokemon.trapped = pokemon.maybeTrapped = false;
                this.runEvent('TrapPokemon', pokemon);
                if (pokemon.runStatusImmunity('trapped')) {
                    this.runEvent('MaybeTrapPokemon', pokemon);
                }
                // Disable the faculty to cancel switches if a foe may have a trapping ability
                for (let i = 0; i < this.sides.length; ++i) {
                    let side = this.sides[i];
                    if (side === pokemon.side) continue;
                    for (let j = 0; j < side.active.length; ++j) {
                        let source = side.active[j];
                        if (!source || source.fainted) continue;
                        let template = (source.illusion || source).template;
                        if (!template.abilities) continue;
                        for (let k in template.abilities) {
                            let ability = template.abilities[k];
                            if (ability === source.ability) {
                                // pokemon event was already run above so we don't need
                                // to run it again.
                                continue;
                            }
                            if (k === 'H' && template.unreleasedHidden) {
                                // unreleased hidden ability
                                continue;
                            }
                            if (pokemon.runStatusImmunity('trapped')) {
                                this.singleEvent('FoeMaybeTrapPokemon',
                                    this.getAbility(ability), {}, pokemon, source);
                            }
                        }
                    }
                }
 
                if (pokemon.fainted) continue;
                if (pokemon.isStale < 2) {
                    if (pokemon.isStaleCon >= 2) {
                        if (pokemon.hp >= pokemon.isStaleHP - pokemon.maxhp / 100) {
                            pokemon.isStale++;
                            if (this.firstStaleWarned && pokemon.isStale < 2) {
                                switch (pokemon.isStaleSource) {
                                case 'struggle':
                                    this.add('html', '<div class="broadcast-red">' + this.escapeHTML(pokemon.name) + ' isn\'t losing HP from Struggle. If this continues, it will be classified as being in an endless loop.</div>');
                                    break;
                                case 'drag':
                                    this.add('html', '<div class="broadcast-red">' + this.escapeHTML(pokemon.name) + ' isn\'t losing PP or HP from being forced to switch. If this continues, it will be classified as being in an endless loop.</div>');
                                    break;
                                case 'switch':
                                    this.add('html', '<div class="broadcast-red">' + this.escapeHTML(pokemon.name) + ' isn\'t losing PP or HP from repeatedly switching. If this continues, it will be classified as being in an endless loop.</div>');
                                    break;
                                }
                            }
                        }
                        pokemon.isStaleCon = 0;
                        pokemon.isStalePPTurns = 0;
                        pokemon.isStaleHP = pokemon.hp;
                    }
                    if (pokemon.isStalePPTurns >= 5) {
                        if (pokemon.hp >= pokemon.isStaleHP - pokemon.maxhp / 100) {
                            pokemon.isStale++;
                            pokemon.isStaleSource = 'ppstall';
                            if (this.firstStaleWarned && pokemon.isStale < 2) {
                                this.add('html', '<div class="broadcast-red">' + this.escapeHTML(pokemon.name) + ' isn\'t losing PP or HP. If it keeps on not losing PP or HP, it will be classified as being in an endless loop.</div>');
                            }
                        }
                        pokemon.isStaleCon = 0;
                        pokemon.isStalePPTurns = 0;
                        pokemon.isStaleHP = pokemon.hp;
                    }
                }
                if (pokemon.getMoves().length === 0) {
                    pokemon.isStaleCon++;
                    pokemon.isStaleSource = 'struggle';
                }
                if (pokemon.isStale < 2) {
                    allStale = false;
                } else if (pokemon.isStale && !pokemon.staleWarned) {
                    oneStale = pokemon;
                }
                if (!pokemon.isStalePPTurns) {
                    pokemon.isStaleHP = pokemon.hp;
                    if (pokemon.activeTurns) pokemon.isStaleCon = 0;
                }
                if (pokemon.activeTurns) {
                    pokemon.isStalePPTurns++;
                }
                pokemon.activeTurns++;
            }
            this.sides[i].faintedLastTurn = this.sides[i].faintedThisTurn;
            this.sides[i].faintedThisTurn = false;
        }
        let banlistTable = this.getFormat().banlistTable;
        if (banlistTable && 'Rule:endlessbattleclause' in banlistTable) {
            if (oneStale) {
                let activationWarning = '<br />If all active Pok&eacute;mon go in an endless loop, Endless Battle Clause will activate.';
                if (allStale) activationWarning = '';
                let loopReason = '';
                switch (oneStale.isStaleSource) {
                case 'struggle':
                    loopReason = ": it isn't losing HP from Struggle";
                    break;
                case 'drag':
                    loopReason = ": it isn't losing PP or HP from being forced to switch";
                    break;
                case 'switch':
                    loopReason = ": it isn't losing PP or HP from repeatedly switching";
                    break;
                case 'getleppa':
                    loopReason = ": it got a Leppa Berry it didn't start with";
                    break;
                case 'useleppa':
                    loopReason = ": it used a Leppa Berry it didn't start with";
                    break;
                case 'ppstall':
                    loopReason = ": it isn't losing PP or HP";
                    break;
                case 'ppoverflow':
                    loopReason = ": its PP overflowed";
                    break;
                }
                this.add('html', '<div class="broadcast-red">' + this.escapeHTML(oneStale.name) + ' is in an endless loop' + loopReason + '.' + activationWarning + '</div>');
                oneStale.staleWarned = true;
                this.firstStaleWarned = true;
            }
            if (allStale) {
                this.add('message', "All active Pok\u00e9mon are in an endless loop. Endless Battle Clause activated!");
                let leppaPokemon = null;
                for (let i = 0; i < this.sides.length; i++) {
                    for (let j = 0; j < this.sides[i].pokemon.length; j++) {
                        let pokemon = this.sides[i].pokemon[j];
                        if (toId(pokemon.set.item) === 'leppaberry') {
                            if (leppaPokemon) {
                                leppaPokemon = null; // both sides have Leppa
                                this.add('-message', "Both sides started with a Leppa Berry.");
                            } else {
                                leppaPokemon = pokemon;
                            }
                            break;
                        }
                    }
                }
                if (leppaPokemon) {
                    this.add('-message', "" + leppaPokemon.side.name + "'s " + leppaPokemon.name + " started with a Leppa Berry and loses.");
                    this.win(leppaPokemon.side.foe);
                    return;
                }
                this.win();
                return;
            }
        } else {
            if (allStale && !this.staleWarned) {
                this.staleWarned = true;
                this.add('html', '<div class="broadcast-red">If this format had Endless Battle Clause, it would have activated.</div>');
            } else if (oneStale) {
                this.add('html', '<div class="broadcast-red">' + this.escapeHTML(oneStale.name) + ' is in an endless loop.</div>');
                oneStale.staleWarned = true;
            }
        }
 
        if (this.gameType === 'triples' && this.sides.map('pokemonLeft').count(1) === this.sides.length) {
            // If both sides have one Pokemon left in triples and they are not adjacent, they are both moved to the center.
            let center = false;
            for (let i = 0; i < this.sides.length; i++) {
                for (let j = 0; j < this.sides[i].active.length; j++) {
                    if (!this.sides[i].active[j] || this.sides[i].active[j].fainted) continue;
                    if (this.sides[i].active[j].position === 1) break;
                    this.swapPosition(this.sides[i].active[j], 1, '[silent]');
                    center = true;
                    break;
                }
            }
            if (center) this.add('-center');
        }
 
        this.add('turn', this.turn);
 
        this.makeRequest('move');
    }
}
