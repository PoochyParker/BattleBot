// Require the items.json file
const fetch = require('node-fetch');
const {writeFile} = require('fs');
const {promisify} = require('util');
const Enmap = require('enmap');
const writeFilePromise = promisify(writeFile);

function downloadFile(url, outputPath) {
	console.log(url);
   return fetch(url)
      .then(x => x.arrayBuffer())
      .then(x => writeFilePromise(outputPath, Buffer.from(x)));
}

const emote_rarities = new Map([
  		[1, "Common"],
  		[2, "Uncommon"],
  		[3, "Super"],
  		[4, "Ultra"],
  		[5, "Special"]
  ]);

// eslint-disable-next-line no-unused-vars
module.exports.run = (client, message, args, level) => {
	// Format editemotes add [emote] [rarity] [name: optional]
	if (args[0] == "add") { //Adding emote
			const emote_id = client.stripEmote(args[1]);
			const emote = client.emojis.cache.find(emoji => emoji.id == emote_id);
			if (! (/^[0-9]*$/i.test(emote_id))) { return message.error("Emote not given", 'The second argument of the add command must be a valid emote.'); }
			else {
				console.log(args[1]);
				if (! emote.animated) {
					var filepath = `/home/pi/BattleBot/commands/emotes/emote_stash/${emote.name}.png`;
					downloadFile(`https://cdn.discordapp.com/emojis/${emote_id}.png`, filepath); }
				else {
					var filepath = `/home/pi/BattleBot/commands/emotes/emote_stash/${emote.name}.gif`;
					downloadFile(`https://cdn.discordapp.com/emojis/${emote_id}.gif`, filepath); }
				// Timeout to handle improper emote addition / Discord-side server errors to help maintain state
				setTimeout(function(){	
				client.guilds.cache.get('984303759603695696').emojis.create(filepath, emote.name)
					.then(emoji => {
						console.log(`Created new emoji with name ${emoji.name}!`); 
						client.emotes.ensure(emoji.id, {id: emoji.id, name: emoji.name, rarity: parseInt(args[2]), alt_name: args.length > 3 ? [args.slice(3).join(' ')] : [], origin_server: emoji.guild.id, is_spotlight: false});

						return message.success(`Added the new emote __${client.emotes.get(emoji.id, "alt_name").length > 0 ? client.emotes.get(emoji.id, "alt_name")[0] : emoji.name}__ ${client.emojis.cache.get(emoji.id)}`, `RARITY: ${emote_rarities.get(parseInt(args[2]))}`);
					})
					.catch(console.error);}, 1000);
			}
	}
	if (args[0] == "change" || args[0] == "edit") {
			
	}
	if (args[0] == "show") {
		let msg = "";
		const sorted_emotes = client.emotes.array().sort((a, b) => a.rarity - b.rarity);
		sorted_emotes.forEach( (val) => {
			console.log(`${val.id} - ${val}`);
			msg += `**${val.alt_name != [] ? val.alt_name[0] : val.name}** ${client.guilds.cache.get(val.origin_server).emojis.cache.get(val.id)} - Rarity: ${emote_rarities.get(parseInt(val.rarity))} ${val.is_spotlight ? "[SPOTLIGHT]" : ""}\n`;
		});
		return message.channel.send(msg != "" ? msg : "There are no emotes registered for Poochybot.");
	}
	if (args[0] == "setspotlight") {
		let msg = "";
		// Removes spotlight from emotes that are currently spotlighted
		client.emotes.filter(emote => emote.is_spotlight == true).forEach(emote => { let v = client.emotes.observe(emote.id); v.is_spotlight = false;});
		for (let i = 1; i < args.length; i++) {
			if (client.emotes.has(client.stripEmote(args[i]))) {
					let val = client.emotes.observe(client.stripEmote(args[i]));	
					val.is_spotlight = true;
					msg += `**${val.alt_name != [] ? val.alt_name[0] : val.name}** ${client.guilds.cache.get(val.origin_server).emojis.cache.get(val.id)} - Rarity: ${emote_rarities.get(parseInt(val.rarity))} ${val.is_spotlight ? "[SPOTLIGHT]" : ""}\n`;	
			}
		}	
		return message.success("Shined the spotlight on these emotes!", msg);
	}
  
};

module.exports.conf = {
	guildOnly: true,
	aliases: ['ee', 'editemote'],
	permLevel: 'Mod',
};

module.exports.help = {
	name: 'editemotes',
	category: 'emotes',
	minidesc: 'Interface with emotes',
	description: 'Add, edit, delete, and show the emotes used for Neo PoochyBot',
	usage: 'editemotes add/show/edit/delete',
};