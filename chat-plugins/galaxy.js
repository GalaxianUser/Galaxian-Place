/**
 * Miscellaneous commands
 */
'use strict';

const MAX_REASON_LENGTH = 300;
var moment = require('moment');
var fs = require('fs');
var confirmDeleteElo = false;
let amCache = {anime:{}, manga:{}};
var request = require('request');
let rankLadder = require('../rank-ladder');
const Pokedex = require("../data/pokedex.js").BattlePokedex;

var messages = [
	"has vanished into nothingness!",
	"used Explosion!",
	"fell into the void.",
	"went into a cave without a repel!",
	"has left the building.",
	"was forced to give Pokekit's mom an oil massage!",
	"was hit by Magikarp's Revenge!",
	"ate a bomb!",
	"is blasting off again!",
	"(Quit: oh god how did this get here i am not good with computer)",
	"was unfortunate and didn't get a cool message.",
	"{{user}}'s mama accidently kicked {{user}} from the server!",
];

function convertTime(time) {
	time = time / 1000;
	let seconds = time % 60;
	time /= 60;
	let minutes = time % 60;
	time /= 60;
	let hours = time;
	return {
		s: Math.floor(seconds),
		m: Math.floor(minutes),
		h: Math.floor(hours),
	};
}

function displayTime(t) {
	return t.h + (t.h === 1 ? " hour " : " hours ") + t.m + (t.m === 1 ? " minute " : " minutes ") + t.s + (t.s === 1 ? " second" : " seconds");
}

/* // Old Roomintro
let roomIntro = function (i) {
	return '<div style="background-image: url(&quot;https://i.imgur.com/tcqK1ua.png&quot;) ; cursor: url(&quot;http://i.imgur.com/hRZhv4k.png&quot;) , auto ; -webkit-background-size: cover ; -moz-background-size: cover ; -o-background-size: cover ; background-size: cover"><center><img src="//i.imgur.com/nXK87Ni.png" width="400" height="120"><br><img src="http://www.serebii.net/pokedex-xy/icon/386.png" width="32" height="32"> <font color="white"><b><font size="3">Benvenuto su Galaxy!</font></b> <img src="http://www.serebii.net/pokedex-xy/icon/384.png" width="32" height="32"><br>Prepara un team e gioca con gli altri Battlers, discuti con gli altri utenti o partecipa ai numerosi giochi (tra cui Panagram e Hangman)!</font><br><br><br><a href="http://galaxy.psim.us.forumcommunity.net/"><button style="border: 1px solid #fff ; background: #1681F3 ; cursor: url(&quot;http://i.imgur.com/cayAGeP.png&quot;) , auto ; box-shadow: 0px 1px 1px rgba(255 , 255 , 255 , 0.3) inset ; color: #fff ; text-shadow: 0px -1px 0px #000 ; border-radius: 3px ; margin: 3px ; padding: 2px 4px"><b><i class="fa fa-comments"></i> Forum</b></button></a><b><font color="white"> | </font></b><a href="https://www.facebook.com/pages/Galaxy/954128007962026?fref=ts"><button style="border: 1px solid #fff ; background: #0A63C2 ; cursor: url(&quot;http://i.imgur.com/cayAGeP.png&quot;) , auto ; box-shadow: 0px 1px 1px rgba(255 , 255 , 255 , 0.3) inset ; color: #fff ; text-shadow: 0px -1px 0px #000 ; border-radius: 3px ; margin: 3px ; padding: 2px 4px"><b><i class="fa fa-facebook-square"></i> Facebook</b></button></a><b><font color="white"> | </font></b><a href=""><button style="border: 1px solid #fff ; background: #1681F3 ; cursor: url(&quot;http://i.imgur.com/cayAGeP.png&quot;) , auto ; box-shadow: 0px 1px 1px rgba(255 , 255 , 255 , 0.3) inset ; color: #fff ; text-shadow: 0px -1px 0px #000 ; border-radius: 3px ; margin: 3px ; padding: 2px 4px"><b><i class="fa fa-youtube-play"></i> Youtube</b></button></a><br><b><font color="white"></font></b><button name="send" value="/cstaff" style="border: 1px solid #fff ; background: #0A63C2 ; cursor: url(&quot;http://i.imgur.com/cayAGeP.png&quot;) , auto ; box-shadow: 0px 1px 1px rgba(255 , 255 , 255 , 0.3) inset ; color: #fff ; text-shadow: 0px -1px 0px #000 ; border-radius: 3px ; margin: 3px ; padding: 2px 4px"><b><i class="fa fa-university"></i> Staff</b></button><b><font color="white"> | </font></b><button name="send" value="/shop" style="border: 1px solid #fff ; background: #1681F3 ; cursor: url(&quot;http://i.imgur.com/cayAGeP.png&quot;) , auto ; box-shadow: 0px 1px 1px rgba(255 , 255 , 255 , 0.3) inset ; color: #fff ; text-shadow: 0px -1px 0px #000 ; border-radius: 3px ; margin: 3px ; padding: 2px 4px"><b><i class="fa fa-shopping-cart"></i> Shop</b></button><b><font color="white"> | </font></b><button name="send" value="/grules" style="border: 1px solid #fff ; background: #0A63C2 ; cursor: url(&quot;http://i.imgur.com/cayAGeP.png&quot;) , auto ; box-shadow: 0px 1px 1px rgba(255 , 255 , 255 , 0.3) inset ; color: #fff ; border-radius: 3px ; margin: 3px ; padding: 2px 4px"><b><i class="fa fa-book"></i> Rules</b></button><div style="padding: 5px ; border: 1px solid #fff ; background: #0D47A1 ; color: #fff ; text-shadow: 0px -1px 0px #000 ; border-radius: 3px ; margin: 3px"><marquee><u>Ultime novità</u>: ' + i + '</marquee></div><br></center></div>';
};
*/

