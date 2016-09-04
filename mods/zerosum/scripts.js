'use strict';

exports.BattleScripts = {
   damage: function (damage, target, source, effect, instafaint) {
     if (this.event) {
       if (!target) target = this.event.target;
       if (!source) source = this.event.source;
       if (!effect) effect = this.effect;
     }
     if (!target || !target.hp) return 0;
     if (!target.isActive) return false;
     effect = this.getEffect(effect);
     if (!(damage || damage === 0)) return damage;
     if (damage !== 0) damage = this.clampIntRange(damage, 1);

     if (effect.id !== 'struggle-recoil') { // Struggle recoil is not affected by effects
       if (effect.effectType === 'Weather' && !target.runImmunity(effect.id)) {
         this.debug('weather immunity');
         return 0;
       }
       damage = this.runEvent('Damage', target, source, effect, damage);
       if (!(damage || damage === 0)) {
         this.debug('damage event failed');
         return damage;
       }
       if (target.illusion && effect && effect.effectType === 'Move' && effect.id !== 'confused') {
         this.debug('illusion cleared');
         target.illusion = null;
         this.add('replace', target, target.getDetails);
         this.add('-end', target, 'Illusion');
       }
     }
     if (damage !== 0) damage = this.clampIntRange(damage, 1);
     damage = target.damage(damage, source, effect);
     if (source) source.lastDamage = damage;
     let name = effect.fullname;
     if (name === 'tox') name = 'psn';
     switch (effect.id) {
     case 'partiallytrapped':
       this.add('-damage', target, target.getHealth, '[from] ' + this.effectData.sourceEffect.fullname, '[partiallytrapped]');
       break;
     case 'powder':
       this.add('-damage', target, target.getHealth, '[silent]');
       break;
     case 'confused':
       this.add('-damage', target, target.getHealth, '[from] confusion');
       break;
     default:
       if (effect.effectType === 'Move' || !name) {
         this.add('-damage', target, target.getHealth);
       } else if (source && (source !== target || effect.effectType === 'Ability')) {
         this.add('-damage', target, target.getHealth, '[from] ' + name, '[of] ' + source);
       } else {
         this.add('-damage', target, target.getHealth, '[from] ' + name);
       }
       break;
     }

     if (effect.drain && source) {
       this.heal(Math.ceil(damage * effect.drain[0] / effect.drain[1]), source, target, 'drain');
     }

     if (!effect.flags) effect.flags = {};

     if (instafaint && !target.hp) {
       this.debug('instafaint: ' + this.faintQueue.map('target').map('name'));
       this.faintMessages(true);
     } else {
       damage = this.runEvent('AfterDamage', target, source, effect, damage);
     }

     //healing function
     if (effect.name !== 'metagame rules') {
       this.heal(Math.ceil(damage * target.side.foe.active[0].maxhp / target.maxhp), target.side.foe.active[0], target, 'metagame rules');
     }

     return damage;
   },
   directDamage: function (damage, target, source, effect) {
     if (this.event) {
       if (!target) target = this.event.target;
       if (!source) source = this.event.source;
       if (!effect) effect = this.effect;
     }
     if (!target || !target.hp) return 0;
     if (!damage) return 0;
     damage = this.clampIntRange(damage, 1);

     damage = target.damage(damage, source, effect);
     switch (effect.id) {
     case 'strugglerecoil':
       this.add('-damage', target, target.getHealth, '[from] recoil');
       break;
     case 'confusion':
       this.add('-damage', target, target.getHealth, '[from] confusion');
       break;
     default:
       this.add('-damage', target, target.getHealth);
       break;
     }
     if (target.fainted) this.faint(target);

     //healing function
     if (effect.name !== 'metagame rules') {
       this.heal(Math.ceil(damage * target.side.foe.active[0].maxhp / target.maxhp), target.side.foe.active[0], target, 'metagame rules');
     }  

     return damage;
   },
   heal: function (damage, target, source, effect) {
     if (this.event) {
       if (!target) target = this.event.target;
       if (!source) source = this.event.source;
       if (!effect) effect = this.effect;
     }
     effect = this.getEffect(effect);
     if (damage && damage <= 1) damage = 1;
     damage = Math.floor(damage);
     // for things like Liquid Ooze, the Heal event still happens when nothing is healed.
     damage = this.runEvent('TryHeal', target, source, effect, damage);
     if (!damage) return 0;
     if (!target || !target.hp) return 0;
     if (!target.isActive) return false;
     if (target.hp >= target.maxhp) return 0;
     damage = target.heal(damage, source, effect);
     switch (effect.id) {
     case 'leechseed':
     case 'rest':
       this.add('-heal', target, target.getHealth, '[silent]');
       break;
     case 'drain':
       this.add('-heal', target, target.getHealth, '[from] drain', '[of] ' + source);
       break;
     case 'wish':
       break;
     default:
       if (effect.effectType === 'Move') {
         this.add('-heal', target, target.getHealth);
       } else if (source && source !== target) {
         this.add('-heal', target, target.getHealth, '[from] ' + effect.fullname, '[of] ' + source);
       } else {
         this.add('-heal', target, target.getHealth, '[from] ' + effect.fullname);
       }
       break;
     }
     this.runEvent('Heal', target, source, effect, damage);

     //damage function
     if (effect.name !== 'metagame rules') {
       source = target;
       target = source.side.foe.active[0];
       this.damage(damage * (target.maxhp / source.maxhp), target, source, 'metagame rules');
     }
  
     return damage;
   },
   pokemon: {
     faint: function (source, effect) {
       // This function only puts the pokemon in the faint queue;
       // actually setting of this.fainted comes later when the
       // faint queue is resolved.
       if (this.fainted || this.faintQueued) return 0;
       let d = this.hp;
       this.hp = 0;
       this.switchFlag = false;
       this.faintQueued = true;
      
       //explosion clause
       if (source === this) {
         this.battle.heal(Math.ceil(d * this.side.foe.active[0].maxhp / this.maxhp), this.side.foe.active[0], this, 'metagame rules');
       }
  
       this.battle.faintQueue.push({
         target: this,
         source: source,
         effect: effect,
       });
       return d;
     }
   }
}
