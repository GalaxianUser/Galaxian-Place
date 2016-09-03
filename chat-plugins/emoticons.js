var color = require('../config/color');

exports.parseEmoticons = parseEmoticons;

var emotes = {
	'#freewolf': 'http://i.imgur.com/ybxWXiG.png',
	'Doge': 'http://fc01.deviantart.net/fs71/f/2014/279/4/5/doge__by_honeybunny135-d81wk54.png',
	'feelscri': 'http://i.imgur.com/QAuUW7u.jpg?1',
	'#murica': 'http://i.imgur.com/d4XueEr.jpg',
	'#applejuice': 'http://i.imgur.com/s3TJfOB.jpg',
	'urmom': 'https://static-cdn.jtvnw.net/emoticons/v1/35218/1.0',
	'facepalm': 'http://i.imgur.com/lv3GmpM.png',
	'feelscool': 'http://i.imgur.com/qdGngVl.jpg?1',
	'facepalm2': 'http://i.imgur.com/ylrqFwJ.png',
	'feelsemo': 'http://i.imgur.com/FPolh5d.jpg',
	'feelsfdra': 'http://i.imgur.com/ZIcl9Zy.jpg',
	'feelsbd': 'http://i.imgur.com/YyEdmwX.png',
	'feelsbm': 'http://i.imgur.com/xwfJb2z.png',
	'feelswtf': 'http://i.imgur.com/BzZJedC.jpg',
	'feelsgro': 'http://i.imgur.com/jLhP0bZ.png',
	'feelsky': 'http://i.imgur.com/BtATPId.png',
	'udonsay': 'http://r32.imgfast.net/users/3215/23/26/64/smiles/280467785.jpg',
	'feelslot': 'http://i.imgur.com/tl88F7i.png',
	'feelsarbk': 'http://i.imgur.com/HqyjN7G.png',
	'feelsbn': 'http://i.imgur.com/wp51rIg.png',
	'feelsdd': 'http://i.imgur.com/fXtdLtV.png',
	'feelsdoge': 'http://i.imgur.com/GklYWvi.png',
	'feelsgd': 'http://i.imgur.com/Jf0n4BL.png',
	'feelsgn': 'http://i.imgur.com/juJQh0J.png',
	'feelsjig': 'http://i.imgur.com/hSzqy5z.png',
	'feelsbulba': 'http://i.imgur.com/PShsRD2.png',
	'feelsshrk': 'http://i.imgur.com/amTG3jF.jpg',
	'kappa': 'http://i.imgur.com/ZxRU4z3.png',
	'feelsHigh': 'http://i.imgur.com/s9I2bxp.jpg',
	'meGusta': 'http://cdn.overclock.net/3/36/50x50px-ZC-369517fd_me-gusta-me-gusta-s.png',
	'feelshp': 'http://i.imgur.com/1W19BDG.png',
	'feelsmd': 'http://i.imgur.com/DJHMdSw.png',
	'feelsnv': 'http://i.imgur.com/XF6kIdJ.png',
	'feelsok': 'http://i.imgur.com/gu3Osve.png',
	'feelspika': 'http://i.imgur.com/mBq3BAW.png',
	'feelspink': 'http://i.imgur.com/jqfB8Di.png',
	'feelspn': 'http://i.imgur.com/wSSM6Zk.png',
	'feelspr': 'http://i.imgur.com/3VtkKfJ.png',
	'feelsrg': 'http://i.imgur.com/DsRQCsI.png',
	'feelsrs': 'http://i.imgur.com/qGEot0R.png',
	'feelssc': 'http://i.imgur.com/cm6oTZ1.png',
	'feelscrazy': 'http://i.imgur.com/NiJsT5W.png',
	'fukya': 'http://i.imgur.com/ampqCZi.gif',
	'fukno': 'http://i.imgur.com/QjQTx9W.png',
	'funnylol': 'http://i.imgur.com/SlzCghq.png',
	'hmmface': 'http://i.imgur.com/Z5lOwfZ.png',
	'noface': 'http://i.imgur.com/H744eRE.png',
	'durp': 'http://i.imgur.com/2BloGXG.jpg',
	'Obama': 'http://i.imgur.com/rBA9M7A.png',
	'oshet': 'http://i.imgur.com/yr5DjuZ.png',
	'Sanic': 'http://i.imgur.com/Y6etmna.png',
	'wtfman': 'http://i.imgur.com/kwR8Re9.png',
	'waitwat': 'http://i.imgur.com/FpxTQxU.jpg',
	'xaa': 'http://i.imgur.com/V728AvL.png',
	'yayface': 'http://i.imgur.com/anY1jf8.png',
	'trollface': 'http://cdn.overclock.net/a/a0/50x50px-ZC-a0e3f9a7_troll-troll-face.png',
	'feelswin': 'http://i.imgur.com/rbs9pZG.png?1',
	'hypnotoad': 'http://i.imgur.com/lJtbSfl.gif',
	'Kreygasm': 'https://static-cdn.jtvnw.net/emoticons/v1/41/1.0',
	'feelsilum': 'http://i.imgur.com/CnyGTTD.png',
	'PeoplesChamp': 'http://i.imgur.com/QMiMBKe.png',
	'trash': 'http://i.imgur.com/rghiV9b.png',
	'feelsrb': 'http://i.imgur.com/L6ak1Uk.png',
	'EleGiggle': 'https://static-cdn.jtvnw.net/emoticons/v1/4339/2.0',
	'4Head': 'https://static-cdn.jtvnw.net/emoticons/v1/354/1.0',
	'DansGame': 'https://static-cdn.jtvnw.net/emoticons/v1/33/1.0',
	'feelspix': 'https://38.media.tumblr.com/260fdf377f5ac9e90b8ee9e609df5e69/tumblr_n3wgykjcVB1s5h198o1_500.gif',
	'feelstea': 'http://i.imgur.com/M0f2zgJ.jpg?1',
	'gudone': 'http://i.imgur.com/USkp1b9.png',
	'brkgod': 'http://i.imgur.com/SQgq5wU.png?1',
	'UTgod': 'http://i.imgur.com/DdShUbi.png?1',
	'afruca': 'http://i.imgur.com/jojooyw.png',
	'feelsFU': 'http://i.imgur.com/3SBUEuY.jpg',
	'feelscreep': 'http://i.imgur.com/zJp7oJL.gif',
	'feelsWave': 'http://i.imgur.com/VwCJqjD.gif',
	'feelsacid': 'http://i.imgur.com/8JLSPcr.gif',
	'feelssprout': 'http://i.imgur.com/D1p76vd.gif',
	'feelsevil': 'http://i.imgur.com/OPmBOeJ.jpg',
	'feels9000': 'http://i.imgur.com/1J8r5wR.jpg',
	'feelsskel': 'http://i.imgur.com/4oMCCSf.jpg',
	'feelscompton': 'http://i.imgur.com/mhbfJjF.jpg',
	'feelsShkspr': 'http://i.imgur.com/LSPY5ui.png',
	'feelssuggest':'http://i.imgur.com/MErmMby.jpg',
	'feelsterror': 'http://i.imgur.com/U5v9uOY.jpg',
	'feelstater': 'http://i.imgur.com/D1pWnHa.jpg',
	'feelsgiggle': 'http://i.imgur.com/7GEK2iS.jpg',
	'feelsshade': 'http://i.imgur.com/Tuza6Y4.png',
	'feelsorly': 'http://i.imgur.com/iMd6UE8.jpg',
	'feelsmage': 'http://i.imgur.com/bCsvhJO.gif',
	'SILVER!!!': 'http://i.imgur.com/hwZWXoq.jpg',
	'totarmy': 'http://i.imgur.com/EGZaqXs.jpg',
	'feelsgyara': 'http://i.imgur.com/qHR0leo.png',
	'Thumbsup': 'http://i.imgur.com/kCqFQtU.jpg',
	'feelshill': 'http://i.imgur.com/cE94TBS.jpg',
	'kittymadness':'http://i.imgur.com/9Zjff5d.gif',
	'feelstoast': 'http://i.imgur.com/M3Xj8RB.png',
	'passbleach': 'http://i.imgur.com/jf2ZNoZ.jpg',
	'feelshitler': 'http://i.imgur.com/OAB7tBi.jpg',
	'feels10yrold':'http://i.imgur.com/su7hKmw.gif',
	'feelsbug': 'http://i.imgur.com/XSHQvAr.png',
	'feelsbomber':'http://i.imgur.com/mFHjb4B.jpg',
	'feelsfreezer':'http://i.imgur.com/EnmDAxX.png',
	'feelssuper':'http://i.imgur.com/aheEov7.jpg',
	'feelsreviver':'http://i.imgur.com/uGTQBBm.jpg',
	'feelsck':'http://i.imgur.com/IUB7N1D.png',
	'Pnoivern':'http://i.imgur.com/M2sHXyB.png',
	'Ppyroar':'http://i.imgur.com/kz35y1U.png',
	'feelschime': 'http://i.imgur.com/uIIBChH.png',
	'feelsreally': 'https://cdn.betterttv.net/emote/55b0fa13f54d6ecb7927ec54/2x',
	'feelssans': 'http://i.imgur.com/DPr9ifK.gif',
	'feelstired': 'http://i.imgur.com/EgYViOs.jpg',
	'lenny': 'http://i.imgur.com/FhOwY2P.png',
	'feelsgoomy': 'https://orig03.deviantart.net/fcd4/f/2013/339/2/b/free_squishy_goomy_icon_by_glitchedvirus-d6wway3.gif',
	'feelsvulpix': 'https://a.deviantart.net/avatars/d/a/daneisthebest.gif',
	'feelsludi': 'http://propokemon.com/wp-content/uploads/2015/02/272_ludicolo_by_pklucario-d6fluwo-50x50.png',
	'feelsnazi': 'http://thinkdrops.gr/wp-content/uploads/2013/09/swastika-50x50.jpg',
	'datboi': 'http://i.imgur.com/9s6gd3U.gif',
	'feelssota':'http://m.uploadedit.com/ba3s/1464057057769.gif',
	'feelslatias': 'http://i.imgur.com/OPZuG3f.gif',
	'feelslatios': 'http://i.imgur.com/QCoBmpe.gif',
	'feelsincog': 'http://i.imgur.com/o4KxmWe.png',
	'feelsScizor': 'http://i.imgur.com/sDWpTYN.gif',
	'feelsamp': 'http://orig06.deviantart.net/d756/f/2015/255/f/3/pokemon_ampharos_lick_icon___free_to_use_by_icelemontea83-d97jr15.gif',
	'feelseevee': 'http://a.deviantart.net/avatars/f/r/frostrus.gif?6',
	'feelsdnite': 'http://orig15.deviantart.net/92bd/f/2012/017/0/f/dragonite_lick_icon_by_supersilverabsol-d4mmxxs.gif',
	'feelstorchic': 'http://orig11.deviantart.net/477e/f/2010/113/f/7/torchic_free_lick_avatar_by_yakalentos.gif',
	'feelsshaymin': 'http://i.imgur.com/Aw8KAmi.gif',
	'feelsespeon': 'http://i.imgur.com/R6uJPav.gif',
	'feelspichu': 'http://i.imgur.com/vqEpogr.gif',
	'feelscx': 'http://i.imgur.com/zRSUw2n.gif',
	'feelsfox': 'http://orig10.deviantart.net/4383/f/2012/172/f/1/victini_lick_avatar_by_neogalactic54-d54daqi.gif',
	'feelslucario': 'http://i.imgur.com/ZQbYp9l.gif',
	'feelsfloat': 'http://i.imgur.com/XKP1Kpf.gif',
	'feelslux': 'http://i.imgur.com/hDKCZMt.gif',
	'feelsnii': 'http://orig11.deviantart.net/9d39/f/2011/165/8/6/request_from_colleenkat_by_kisa013-d3iwvbv.gif',
	'feelsvpn':'http://i.imgur.com/ODTZISl.gif',
	'feelsChar':'https://orig04.deviantart.net/9abc/f/2013/118/8/e/charizard_lick_icon_by_spritegirl999-d63d7sf.gif',
	'feelsem': 'http://orig01.deviantart.net/3f09/f/2010/128/0/a/pika_lick_icon_by_brawler_pika.gif',
	'feelsnyan': 'http://i.imgur.com/sUZkR32.gif',
	'feelslugia': 'http://orig12.deviantart.net/3fa8/f/2011/211/9/8/98d68bd55eda5dd504b543cd35079dd5-d424a9r.gif',
	'rarechar': 'https://cdn.betterttv.net/emote/562b9101a6646e202bcc5447/2x',
	'happyface': 'http://imgur.com/krzCL3j.jpg',
	'KappaPride': 'http://i.imgur.com/GMs8OxU.jpg',
	'feelsweird': 'https://cdn.betterttv.net/emote/5603731ce5fc5eff1de93229/2x',
	'feelssad': 'https://cdn.betterttv.net/emote/5613b7ca141069f91f48acca/2x',
	'feelsspl': 'http://i.imgur.com/RIOKSJ3.gif',
	'feelspop': 'http://orig02.deviantart.net/c569/f/2016/131/8/b/popplio_icon_by_rayfierying-da244yn.gif',
	'feelscop': 'http://i.imgur.com/eNaFHvR.png?1',
	'jcena': 'http://i.imgur.com/hPz30Ol.jpg?2',
	'owait': 'https://cdn.betterttv.net/emote/55ab96ce9406e5482db53424/2x',
	'feelslag': 'https://cdn.betterttv.net/emote/56758c29bf317838643c7e97/2x',
	'stonedaf': 'https://cdn.betterttv.net/emote/5638163f55dee26813aebbf1/2x',
	'sanik': 'http://i.imgur.com/Y6etmna.png',
	'uliek': 'http://orig15.deviantart.net/f7e5/f/2015/044/6/c/pokemon_gif_mudkip_by_dottypurrs-d8huvrv.gif',
	'feelsarken': 'http://imgur.com/YCCDZWq.png',
	'orats': 'http://orig12.deviantart.net/edbf/f/2014/279/2/5/shiny_female_rattata_sprite_by_pokemon__sprites-d81w4pv.gif',
	'feelsalola': 'http://imageresize.org/Output/65cf7d5d-f044-4ece-9ad5-531cb1b60a0c.jpg',
	'feelstrump': 'http://i.imgur.com/tqW8s6Y.png',
	'feelschara': 'http://i.imgur.com/LH303HL.gif',
	'feelsithi': 'http://i.picresize.com/images/2016/05/31/IXCqY.jpg',
	'joshawott': 'http://orig08.deviantart.net/a30d/f/2015/010/5/8/oshawott_swag_by_whatiget4beinganerd-d82v3br.gif',
	'feelsvivid': 'http://i.imgur.com/n3p5GeQ.gif',
	'kms': 'http://images.dealsoff.com/wp-content/uploads/2016/06/19450114-50x50.gif'
};
var emotesKeys = Object.keys(emotes);
var patterns = [];
var metachars = /[[\]{}()*+?.\\|^$\-,&#\s]/g;

for (var i in emotes) {
	if (emotes.hasOwnProperty(i)) {
		patterns.push('(' + i.replace(metachars, '\\$&') + ')');
	}
}
var patternRegex = new RegExp(patterns.join('|'), 'g');

/**
 * Parse emoticons in message.
 *
 * @param {String} message
 * @param {Object} room
 * @param {Object} user
 * @param {Boolean} pm - returns a string if it is in private messages
 * @returns {Boolean|String}
 */
function parseEmoticons(message, room, user, pm) {
	if (typeof message !== 'string' || (!pm && room.disableEmoticons)) return false;

	var match = false;
	var len = emotesKeys.length;


	while (len--) {
		if (message && message.indexOf(emotesKeys[len]) >= 0) {
			match = true;
			break;
		}
	}

	if (!match) return false;

	// escape HTML
	message = Tools.escapeHTML(message);

	// add emotes
	message = message.replace(patternRegex, function (match) {
		var emote = emotes[match];
		return typeof emote === 'string' ? '<img src="' + emote + '" title="' + match + '" height="50" width="50" />' : match;
	});

	// __italics__
	message = message.replace(/\_\_([^< ](?:[^<]*?[^< ])?)\_\_(?![^<]*?<\/a)/g, '<i>$1</i>');

	// **bold**
	message = message.replace(/\*\*([^< ](?:[^<]*?[^< ])?)\*\*/g, '<b>$1</b>');

	var group = user.getIdentity().charAt(0);
	if (room.auth) group = room.auth[user.userid] || group;

	var style = "background:none;border:0;padding:0 5px 0 0;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:9pt;cursor:pointer";

	message = "<div class='chat'>" + "<small>" + group + "</small>" + "<button name='parseCommand' value='/user " + user.name + "' style='" + style + "'>" + "<b><font color='" + color(user.userid) + "'>" + user.name + ":</font></b>" + "</button><em class='mine'>" + message + "</em></div>";
	if (pm) return message;

	room.addRaw(message);

	return true;
}

/**
 * Create a two column table listing emoticons.
 *
 * @return {String} emotes table
 */
function create_table() {
	var emotes_name = Object.keys(emotes);
	var emotes_list = [];
	var emotes_group_list = [];
	var len = emotes_name.length;

	for (var i = 0; i < len; i++) {
		emotes_list.push("<td>" +
			"<img src='" + emotes[emotes_name[i]] + "'' title='" + emotes_name[i] + "' height='50' width='50' />" +
			emotes_name[i] + "</td>");
	}

	var emotes_list_right = emotes_list.splice(len / 2, len / 2);

	for (var i = 0; i < len / 2; i++) {
		var emote1 = emotes_list[i],
			emote2 = emotes_list_right[i];
		if (emote2) {
			emotes_group_list.push("<tr>" + emote1 + emote2 + "</tr>");
		} else {
			emotes_group_list.push("<tr>" + emote1 + "</tr>");
		}
	}

	return "<div class='infobox'><center><b><u>List of Emoticons</u></b></center>" + "<div class='infobox-limited'><table border='1' cellspacing='0' cellpadding='5' width='100%'>" + "<tbody>" + emotes_group_list.join("") + "</tbody>" + "</table></div></div>";
}

var emotes_table = create_table();

exports.commands = {
	blockemote: 'blockemoticons',
	blockemotes: 'blockemoticons',
	blockemoticon: 'blockemoticons',
	blockemoticons: function (target, room, user) {
		if (user.blockEmoticons === (target || true)) return this.sendReply("You are already blocking emoticons in private messages! To unblock, use /unblockemoticons");
		user.blockEmoticons = true;
		return this.sendReply("You are now blocking emoticons in private messages.");
	},
	blockemoticonshelp: ["/blockemoticons - Blocks emoticons in private messages. Unblock them with /unblockemoticons."],

	unblockemote: 'unblockemoticons',
	unblockemotes: 'unblockemoticons',
	unblockemoticon: 'unblockemoticons',
	unblockemoticons: function (target, room, user) {
		if (!user.blockEmoticons) return this.sendReply("You are not blocking emoticons in private messages! To block, use /blockemoticons");
		user.blockEmoticons = false;
		return this.sendReply("You are no longer blocking emoticons in private messages.");
	},
	unblockemoticonshelp: ["/unblockemoticons - Unblocks emoticons in private messages. Block them with /blockemoticons."],

	emotes: 'emoticons',
	emoticons: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReply("|raw|" + emotes_table);
	},
	emoticonshelp: ["/emoticons - Get a list of emoticons."],

	toggleemote: 'toggleemoticons',
	toggleemotes: 'toggleemoticons',
	toggleemoticons: function (target, room, user) {
		if (!this.can('declare', null, room)) return false;
		room.disableEmoticons = !room.disableEmoticons;
		this.sendReply("Disallowing emoticons is set to " + room.disableEmoticons + " in this room.");
		if (room.disableEmoticons) {
			this.add("|raw|<div class=\"broadcast-red\"><b>Emoticons are disabled!</b><br />Emoticons will not work.</div>");
		} else {
			this.add("|raw|<div class=\"broadcast-blue\"><b>Emoticons are enabled!</b><br />Emoticons will work now.</div>");
		}
	},
	toggleemoticonshelp: ["/toggleemoticons - Toggle emoticons on or off."],

	rande: 'randemote',
	randemote: function (target, room, user) {
		if (!this.runBroadcast()) return;
		var rng = Math.floor(Math.random() * emotesKeys.length);
		var randomEmote = emotesKeys[rng];
		this.sendReplyBox("<img src='" + emotes[randomEmote] + "' title='" + randomEmote + "' height='50' width='50' />");
	},
	randemotehelp: ["/randemote - Get a random emote."]
};

