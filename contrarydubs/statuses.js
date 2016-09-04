exports.BattleStatuses = {
    //brn is implemented in formats.js
    par: {
        inherit: true,
        onModifySpe: function (speMod, pokemon) {
            if (!pokemon.hasAbility('quickfeet')) {
                return this.chain(speMod, 4);
            }
        }
    }
};