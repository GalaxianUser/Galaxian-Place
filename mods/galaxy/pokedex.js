'use strict';

exports.BattlePokedex = {
	pikachu: {
		inherit: true,
		baseStats: {hp:70, atk:70, def:65, spa:70, spd:65, spe:120},
	},
	pikachurockstar: {
		inherit: true,
		baseStats: {hp:100, atk:130, def:65, spa:40, spd:65, spe:100},
	},
	ledian: {
		inherit: true,
		baseStats: {hp:90, atk:20, def:65, spa:95, spd:110, spe:155},
	},
	butterfree: {
	    inherit: true,
	    baseStats: {hp:95, atk:15, def:70, spa:110, spd:80, spe:75},
	},
    arceus: {
	    inherit: true,
	    baseStats: {hp:100, atk:100, def:100, spa:100, spd:100, spe:85},
    },
    weavile: {
	    inherit: true,
	    baseStats: {hp:70, atk:85, def:65, spa:45, spd:85, spe:125},
    },    
    magnezone: {
	    inherit: true,
	    baseStats: {hp:70, atk:70, def:115, spa:130, spd:90, spe:75},
    }, 
    terrakion: {
	    inherit: true,
	    baseStats: {hp:91, atk:129, def:90, spa:72, spd:90, spe:65}, 
    }, 
    dianciemega: {
	    inherit: true,
	    baseStats: {hp:50, atk:100, def:100, spa:120, spd:100, spe:110},
    },
    dragonite: {
	    inherit: true,
	    baseStats: {hp:91, atk:134, def:95, spa:100, spd:100, spe:100},
    },
    breloom: {
	    inherit: true,
	    baseStats: {hp:80, atk:135, def:90, spa:60, spd:80, spe:80},
    },
    dragonair: {
	    inherit: true,
	    baseStats: {hp:80, atk:84, def:75, spa:80, spd:80, spe:85},	 
    },
    lickilicky: {
	    inherit: true,
	    baseStats: {hp:110, atk:95, def:95, spa:80, spd:100, spe:65},
	    types: ["Normal", "Fairy"],
    },
    forretress: {
	    inherit: true,
	    baseStats: {hp:80, atk:95, def:145, spa:60, spd:80, spe:40},	 
    },
    drifloon: {
	    inherit: true,
	    baseStats: {hp:125, atk:50, def:65, spa:85, spd:65, spe:70},
	    types: ["Dark", "Ghost"],
    },
    lucariomega: {
    	inherit: true,
		baseStats: {hp: 70, atk: 145, def: 88, spa: 140, spd: 70, spe: 80},
	},
    torterra: {
	    inherit: true,
	    types: ["Grass", "Rock"],	 
    },
    mewtwo: {
	    inherit: true,
	    types: ["Psychic", "Dark"],	 
    },
    mew: {
	    inherit: true,
	    types: ["Dark"],
    },
    dunsparce: {
	    inherit: true,
	    baseStats: {hp: 100, atk: 110, def: 75, spa: 60, spd: 75, spe: 120},
	    types: ["Normal", "Dragon"],
    },
    alakazam: {
	    inherit: true,
	    baseStats: {hp: 55, atk: 135, def: 45, spa: 50, spd: 95, spe: 120},
	    types: ["Fire", "Electric"],
    },
    alakazammega: {
	    inherit: true,
	    baseStats: {hp: 55, atk: 175, def: 65, spa: 50, spd: 95, spe: 150},
	    types: ["Fire", "Electric"],
    },
    xatu: {
	    inherit: true,
	    baseStats: {hp: 80, atk: 75, def: 80, spa: 110, spd: 80, spe: 95},
    },
};