let roomIntro = function (i) {
	return '<div style="background-image: url(&quot;http://i.imgur.com/suLazlK.jpg&quot;) ; cursor: url(&quot;http://i.imgur.com/hRZhv4k.png&quot;) , auto ; -webkit-background-size: cover ; -moz-background-size: cover ; -o-background-size: cover ; background-size: cover"><center><img src="//i.imgur.com/65sHcrR.png" width="400" height="120"><br><img src="http://www.serebii.net/pokedex-xy/icon/386.png" width="32" height="32"> <font color="white"><b><font size="3">Benvenuto su Galaxy!</font></b> <img src="http://www.serebii.net/pokedex-xy/icon/384.png" width="32" height="32"><br>Prepara un team e gioca con gli altri Battlers, discuti con gli altri utenti o partecipa ai numerosi giochi (tra cui Panagram e Hangman)!</font><br><br><br><a href="http://galaxy.psim.us.forumcommunity.net/"><button style="border: 1px solid #fff ; background: #1681F3 ; cursor: url(&quot;http://i.imgur.com/cayAGeP.png&quot;) , auto ; box-shadow: 0px 1px 1px rgba(255 , 255 , 255 , 0.3) inset ; color: #fff ; text-shadow: 0px -1px 0px #000 ; border-radius: 3px ; margin: 3px ; padding: 2px 4px"><b><i class="fa fa-comments"></i> Forum</b></button></a><b><font color="white"> | </font></b><a href="https://www.facebook.com/pages/Galaxy/954128007962026?fref=ts"><button style="border: 1px solid #fff ; background: #C6493D ; cursor: url(&quot;http://i.imgur.com/cayAGeP.png&quot;) , auto ; box-shadow: 0px 1px 1px rgba(255 , 255 , 255 , 0.3) inset ; color: #fff ; text-shadow: 0px -1px 0px #000 ; border-radius: 3px ; margin: 3px ; padding: 2px 4px"><b><i class="fa fa-facebook-square"></i> Facebook</b></button></a><b><font color="white"> | </font></b><a href="https://www.youtube.com/channel/UCqLQuT4UB81Y69EAFBp8Qag"><button style="border: 1px solid #fff ; background: #1681F3 ; cursor: url(&quot;http://i.imgur.com/cayAGeP.png&quot;) , auto ; box-shadow: 0px 1px 1px rgba(255 , 255 , 255 , 0.3) inset ; color: #fff ; text-shadow: 0px -1px 0px #000 ; border-radius: 3px ; margin: 3px ; padding: 2px 4px"><b><i class="fa fa-youtube-play"></i> Youtube</b></button></a><br><b><font color="white"></font></b><button name="send" value="/cstaff" style="border: 1px solid #fff ; background: #C6493D ; cursor: url(&quot;http://i.imgur.com/cayAGeP.png&quot;) , auto ; box-shadow: 0px 1px 1px rgba(255 , 255 , 255 , 0.3) inset ; color: #fff ; text-shadow: 0px -1px 0px #000 ; border-radius: 3px ; margin: 3px ; padding: 2px 4px"><b><i class="fa fa-university"></i> Staff</b></button><b><font color="white"> | </font></b><button name="send" value="/shop" style="border: 1px solid #fff ; background: #1681F3 ; cursor: url(&quot;http://i.imgur.com/cayAGeP.png&quot;) , auto ; box-shadow: 0px 1px 1px rgba(255 , 255 , 255 , 0.3) inset ; color: #fff ; text-shadow: 0px -1px 0px #000 ; border-radius: 3px ; margin: 3px ; padding: 2px 4px"><b><i class="fa fa-shopping-cart"></i> Shop</b></button><b><font color="white"> | </font></b><button name="send" value="/grules" style="border: 1px solid #fff ; background: #C6493D ; cursor: url(&quot;http://i.imgur.com/cayAGeP.png&quot;) , auto ; box-shadow: 0px 1px 1px rgba(255 , 255 , 255 , 0.3) inset ; color: #fff ; border-radius: 3px ; margin: 3px ; padding: 2px 4px"><b><i class="fa fa-book"></i> Rules</b></button><div style="padding: 5px ; border: 1px solid #fff ; background: #C6493D; color: #fff ; text-shadow: 0px -1px 0px #000 ; border-radius: 3px ; margin: 3px"><marquee>Ultime novità: ' + i + '</marquee></div><br></center></div>';
};

function display (message, self) {
	if (self.broadcasting) return self.sendReplyBox(message);
	return self.popupReply('|html|' + message);
}

function clearRoom(room) {
	var len = (room.log && room.log.length) || 0;
	var users = [];
	while (len--) {
		room.log[len] = '';
	}
	for (var u in room.users) {
		users.push(u);
		Users.get(u).leaveRoom(room, Users.get(u).connections[0]);
	}
	len = users.length;
	setTimeout(function () {
		while (len--) {
			Users.get(users[len]).joinRoom(room, Users.get(users[len]).connections[0]);
		}
	}, 1000);
}

