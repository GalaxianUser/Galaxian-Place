exports.BattleScripts = {
    init: function() {
        for (var i in this.data.Learnsets) {
            if (this.modData('Learnsets', i).learnset.judgment) {
                this.modData('Learnsets', i).learnset.judgment = this.data.Learnsets[i].learnset.judgment && ['6L1'];
            } else {
                this.modData('Learnsets', i).learnset.judgment = ['6L1'];
            }
        }
    }
};