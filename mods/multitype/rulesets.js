exports.BattleFormats = {
    judgmentday: {
        effectType: 'Banlist',
        name: 'Judgment Day',
        validateSet: function (set) {
            var item = this.getItem(set.item);
            var template = this.getTemplate(set.species);
            var problems = [];
            var moves = [];
            if (set.moves) {
                var hasMove = {};
                var judgmentCheck = false;
                for (var i = 0; i < set.moves.length; i++) {
                    var move = this.getMove(set.moves[i]);
                    var moveid = move.id;
                    if (moveid === 'judgment') {
                        judgmentCheck = true;
                    }
                }      
            }
            if (judgmentCheck && (!item || !item.onPlate)) {
                problems.push((set.name || set.species) + ' needs to hold a plate in order to use Judgment.');
            }
            return problems;
        }
    }
}
