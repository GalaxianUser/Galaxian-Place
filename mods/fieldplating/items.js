exports.BattleItems = {
    "dreadplate": {
        inherit: true,
        onBasePower: function () {},
        onTakeItem: false,
        onStart: function (source) {
            if (this.pseudoWeather['magicroom']) {
                this.removePseudoWeather('magicroom', source);
            } else {
                this.addPseudoWeather('magicroom', source);
            }
        }
    },
    "dracoplate": {
        inherit: true,
        onBasePower: function () {},
        onTakeItem: false,
        onStart: function (source) {
            if (this.pseudoWeather['wonderroom']) {
                this.removePseudoWeather('wonderroom', source);
            } else {
                this.addPseudoWeather('wonderroom', source);
            }
        }
    },
    "earthplate": {
        inherit: true,
        onBasePower: function () {},
        onTakeItem: false,
        onStart: function (source) {
            this.addPseudoWeather('mudsport', source);
        }
    },
    "flameplate": {
        inherit: true,
        onBasePower: function () {},
        onTakeItem: false,
        onStart: function (source) {
            this.setWeather('sunnyday');
        }
    },
    "icicleplate": {
        inherit: true,
        onBasePower: function () {},
        onTakeItem: false,
        onStart: function (source) {
            this.setWeather('hail');
        }
    },
    "ironplate": {
        inherit: true,
        onBasePower: function () {},
        onTakeItem: false,
        onStart: function (source) {
            this.addPseudoWeather('gravity', source);
        }
    },
    "meadowplate": {
        inherit: true,
        onBasePower: function () {},
        onTakeItem: false,
        onStart: function (source) {
            this.setTerrain('grassyterrain');
        }
    },
    "mindplate": {
        inherit: true,
        onBasePower: function () {},
        onTakeItem: false,
        onStart: function (source) {
            if (this.pseudoWeather['trickroom']) {
                this.removePseudoWeather('trickroom', source);
            } else {
                this.addPseudoWeather('trickroom', source);
            }
        }
    },
    "pixieplate": {
        inherit: true,
        onBasePower: function () {},
        onTakeItem: false,
        onStart: function (source) {
            this.setTerrain('mistyterrain');
        }
    },
    "skyplate": {
        inherit: true,
        onBasePower: function () {},
        onTakeItem: false,
        onStart: function (source) {
            this.setWeather('raindance');
        }
    },
    "splashplate": {
        inherit: true,
        onBasePower: function () {},
        onTakeItem: false,
        onStart: function (source) {
            this.addPseudoWeather('watersport', source);
        }
    },
    "stoneplate": {
        inherit: true,
        onBasePower: function () {},
        onTakeItem: false,
        onStart: function (source) {
            this.setWeather('sandstorm');
        }
    },
    "spookyplate": {
        inherit: true,
        onBasePower: function () {},
        onTakeItem: false,
        onStart: function (source) {
            this.addPseudoWeather('fairylock');
        }
    },
    "toxicplate": {
        inherit: true,
        onBasePower: function () {},
        onTakeItem: false,
        onStart: function (source) {
            this.useMove('haze', source);
        }
    },
    "zapplate": {
        inherit: true,
        onBasePower: function () {},
        onTakeItem: false,
        onStart: function (source) {
            this.setTerrain('electricterrain');
        }
    }
};