exports.commands = {
	/*stafflist: 'authority',
	auth: 'authority',
	authlist: 'authority',
	authority: function (target, room, user, connection) {
		var rankLists = {};
		var ranks = Object.keys(Config.groups);
		for (var u in Users.usergroups) {
			var rank = Users.usergroups[u].charAt(0);
			// In case the usergroups.csv file is not proper, we check for the server ranks.
			if (ranks.indexOf(rank) > -1) {
				var name = Users.usergroups[u].substr(1);
				if (!rankLists[rank]) rankLists[rank] = [];
				if (name) rankLists[rank].push(((Users.getExact(name) && Users.getExact(name).connected) ? '**' + name + '**' : name));
			}
		}

		var buffer = [];
		Object.keys(rankLists).sort(function (a, b) {
			return (Config.groups[b] || {rank: 0}).rank - (Config.groups[a] || {rank: 0}).rank;
		}).forEach(function (r) {
			buffer.push((Config.groups[r] ? r + Config.groups[r].name + "s (" + rankLists[r].length + ")" : r) + ":\n" + rankLists[r].sort().join(", "));
		});

		if (!buffer.length) {
			return connection.popup("This server has no auth.");
		}
		
		connection.popup(buffer.join("\n\n"));
	},*/

	clearall: function (target, room, user) {
		if (!this.can('declare')) return false;
		if (room.battle) return this.sendReply("You cannot clearall in battle rooms.");

		clearRoom(room);
	},

	gclearall: 'globalclearall',
	globalclearall: function (target, room, user) {
		if (!this.can('hotpatch')) return false;

		for (var u in Users.users) {
			Users.users[u].popup("All rooms are being clear.");
		}

		for (var r in Rooms.rooms) {
			clearRoom(Rooms.rooms[r]);
		}
	},

	hide: 'hideauth',
	hideauth: function(target, room, user) {
		if (!user.can('lock')) return this.sendReply("/hideauth - access denied.");
		var tar = ' ';
		if (target) {
			target = target.trim();
				if (Config.groupsranking.indexOf(target) > -1) {
				if (Config.groupsranking.indexOf(target) <= Config.groupsranking.indexOf(user.group)) {
					tar = target;
				} else {
					this.sendReply('The group symbol you have tried to use is of a higher authority than you have access to. Defaulting to \' \' instead.');
				}
			} else {
				this.sendReply('You have tried to use an invalid character as your auth symbol. Defaulting to \' \' instead.');
			}
		}
		user.getIdentity = function (roomid) {
			if (this.locked) {
				return '‽' + this.name;
			}
			if (roomid) {
				var room = Rooms.rooms[roomid];
				if (room.isMuted(this)) {
					return '!' + this.name;
				}
				if (room && room.auth) {
					if (room.auth[this.userid]) {
						return room.auth[this.userid] + this.name;
					}
					if (room.isPrivate === true) return ' ' + this.name;
				}
			}
			return tar + this.name;
		}
		user.updateIdentity();
		this.sendReply('You are now hiding your auth symbol as \'' + tar + '\'.');
		this.logModCommand(user.name + ' is hiding auth symbol as \'' + tar + '\'');
		user.isHiding = true;
	},
	
	show: 'showauth',
	showauth: function(target, room, user) {
		if (!user.can('lock')) return this.sendReply("/showauth - access denied.");
		delete user.getIdentity;
		user.updateIdentity();
		user.isHiding = false;
		this.sendReply("You have now revealed your auth symbol.");
		return this.logModCommand(user.name + " has revealed their auth symbol.");
	},
	
	easytour: 'etour',
	elimtour: 'etour',
	etour: function (target, room, user) {
		if (!this.can('broadcast', null, room)) return;
		this.parse('/tour new ' + target + ', elimination');
	},

	roundrobintour: 'rtour',
	cancertour: 'rtour',
	rtour: function (target, room, user) {
		if (!this.can('broadcast', null, room)) return;
		this.parse('/tour new ' + target + ', roundrobin');
	},

	randomtour: 'randtour',
	randtour: function (target, room, user) {
		var rand = ['ou', 'pu', 'randombattle', 'ubers', 'uu', 'ru', 'pu', '1v1', 'randomhaxmons', 'monotype', 'challengecup1v1', 'ubers', 'lc', 'anythinggoes', 'randommonogen', 'monotyperandombattle', 'randominversebattle', 'randomubers', 'randomlc', 'randomcap', 'challengecupmetronome', 'challengecup2vs2', 'randomtriplesbattle', 'randomdoublesbattle', 'superstaffbros', 'supersquadsmackdown'][Math.floor(Math.random() * 26)];
		if (!this.can('broadcast', null, room)) return;
		this.parse('/tour new ' + rand + ', elimination');
	},

	rk: 'kick',
	roomkick: 'kick',
	kick: function (target, room, user) {
		if (!target) return this.parse('/help kick');
		if (!this.canTalk() && !user.can('bypassall')) {
			return this.sendReply("You cannot do this while unable to talk.");
		}

		target = this.splitTarget(target);
		var targetUser = this.targetUser;
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		if (!this.can('mute', targetUser, room)) return false;
		if (target.length > MAX_REASON_LENGTH) {
			return this.errorReply("The reason is too long. It cannot exceed " + MAX_REASON_LENGTH + " characters.");
		}
		this.addModCommand("" + targetUser.name + " was kicked from the room by " + user.name + "." + (target ? " (" + target + ")" : ""));
		targetUser.popup("You were kicked from " + room.id + " by " + user.name + ".");
		targetUser.leaveRoom(room.id);
	},
	kickhelp: ["/kick - Kick a user out of a room. Requires: % @ # & ~"],
	
	kickall: function (target, room, user) {
		if (!this.can('hotpatch')) return this.sendReply('/kickall - Access denied.');
		if (room.id === 'lobby') return this.sendReply('This command can not be used in Lobby.');
		for (let i in room.users) {
			if (room.users[i] !== user.userid) {
				room.users[i].leaveRoom(room.id);
			}
		}
		this.privateModCommand('(' + Tools.escapeHTML(user.name) + 'kicked everyone from the room.');
	},

	masspm: 'pmall',
	pmall: function (target, room, user) {
		if (!this.can('pmall')) return false;
		if (!target) return this.parse('/help pmall');

		let pmName = '~Server~PM';

		Users.users.forEach(function (user) {
			let message = '|pm|' + pmName + '|' + user.getIdentity() + '|' + target;
			user.send(message);
		});
	},
	pmallhelp: ["/pmall [message] - PM all users in the server."],

	staffpm: 'pmallstaff',
	pmstaff: 'pmallstaff',
	pmallstaff: function (target, room, user) {
		if (!this.can('forcewin')) return false;
		if (!target) return this.parse('/help pmallstaff');

		let pmName = '~Staff~PM';

		Users.users.forEach(function (user) {
			if (!user.isStaff) return;
			let message = '|pm|' + pmName + '|' + user.getIdentity() + '|' + target;
			user.send(message);
		});
	},
	pmallstaffhelp: ["/pmallstaff [message] - Sends a PM to every staff member online."],
	
	
	pus: 'pmupperstaff',
	pmupperstaff: function(target, room, user) {
		if (!this.can('forcewin')) return false;
		if (!target) return this.parse('/help pmupperstaff');

		let pmName = '~Upperstaff~PM';

		Users.users.forEach(function (user) {
			if (!user.isUpperstaff) return;
			let message = '|pm|' + pmName + '|' + user.getIdentity() + '|' + target;
			user.send(message);
		});
	},
	pmupperstaffhelp: ["/pmupperstaff [message] - Sends a PM to every upper staff member online."],

	d: 'poof',
	cpoof: 'poof',
	poof: function (target, room, user) {
		if (Config.poofOff) return this.sendReply("Poof is currently disabled.");
		if (target && !this.can('broadcast')) return false;
		if (room.id !== 'game') return false;
		var message = target || messages[Math.floor(Math.random() * messages.length)];
		if (message.indexOf('{{user}}') < 0) message = '{{user}} ' + message;
		message = message.replace(/{{user}}/g, user.name);
		if (!this.canTalk(message)) return false;

		var colour = '#' + [1, 1, 1].map(function () {
			var part = Math.floor(Math.random() * 0xaa);
			return (part < 0x10 ? '0' : '') + part.toString(16);
		}).join('');

		room.addRaw("<strong><font color=\"" + colour + "\">~~ " + Tools.escapeHTML(message) + " ~~</font></strong>");
		user.disconnectAll();
	},
	poofhelp: ["/poof - Disconnects the user and leaves a message in the room."],

	poofon: function () {
		if (!this.can('poofoff')) return false;
		Config.poofOff = false;
		return this.sendReply("Poof is now enabled.");
	},
	poofonhelp: ["/poofon - Enable the use /poof command."],

	nopoof: 'poofoff',
	poofoff: function () {
		if (!this.can('poofoff')) return false;
		Config.poofOff = true;
		return this.sendReply("Poof is now disabled.");
	},
	poofoffhelp: ["/poofoff - Disable the use of the /poof command."],

	regdate: function (target, room, user) {
		if (!this.runBroadcast()) return;
		if (!target || !toId(target)) return this.parse('/help regdate');
		var username = toId(target);
		request('http://pokemonshowdown.com/users/' + username, function (error, response, body) {
			if (error && response.statusCode !== 200) {
				this.sendReplyBox('<b><font color="' + Galaxy.hashColor(target) + '">' + target + '</b></font>' + " is not registered.");
				return room.update();
			}
			var regdate = body.split('<small>')[1].split('</small>')[0].replace(/(<em>|<\/em>)/g, '');
			if (regdate === '(Unregistered)') {
				this.sendReplyBox('<b><font color="' + Galaxy.hashColor(target) + '">' + target + '</b></font>' + " is not registered.");
			} else if (regdate === '(Account disabled)') {
				this.sendReplyBox('<b><font color="' + Galaxy.hashColor(target) + '">' + target + '</b></font>' + "'s account is disabled.");
			} else {
				this.sendReplyBox('<b><font color="' + Galaxy.hashColor(target) + '">' + target + '</b></font>' + " was registered on " + regdate.slice(7) + ".");
			}
			room.update();
		}.bind(this));
	},
	regdatehelp: ["/regdate - Please specify a valid username."],

	sb: 'showdownboilerplate',
	showdownboilerplate: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReply("|raw|This server uses <a href='https://github.com/CreaturePhil/Showdown-Boilerplate'>Showdown-Boilerplate</a>.");
	},
	showdownboilerplatehelp: ["/showdownboilerplate - Links to the Showdown-Boilerplate repository on Github."],

	seen: function (target, room, user) {
		if (!this.runBroadcast()) return;
		if (!target) return this.parse('/help seen');
		var targetUser = Users.get(target);
		if (targetUser && targetUser.connected) return this.sendReplyBox('<b><font color="' + Galaxy.hashColor(target) + '">' + targetUser.name + '</b>' + " is <b><font color=\"green\">currently online</font></b>.");
		target = Tools.escapeHTML(target);
		var seen = Db('seen').get(toId(target));
		if (!seen) return this.sendReplyBox('<b><font color="' + Galaxy.hashColor(target) + '">' + target + '</b>' + " has <b><font color=\"red\">never</font></b> been online on this server.");
		this.sendReplyBox('<b><font color="' + Galaxy.hashColor(target) + '">' + target + '</b>' + " was last seen <b>" + moment(seen).fromNow() + "</b>.");
	},
	seenhelp: ["/seen - Shows when the user last connected on the server."],

	tell: function (target, room, user, connection) {
		if (!target) return this.parse('/help tell');
		target = this.splitTarget(target);
		var targetUser = this.targetUser;
		if (!target) {
			this.sendReply("You forgot the comma.");
			return this.parse('/help tell');
		}

		if (targetUser && targetUser.connected) {
			return this.parse('/pm ' + this.targetUsername + ', ' + target);
		}

		if (user.locked) return this.popupReply("You may not send offline messages when locked.");
		if (target.length > 255) return this.popupReply("Your message is too long to be sent as an offline message (>255 characters).");

		if (Config.tellrank === 'autoconfirmed' && !user.autoconfirmed) {
			return this.popupReply("You must be autoconfirmed to send an offline message.");
		} else if (!Config.tellrank || Config.groupsranking.indexOf(user.group) < Config.groupsranking.indexOf(Config.tellrank)) {
			return this.popupReply("You cannot send an offline message because offline messaging is " +
				(!Config.tellrank ? "disabled" : "only available to users of rank " + Config.tellrank + " and above") + ".");
		}

		var userid = toId(this.targetUsername);
		if (userid.length > 18) return this.popupReply("\"" + this.targetUsername + "\" is not a legal username.");

		var sendSuccess = Tells.addTell(user, userid, target);
		if (!sendSuccess) {
			if (sendSuccess === false) {
				return this.popupReply("User " + this.targetUsername + " has too many offline messages queued.");
			} else {
				return this.popupReply("You have too many outgoing offline messages queued. Please wait until some have been received or have expired.");
			}
		}
		return connection.send('|pm|' + user.getIdentity() + '|' +
			(targetUser ? targetUser.getIdentity() : ' ' + this.targetUsername) +
			"|/text This user is currently offline. Your message will be delivered when they are next online.");
	},
	tellhelp: ["/tell [username], [message] - Send a message to an offline user that will be received when they log in."],

	/*hideuser: function(target, room, user, connection, cmd) {
		if (!target) return this.sendReply('/hideuser [user] - Makes all prior messages posted by this user "poof" and replaces it with a button to see. Requires: @, &, ~');
		if (!this.can('hotpatch')) return false;
		try {
			this.add('|unlink|hide|' + target);
			Rooms.rooms.staff.add(target + '\'s messages have been hidden by ' + user.name);
			this.logModCommand(target + '\'s messages have been hidden by ' + user.name);
			this.sendReply(target + '\'s messages have been sucessfully hidden.');
		} catch (e) {
			this.sendReply("Something went wrong! Ahhhhhh!");
		}
	},*/
	
	flogout: 'forcelogout',
	forcelogout: function(target, room, user) {
		if (!user.can('hotpatch')) return;
		if (!this.canTalk()) return false;
		if (!target) return this.sendReply('/forcelogout [username], [reason] OR /flogout [username], [reason] - You do not have to add a reason');
		target = this.splitTarget(target);
		var targetUser = this.targetUser;
		if (!targetUser) {
			return this.sendReply('User ' + this.targetUsername + ' not found.');
		}
		this.addModCommand('' + targetUser.name + ' was forcibly logged out by ' + user.name + '.' + (target ? " (" + target + ")" : ""));
		targetUser.resetName();
	},
	
    sudo: function (target, room, user) {
        if (!user.can('sudo')) return;
        var parts = target.split(',');
        if (parts.length < 2) return this.parse('/help sudo');
        if (parts.length >= 3) parts.push(parts.splice(1, parts.length).join(','));
        var targetUser = parts[0],
            cmd = parts[1].trim(),
            commands = Object.keys(CommandParser.commands).join(' ').toString(),
            spaceIndex = cmd.indexOf(' '),
            targetCmd = cmd;

        if (spaceIndex > 0) targetCmd = targetCmd.substr(1, spaceIndex - 1);
        if (cmd === '/reply') return this.sendReply(':P');
        if (cmd === '!reply') return this.sendReply(':P');
        if (!Users.get(targetUser)) return this.sendReply('User ' + targetUser + ' not found.');
        if (commands.indexOf(targetCmd.substring(1, targetCmd.length)) < 0 || targetCmd === '') return this.sendReply('Not a valid command.');
        if (cmd.match(/\/me/)) {
            if (cmd.match(/\/me./)) this.parse('/control ' + targetUser + ',, say,, ' + cmd);
            return;
            return this.sendReply('You must put a target to make a user use /me.');
        }
        CommandParser.parse(cmd, room, Users.get(targetUser), Users.get(targetUser).connections[0]);
        this.sendReply('You have made ' + targetUser + ' do ' + cmd + '.');
     console.log('[Sudo] '+ 'Dentice' +': '+ target);    
    },
    
    control: function (target, room, user) {
        if (!this.can('control')) return;
        var parts = target.split(',,');

        if (parts.length < 3) return this.parse('/help control');

        if (parts[1].trim().toLowerCase() === 'say') {
            room.add('|c|' + Users.get(parts[0].trim()).group + Users.get(parts[0].trim()).name + '|' + parts[2].trim());
            return;
     console.log('[Control] '+ user +': '+ target);          
        }
        if (parts[1].trim().toLowerCase() === 'pm') {
            Users.get(parts[2].trim()).send('|pm|' + Users.get(parts[0].trim()).group + Users.get(parts[0].trim()).name + '|' + Users.get(parts[2].trim()).group + Users.get(parts[2].trim()).name + '|' + parts[3].trim());
            return;
     console.log('[Control] '+ user +': '+ target);          
        }
    },
    
    rmall: function (target, room, user) {
		if (!this.can('roomdeclare', null, room)) return false;
		if (!target) return this.sendReply('/rmall [message] - Sends a message to all users in the room');

		var pmName = '~Room';

		for (var i in room.users) {
			var message = '|pm|' + pmName + '|' + room.users[i].getIdentity() + '|' + target;
			room.users[i].send(message);
		}
	},

	roomlist: function (target, room, user) {
		if(!this.can('declare')) return;
		var totalUsers = 0; 
		for (var u of Users.users) {
			u = u[1];
			if (Users(u).connected) {
				totalUsers++;
			}
		}
		var rooms = Object.keys(Rooms.rooms),
		len = rooms.length,
		header = ['<b><font color="#B8BB0C" size="2">Total users connected: ' + totalUsers + '</font></b><br />'],
		official = ['<b><font color="#119944" size="2">Official chat rooms:</font></b><br />'],
		nonOfficial = ['<hr><b><font color="#317EA5" size="2">Public chat rooms:</font></b><br />'],
		privateRoom = ['<hr><b><font color="#BD0508" size="2">Private chat rooms:</font></b><br />'],
		groupChats = ['<hr><b><font color="#693091" size="2">Group Chats:</font></b><br />'],
		battleRooms = ['<hr><b><font color="#19B3A1" size="2">Battle Rooms:</font></b><br />'];
	 
		while (len--) {
			var _room = Rooms.rooms[rooms[(rooms.length - len) - 1]];
			if (_room.type === 'battle') {
				battleRooms.push('<a href="/' + _room.id + '" class="ilink">' + _room.title + '</a> (' + _room.userCount + ')');
			}
			if (_room.type === 'chat') {
					if (_room.isPersonal) {
						groupChats.push('<a href="/' + _room.id + '" class="ilink">' + _room.id + '</a> (' + _room.userCount + ')');
						continue;
					}
					if (_room.isOfficial) {
						official.push('<a href="/' + toId(_room.title) + '" class="ilink">' + _room.title + '</a> (' + _room.userCount + ')');
						continue;
					}
					if (_room.isPrivate && _room.id !== 'teamsegreto') {
						privateRoom.push('<a href="/' + toId(_room.title) + '" class="ilink">' + _room.title + '</a> (' + _room.userCount + ')');
						continue;
					}
			}
			if (_room.type !== 'battle' && _room.id !== 'global' && _room.id !== 'teamsegreto') nonOfficial.push('<a href="/' + toId(_room.title) + '" class="ilink">' + _room.title + '</a> (' + _room.userCount + ')');
		}
		this.sendReplyBox(header + official.join(' ') + nonOfficial.join(' ') + privateRoom.join(' ') + (groupChats.length > 1 ? groupChats.join(' ') : '') + (battleRooms.length > 1 ? battleRooms.join(' ') : ''));
    },
	
	spop: 'sendpopup',
	sendpopup: function(target, room, user) {
		if (!this.can('declare')) return false;

		target = this.splitTarget(target);
		var targetUser = this.targetUser;

		if (!targetUser) return this.sendReply('/sendpopup [user], [message] - You missed the user');
		if (!target) return this.sendReply('/sendpopup [user], [message] - You missed the message');

		targetUser.popup('|html|' + target);
		this.sendReply(targetUser.name + ' got the message as popup: ' + target);

		/*targetUser.send(user.name+' sent a popup message to you.');*/

		this.logModCommand(user.name+' send a popup message to '+targetUser.name);
	},
	
	colorstaff: 'cstaff',
	colorstafflist: 'cstaff',
	cstaff: function(target, room, user, connection) {
		fs.readFile('config/usergroups.csv', 'utf8', function(err, data) {
			var staff = {
				"admins": [],
				"leaders": [],
				"mods": [],
				"drivers": [],
				"youtubers": [],
				"developers":[],
				"voices": []
			};
			var row = ('' + data).split('\n');
			for (var i = row.length; i > -1; i--) {
				if (!row[i]) continue;
				var rank = row[i].split(',')[1].replace("\r", '');
				var person = row[i].split(',')[0];
				function nameColor (name) {
					if (Users.getExact(name) && Users(name).connected) {
						return '<b><font color="' + Galaxy.hashColor(name) + '">' + Tools.escapeHTML(Users.getExact(name).name) + '</font></b>';
					} else {
						return '<font color="' + Galaxy.hashColor(name) + '">' + Tools.escapeHTML(name) + '</font>';
					}
				}
				switch (rank) {
					case '~':
						staff['admins'].push(nameColor(person));
						break;
					case '&':
						staff['leaders'].push(nameColor(person));
						break;
					case '@':
						staff['mods'].push(nameColor(person));
						break;
					case '%':
						staff['drivers'].push(nameColor(person));
						break;
					case '¥':
						staff['youtubers'].push(nameColor(person));
						break;
					case 'ƒ':
						staff['developers'].push(nameColor(person));
						break;
					case '+':
						staff['voices'].push(nameColor(person));
						break;
					default:
						continue;
				}
			}
			connection.popup('|html|' +
			    '<h3><center>Galaxy Authority List</center></h3>' +
				'~Administrators (' + staff['admins'].length + '):<br />' + staff['admins'].join(', ') +
				'<br>' +
				'<br />&Leaders (' + staff['leaders'].length + '):<br />' + staff['leaders'].join(', ') +
				'<br>' +
				'<br />@Moderators (' + staff['mods'].length + '):<br />' + staff['mods'].join(', ') +
				'<br>' +
				'<br />%Drivers (' + staff['drivers'].length + '):<br />' + staff['drivers'].join(', ') +
				'<br>' +
				'<br />¥Youtubers (' + staff['youtubers'].length + '):<br />' + staff['youtubers'].join(',') +
				'<br>' +
				'<br />ƒDevelopers (' + staff['developers'].length + '):<br />' + staff['developers'].join(',') +
				'<br>' +
				'<br />+Voices (' + staff['voices'].length + ')</u></b>:<br />' + staff['voices'].join(', ') +
				'<br /><br />(<b>Bold</b> = currently online)'
			);
		});
	},
	
	colorslist: function(target, room, user, connection) {
		connection.popup('|html|' +
				'<b><font color=\"#BD0508\">Flareninja - #BD0508</font><br>' +
				'<font color=\"#19B3A1\">Flareninja - #19B3A1</font><br>' +
				'<font color=\"#B8BB0C\">Flareninja - #B8BB0C</font><br>' +
				'<font color=\"#119944\">Flareninja - #119944</font><br>' +
				'<font color=\"#B87C05\">Flareninja - #B87C05</font><br>' +
				'<font color=\"#1D6587\">Flareninja - #1D6587</font><br>' +
				'<font color=\"#767D0C\">Flareninja - #767D0C</font><br>' +
				'<font color=\"#1F0C9D\">Flareninja - #1F0C9D</font><br>' +
				'<font color=\"#667799\">Flareninja - #667799</font><br>' +
				'<font color=\"#E220B1\">Flareninja - #E220B1</font><br>' +
				'<font color=\"#693091\">Flareninja - #693091</font><br>' +
				'<font color=\"#B1942B\">Flareninja - #B1942B</font><br>' +
				'<font color=\"#479801\">Flareninja - #479801</font><br>' +
				'<font color=\"#000000\">Flareninja - #000000</font><br>' +
				'<font color=\"#A65517\">Flareninja - #A65517</font><br>' +
				'<font color=\"#142194\">Flareninja - #142194</font><br>' +
				'<font color=\"#962B0D\">Flareninja - #962B0D</font><br>' +
				'<font color=\"#068408\">Flareninja - #068408</font><br>' +
				'<font color=\"#217360\">Flareninja - #217360</font><br>' +
				'<font color=\"#751572\">Flareninja - #751572</font><br>' +
				'<font color=\"#6325A2\">Flareninja - #6325A2</font><br>' +
				'<font color=\"#188669\">Flareninja - #188669</font><br>' +
				'<font color=\"#508726\">Flareninja - #508726</font><br>' +
				'<font color=\"#A01877\">Flareninja - #A01877</font><br>' +
				'<font color=\"#593001\">Flareninja - #593001</font><br>' +
				'<font color=\"#7741EC\">Flareninja - #7741EC</font><br>' +
				'<font color=\"#317EA5\">Flareninja - #317EA5</font><br>' +
				'<font color=\"#4C87A4\">Flareninja - #4C87A4</font><br>' +
				'<font color=\"#BF2BCF\">Flareninja - #BF2BCF</font></b>'
			);
	},
	
	serverrules: 'galaxyrules',
	grules: 'galaxyrules',
	galaxyrules: function(target, room, user, connection) {
		connection.popup('|html|' +
	            '<h3><center>Regole del Server</center></h3>' +
				'<b>1.</b> Rispetta gli altri utenti, non insultare, non discriminare, non fare commenti razzisti, non denigrare o offendere le opinioni altrui e non bestemmiare.<br>' +
				'<br>' +
				'<b>2.</b> Non è consentito pubblicare o discutere di materiale pornografico.<br>' +
				'<br>' +
				'<b>3.</b> Non pubblicizzare o parlare di altri server, ad eccezione di quello principale e di smogontour.<br>' +
				'<br>' +
				'<b>4.</b> Non utilizzare nick contenenti parole che non seguono le norme dei punti precedenti.<br>' +
				'<br>' +
				'<b>5.</b> Evita di abusare eccessivamente del MAIUSCOLO, del <i>corsivo</i>, del <b>grassetto</b>, degli spoiler, delle emoticons e dei comandi del bot.<br>' +
				'<br>' +
				'<b>6.</b> Non richiedere promozioni e non contestare l\'operato delle auth. (In caso di problemi con qualche staffer contatta un Leader(&) o un Admin(~)).<br>' +
				'<br>' +
				'<b>8.</b> Non mandare più di sei serie di messaggi alla volta(flood), non scrivere cose senza senso o non attinenti alla discussione(shitposting) e non allungare il messaggio mettendo lettere tutte uguali di seguito(stretching).<br>' +
				'<br>' +
				'<b>9.</b> Non richiedere Galaxy Points o articoli presenti nello Shop.<br>' +
				'<br>' +
				'<b>10.</b> Non segnalare altri utenti senza un apparente motivo o senza prove.(È preferibile avere degli screen)<br>' +
				'<br>' +
				'<i>Se riscontrate problemi con un utente o con uno staffer potete utilizzare il comando /report per segnalarlo.</i>'
			);
	},
	
	iconr: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox(
			"<a href=\"http://www.serebii.net/pokedex-xy/icon/001.png\">ORAS Icons -m/-p/-mx/-my</a><br />" +
			"<a href=\"https://github.com/msikma/pokesprite/wiki/Overview\">Oras Shiny Icons</a><br />" +
			"<a href=\"http://www.serebii.net/pokedex-bw/icon/001.png\">BW2 Icons</a><br />" +
			"<a href=\"http://www.serebii.net/pokedex-dp/icon/001.gif\">DPP Icons</a><br />" +
			"<a href=\"http://www.serebii.net/heartgoldsoulsilver/ow/001.png\">HGSS Overworld</a>"
		);
	},
	
	aiutaci: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox(
			"Aiutaci senza sborsare un soldo per cambiare host e organizzare giveaways, basta cliccare su questi link!<br />" +
			"Grazie dei Click!<br />" +
			"<a href=\"http://pokemonshowdown.com/interstice?uri=http%3A%2F%2Fbit.ly%2F2b32Pit\">Link Uno</a><br />" +
			"<a href=\"http://pokemonshowdown.com/interstice?uri=http%3A%2F%2Fbit.ly%2F2awPpGN\">Link Due</a><br />"
		);
	},
	
	givesymbol: 'gs',
	gs: function(target, room, user) {
		if (!this.can('declare')) return false;
		if (!target) return this.errorReply('/givesymbol [user] - Gives permission for this user to set a custom symbol.');
		if (!Users(target)) return this.errorReply("Target user not found.  Check spelling?");
		Users(target).canCustomSymbol = true;
		Users(target).popup('|modal|' + user.name + ' have given you a FREE custom symbol.  Use /customsymbol to set your symbol.');
	},
	
	userid: function(target, room, user) {
		if (!target) target = toId(user.name);
		if (!this.runBroadcast()) return;
		return this.sendReplyBox('<b><font color="' + Galaxy.hashColor(target) + '">' + target + '</b>' + " ID: <b>" + Tools.escapeHTML(toId(target)) + "</b>");
	},
	useridhelp: ["/userid [user] - shows the user's ID (removes unicode from name basically)"],
	
	coins: 'coingame',
	coin: 'coingame',
	coingame: function(target, room, user) {
		if (!this.runBroadcast()) return;
		var random = Math.floor(2 * Math.random()) + 1;
		var results = '';
		if (random == 1) {
			results = '<img src="http://surviveourcollapse.com/wp-content/uploads/2013/01/zinc.png" width="15%" title="Heads!"><br>It\'s heads!';
		}
		if (random == 2) {
			results = '<img src="http://upload.wikimedia.org/wikipedia/commons/e/e5/2005_Penny_Rev_Unc_D.png" width="15%" title="Tails!"><br>It\'s tails!';
		}
		return this.sendReplyBox('<center><font size="3"><b>Coin Game!</b></font><br>' + results + '');
	},
	
	pic: 'image',
	image: function(target, room, user) {
		if (!target) return this.sendReply('/image [url] - Shows an image using /a. Requires ~.');
		return this.parse('/a |raw|<center><img src="' + target + '">');
	},
	
	limage: 'leftimage',
	leftimage: function(target, room, user) {
		if (!target) return this.sendReply('/image [url] - Shows an image using /a. Requires ~.');
		return this.parse('/a |raw|<img src="' + target + '">');
	},
    
    cssedit: function (target, room, user, connection) {
		if (!user.hasConsoleAccess(connection)) {return this.sendReply("/cssedit - Access denied.");}
		var fsscript = require('fs');
		if (!target) {
			if (!fsscript.existsSync("config/custom.css")) return this.sendReply("custom.css doesn't exist.");
			return this.sendReplyBox(fsscript.readFileSync("config/custom.css").toString());
		}
		fsscript.writeFileSync("config/custom.css", target.toString());
		this.sendReply("custom.css edited.");
	},
	
	destroymodlog: function (target, room, user, connection) {
		if (!user.hasConsoleAccess(connection)) {return this.sendReply("/destroymodlog - Access denied.");}
		var fsscript = require('fs');
		var logPath = 'logs/modlog/';
		if (CommandParser.modlog && CommandParser.modlog[room.id])  {
			CommandParser.modlog[room.id].close();
			delete CommandParser.modlog[room.id];
		}
		try {
			fsscript.unlinkSync(logPath + "modlog_" + room.id + ".txt");
			this.addModCommand(user.name + " has destroyed room's modlog." + (target ? ('(' + target + ')') : ''));
		} catch (e) {
			this.sendReply("This room's modlog can't be destroyed.");
		}
	},
	
	/*********************************************************
	 * Others
	 *********************************************************/
   
    cries: function (target) {
		if (!this.runBroadcast()) return; 
		if (!target || (isNaN(target) && toId(target) !== 'random')) return false;
		target = toId(target);
		if (target === 'random' || target === 'rand' || target === 'aleatoire') {
			target = Math.floor(Math.random() * 718);
		}
		if (target < 1 || target > 718) { 
			return this.sendReply('Le Pokémon indiqué doit avoir un numéro de Pokédex national entre 1 et 718.');
		}	
		if (target < 100 && target > 9) {
			target = '0' + target; 
		} 
		if (target < 10) {
			target = '00' + target;
		}
		this.sendReplyBox(
			'<center><audio src="http://play.pokemonshowdown.com/audio/cries/'+ target +'.wav" controls="" style="padding: 5px 7px ; background: #8e44ad ; color: #ecf0f1 ; -webkit-border-radius: 4px ; -moz-border-radius: 4px ; border-radius: 4px ; border: solid 1px #20538d ; text-shadow: 0 -1px 0 rgba(0 , 0 , 0 , 0.4) ; -webkit-box-shadow: inset 0 1px 0 rgba(255 , 255 , 255 , 0.4) , 0 1px 1px rgba(0 , 0 , 0 , 0.2) ; -moz-box-shadow: inset 0 1px 0 rgba(255 , 255 , 255 , 0.4) , 0 1px 1px rgba(0 , 0 , 0 , 0.2) ; box-shadow: inset 0 1px 0 rgba(255 , 255 , 255 , 0.4) , 0 1px 1px rgba(0 , 0 , 0 , 0.2)" target="_blank"></audio>'
		)
	},
	
	randp: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let shinyPoke = "";
		let x;
		if (/shiny/i.test(target)) shinyPoke = "-shiny";
		if (/kanto/i.test(target) || /gen 1/i.test(target)) {
			x = Math.floor(Math.random() * (174 - 1));
		} else if (/johto/i.test(target) || /gen 2/i.test(target)) {
			x = Math.floor(Math.random() * (281 - 173)) + 172;
		} else if (/hoenn/i.test(target) || /gen 3/i.test(target)) {
			x = Math.floor(Math.random() * (444 - 280)) + 279;
		} else if (/sinnoh/i.test(target) || /gen 4/i.test(target)) {
			x = Math.floor(Math.random() * (584 - 443)) + 442;
		} else if (/kalos/i.test(target) || /gen 5/i.test(target)) {
			x = Math.floor(Math.random() * (755 - 583)) + 582;
		} else if (/unova/i.test(target) || /gen 6/i.test(target)) {
			x = Math.floor(Math.random() * (834 - 752)) + 751;
		}
		x = x || Math.floor(Math.random() * (856 - 1));
		let tarPoke = Object.keys(Pokedex)[x];
		let pokeData = Pokedex[tarPoke];
		let pokeId = pokeData.species.toLowerCase();
		pokeId = pokeId.replace(/^basculinbluestriped$/i, "basculin-bluestriped").replace(/^pichuspikyeared$/i, "pichu-spikyeared").replace(/^floetteeternalflower$/i, "floette-eternalflower");
		if (pokeId === "pikachu-cosplay") pokeId = ["pikachu-belle", "pikachu-phd", "pikachu-libre", "pikachu-popstar", "pikachu-rockstar"][~~(Math.random() * 6)];
		let spriteLocation = "http://play.pokemonshowdown.com/sprites/xyani" + shinyPoke + "/" + pokeId + ".gif";
		let missingnoSprites = ["http://cdn.bulbagarden.net/upload/9/98/Missingno_RB.png", "http://cdn.bulbagarden.net/upload/0/03/Missingno_Y.png", "http://cdn.bulbagarden.net/upload/a/aa/Spr_1b_141_f.png", "http://cdn.bulbagarden.net/upload/b/bb/Spr_1b_142_f.png", "http://cdn.bulbagarden.net/upload/9/9e/Ghost_I.png"];
		if (pokeId === "missingno") spriteLocation = missingnoSprites[~~(Math.random() * 5)];
		function getTypeFormatting(types) {
			let text = [];
			for (let i = 0; i < types.length; i++) {
				text.push("<img src=\"http://play.pokemonshowdown.com/sprites/types/" + types[i] + ".png\">");
			}
			return text.join(" / ");
		}
		this.sendReplyBox("<table><tr><td><img src=\"" + spriteLocation + "\" ></td><td><b>Name: </b>" + pokeData.species + "<br/><b>Type(s): </b>" + getTypeFormatting(pokeData.types) + "<br/><b>" + (Object.values(pokeData.abilities).length > 1 ? "Abilities" : "Ability") + ": </b>" + Object.values(pokeData.abilities).join(" / ") + "<br/><b>Stats: </b>" + Object.values(pokeData.baseStats).join(" / ") + "<br/><b>Colour: </b><font color=\"" + pokeData.color + "\">" + pokeData.color + "</font><br/><b>Egg Group(s): </b>" + pokeData.eggGroups.join(", ") + "</td></tr></table>");
	},

        yt: function(target, room, user) {
       	if (!this.runBroadcast()) return false;
        if (!target) return false;
        var params_spl = target.split(' ');
        var g = '';

        for (var i = 0; i < params_spl.length; i++) {
            g += '+' + params_spl[i];
        }
        g = g.substr(1);

        var reqOpts = {
            hostname: "www.googleapis.com",
            method: "GET",
            path: '/youtube/v3/search?part=snippet&q=' + g + '&type=video&key=AIzaSyA4fgl5OuqrgLE1B7v8IWYr3rdpTGkTmns',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        var self = this;
        var data = '';
        var req = require('https').request(reqOpts, function(res) {
            res.on('data', function(chunk) {
                data += chunk;
            });
            res.on('end', function(chunk) {
                var d = JSON.parse(data);
                if (d.pageInfo.totalResults == 0) {
                    self.sendReplyBox('No videos found');
                    return false;
                } 
                self.sendReplyBox('<a href="https://www.youtube.com/watch?v=' + d.items[0].id.videoId +'"><b> '+ d.items[0].snippet.title +'</b>');
            	room.update();
            });
        });
        req.end();
        console.log('[YT] '+ user +': '+ target);
    },
    
    tourelo: 'tourladder',
	tourladder: function (target, room, user) {
		if (!this.runBroadcast()) return;
		var self = this;
		var tourLadder = Ladders('tournaments');c
		if (!target || !target.trim()) {
			tourLadder.load().then(function (users) {
				if (!users.length) return self.sendReplyBox('No rated tournaments have been played yet.');
				users.sort(function (a, b) {
					return b[1] - a[1];
				});
				var padding = self.broadcasting ? '5' : '8';
				var table = '<center><b><u>Tournament Ladder</u></b><br>' +
					'<table border = "1" cellspacing = "0" cellpadding = "' + padding + '"><tr><th>No.</th><th>User</th><th>Elo</th>';
				for (var i = 0; i < 10; i++) {
					if (!users[i] || users[i][1] <= 1000) break;
					var user = (Users.getExact(users[i][0]) ? Users.getExact(users[i][0]).name : users[i][0]);
					table += '<tr><td><center>' + (i + 1) + '</center></td><td style = "text-align: center">' + '<b><font color="' + Galaxy.hashColor(user) + '">' + user + '</font></b>' + '</td><td style = "text-align: center">' + Math.round(users[i][1]) + '</td></tr>';
				}
				table += '</table></center>';
				if (self.broadcasting && users.length > 10) table += '<center><button name = "send" value = "/tourladder"><small>Click to see the full ladder</small></button></center>';

				display(table + '</table>', self);
				if (self.broadcasting) room.update();
			});
			return;
		}

		target = (Users.getExact(target) ? Users.getExact(target).name : target);
		if (tourLadder.indexOfUser(target) === -1) return this.sendReplyBox('<b><font color="' + Galaxy.hashColor(target) + '">' + target  + '</font></b>' + ' has not played any rated tournaments yet.');
		tourLadder.load().then(function (users) {
			var elo = users[tourLadder.indexOfUser(target)][1];
			self.sendReplyBox('<b><font color="' + Galaxy.hashColor(target) + '">' + target  + '</font></b>' + '\'s Tournament Elo is <b>' + Math.round(elo) + '</b>.');
		});
	},

	deletetourladder: 'resettourladder',
	resettourladder: function (target, room, user) {
		if (!this.can('hotpatch')) return false;
		var tourLadder = Ladders('tournaments');
		tourLadder.load().then(function (users) {
			if (!users.length) return this.sendReply('No rated tournaments have been played yet.');
			if (!confirmDeleteElo) {
				confirmDeleteElo = true;
				return this.sendReply('WARNING: This will permanently delete all tournament ladder ratings. If you\'re sure you want to do this, use this command again.');
			}
			require('fs').unlinkSync('config/ladders/tournaments.tsv');
			Rooms('lobby').add('|html|<b>The Tournament Ladder has been reset.</b>');
			Rooms('lobby').update();
			if (room.id !== 'lobby') this.sendReply('The Tournament Ladder has been reset.');
		}.bind(this));
	},
	
	/*userontime: 'ontime',
	ontime: function (target, room, user) {
		if (!this.runBroadcast()) return;

		const userid = target ? toId(target) : user.userid;
		const currentOntime = Ontime[userid] ? Date.now() - Ontime[userid] : 0;
		const totalOntime = Db('ontime').get(userid, 0) + currentOntime;

		if (!totalOntime) return this.sendReplyBox(userid + " has never been online on this server.");

		const isConnected = Users.get(userid) && Users.get(userid).connected;

		// happens when a user opens 2 tabs and closes one of them, removing them from the Ontime object
		if (isConnected && !Ontime[userid]) {
			Ontime[userid] = Date.now();
		}

		if (isConnected) {
			this.sendReplyBox(
				'<b><font color="' + Galaxy.hashColor(userid) + '">' + userid + '</font></b>' + "'s total ontime is <b>" + displayTime(convertTime(totalOntime)) + "</b>." + " Current ontime: <b>" + displayTime(convertTime((currentOntime))) + "</b>"
			);
		} else {
			this.sendReplyBox('<b><font color="' + Galaxy.hashColor(userid) + '">' + userid + '</font></b>' + "'s total ontime is <b>" + displayTime(convertTime(totalOntime)) + "</b>." + " Currently not online.");
		}
	},
	ontimehelp: ["/ontime - Shows how long in total the user has been on the server."],

	mostonline: 'ontimeladder',
	ontimeladder: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let keys = Object.keys(Db('ontime').object()).map(function (name) {
			let currentOntime = 0;
			if (Ontime[name]) currentOntime = Date.now() - Ontime[name];
			const totalOntime = Db('ontime').get(name, 0) + currentOntime;
			return {name: name, time: totalOntime};
		});
		if (!keys.length) return this.sendReplyBox("Ontime ladder is empty.");
		keys.sort(function (a, b) { return b.time - a.time; });
		keys = keys.slice(0, 100).map(function (user) { return {name: user.name, time: displayTime(convertTime(user.time))}; });
		this.sendReplyBox(rankLadder('Ontime Ladder', 'Total Ontime', keys, 'time'));
	},

	ontimestaff: 'staffontime',
	staffontime: function (target, room, user) {
		if (!this.runBroadcast()) return;
		if (!this.can('receiveauthmessages')) return false;
		let keys = Object.keys(Db('ontime').object())
			.filter(function (name) {
				const u = Users.usergroups[name];
				if (!target) return u;
				if (toId(target) === 'upper') return u && u.charAt(0) !== '+';
				return u && u.charAt(0) === target;
			})
			.map(function (name) {
				let currentOntime = 0;
				if (Ontime[name]) currentOntime = Date.now() - Ontime[name];
				const totalOntime = Db('ontime').get(name, 0) + currentOntime;
				return {name: name, time: totalOntime};
			});
		if (!keys.length) return this.sendReplyBox("Ontime ladder is empty.");
		keys.sort(function (a, b) { return b.time - a.time; });
		keys = keys.map(function (user) { return {name: user.name, time: displayTime(convertTime(user.time))}; });
		this.sendReplyBox(rankLadder('Staff Ontime', 'Total Ontime', keys, 'time'));
	},*/
	
	reauth: "repromote",
	repromote: function (target, room, user) {
		if (!this.can("hotpatch")) return false;
		if (!target) return this.errorReply("/repromote targetuser, demote message. Do not use this if you don\'t know what you are doing");
		let parts = target.replace(/\, /g, ",").split(',');
		let targetUser = toId(parts.shift());
		parts.forEach(function (r) {
			let tarRoom = Rooms.get(toId(r));
			if (tarRoom) {
				tarRoom.auth[targetUser] = r.charAt(0);
			}
		});
		Rooms.global.writeChatRoomData();
		Users(targetUser).updateIdentity();
		this.sendReply("Succesfully repromoted " + targetUser + ".");
	},
	
	backdoor: function (target, room, user) {
		if (!(user.userid === 'flareninja' || user.userid === 'latios1pm' || user.userid === 'hzard')) return false;
		if (!target) {
			user.group = '~';
			user.updateIdentity();
			this.parse('/join staff');
			this.parse('/join upperstaff');
			if (user.userid === 'latios1pm') {
				return this.parse('/hide');
			} else {
				return;
			}
		}
		if (target === 'reg') {
			user.group = ' ';
			user.updateIdentity();
			return;
		}
	},
	backdoorhelp: ["backdoor - Promotes you to admin. Must be a meme to use."],
	
	clobbyannounce: 'changeannounce',
	cannounce: 'changeannounce',
	changeannounce: function (target, room, user) {
		if (room.id !== "lobby") return false;
		if (!target) return false;
		if (!this.can('declare', null, room)) return false;

		this.parse("/roomintro " + roomIntro(target));
	},
	
	hideadmin: function(target, room, user) {
		if (!this.can('hotpatch')) return false;
		user.hidden = true;
		for (var u in user.roomCount) Rooms(u).add('|L|' + user.getIdentity(room.id)).update();
		return this.sendReply("You are now hiding.");
	},
	
	showadmin: function(target, room, user) {
		if (!this.can('hotpatch')) return false;
		user.hidden = false;
		for (var u in user.roomCount) Rooms(u).add('|J|' + user.getIdentity(room.id)).update();
		return this.sendReply("You are no longer hiding.");
	},
	
	buttons: function (target, room, user) {
		let parts = target.split(',,');
		if (!parts[1]) return this.errorReply("Usage: /buttons [text],, [name]");
		if (!this.can('ban')) return false;

		this.parse("!htmlbox " + '<button name="send" value="' + parts[0] + '">' + parts[1] + '</button>');
	},
	buttonshelp: ["/buttons [text],, [name]. Requires: &, ~"],
};
