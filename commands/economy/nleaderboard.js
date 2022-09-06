module.exports.run = async (client, message, [page, numb, just_return = false], level, Discord, eco) => {
  // If a user was mentioned, find them on the leaderboard and display their placement
  const starbits = client.emojis.cache.get(client.emoji.starbits);
  const bluecoins = client.emojis.cache.get(client.emoji.bluecoins);
  
	let person = (typeof message.member !== 'undefined') ? message.member : client.guilds.cache.get('355119082808541184').members.cache.get(message.author.id);
	const owner = await client.fetchOwner();
	let num = (! numb) ? 1 : parseInt(numb);
	
	let embed = new Discord.MessageEmbed()
		.setColor(Math.floor(Math.random()*16777215).toString(16))
        .setFooter(`Created and Maintained by ${owner.tag} | ${client.version}`, client.user.displayAvatarURL())
        .setTimestamp()
        .setThumbnail(message.guild.iconURL({ format: 'gif' }));
	
	if (page) page = page.toLowerCase();
	
	let arrows = new Discord.MessageActionRow();
	const buttons = new Discord.MessageActionRow()
		.addComponents(
			new Discord.MessageButton().setCustomId(`lb ${person.id} points ${message.id}`).setLabel('Points').setStyle('PRIMARY'),
			new Discord.MessageButton().setCustomId(`lb ${person.id} starbits ${message.id}`).setLabel('Starbits').setStyle('PRIMARY'),
			new Discord.MessageButton().setCustomId(`lb ${person.id} coins ${message.id}`).setLabel('Blue Coins').setStyle('PRIMARY'),
			new Discord.MessageButton().setCustomId(`lb ${person.id} emotes ${message.id}`).setLabel('Emotes').setStyle('PRIMARY')
		);
	let users = [];

	
	if (page == 'points') {
		users = client.userDB.array().sort((a,b) => (b.points + 27000 * b.prestige) - (a.points + 27000 * a.prestige)); //Sorts users by the number of points they have gotten	
		
		const userIndex = users.findIndex((u) => u.id === message.author.id) + 1;	
		embed.addField('\u200b', userIndex != -1 ? `You're currently ranked #${userIndex} on the leaderboard!` : "You are currenty unranked on the leaderboard.") //';
		
		if ((num - 1) * 10 > users.length) { num = 1; }
		const t_users = users.slice((num - 1) * 10, num * 10);
		embed.setTitle(`1-Up World Points Leaderboard — #${(num - 1) * 10 + 1} - #${num * 10}`);
		
		for (let i = 0; i < t_users.length; i++) {
			embed.addField(`${((num - 1) * 10) + i + 1} — ${client.developName(message.guild.members.cache.get(t_users[i].id))}`, `${t_users[i].points + t_users[i].prestige * 27000} points earned`);
		}
	}
	else if (page == 'starbits') {
		
		users = client.userStats.array().filter(user => user.starbits > 0).sort((a,b) => (b.starbits) - (a.starbits)); //Sorts users by the number of starbits they have gotten	
		
		const userIndex = users.findIndex((u) => u.id === message.author.id) + 1;	
		embed.addField('\u200b', userIndex != -1 ? `You're currently ranked #${userIndex} on the leaderboard!` : "You are currenty unranked on the leaderboard.") //';
	
		if ((num - 1) * 10 > users.length) { num = 1; }
		const t_users = users.slice((num - 1) * 10, num * 10);
		embed.setTitle(`1-Up World Starbits Leaderboard — #${(num - 1) * 10 + 1} - #${num * 10}`);
		
		for (let i = 0; i < t_users.length; i++) {
			embed.addField(`${((num - 1) * 10) + i + 1} — ${client.developName(message.guild.members.cache.get(t_users[i].id))}`, `${t_users[i].starbits} starbits ${starbits} earned`);
		}
	}
	else if (page == 'bluecoins' || page == 'coins') {
		page = 'coins';
		
		users = client.userStats.array().filter(user => user.blue_coins > 0).sort((a,b) => (b.blue_coins) - (a.blue_coins)); //Sorts users by the number of Blue Coins they have gotten	
		
		const userIndex = users.findIndex((u) => u.id === message.author.id) + 1;	
		embed.addField('\u200b', userIndex != -1 ? `You're currently ranked #${userIndex} on the leaderboard!` : "You are currenty unranked on the leaderboard.") //';
		embed.setTitle(`1-Up World Blue Coins Leaderboard — #${(num - 1) * 10 + 1} - #${num * 10}`);
		
		if ((num - 1) * 10 > users.length) { num = 1; }
		const t_users = users.slice((num - 1) * 10, num * 10);
		
		for (let i = 0; i < t_users.length; i++) {
			embed.addField(`${((num - 1) * 10) + i + 1} — ${client.developName(message.guild.members.cache.get(t_users[i].id))}`, `${t_users[i].blue_coins} Blue Coins ${bluecoins} earned`);
		}
	}
	else if (page == 'emotes') {
		
		users = client.userStats.array().filter(user => user.emotes > 0).sort((a,b) => (b.emotes) - (a.emotes)); //Sorts users by the number of emotes they have gotten	
		
		const userIndex = users.findIndex((u) => u.id === message.author.id) + 1;	
		embed.addField('\u200b', userIndex != -1 ? `You're currently ranked #${userIndex} on the leaderboard!` : "You are currenty unranked on the leaderboard.") //';
		embed.setTitle(`1-Up World Emotes Leaderboard — #${(num - 1) * 10 + 1} - #${num * 10}`);	
	
		if ((num - 1) * 10 > users.length) { num = 1; }
		const t_users = users.slice((num - 1) * 10, num * 10);
		
		for (let i = 0; i < t_users.length; i++) {
			embed.addField(`${((num - 1) * 10) + i + 1} — ${client.developName(message.guild.members.cache.get(t_users[i].id))}`, `${t_users[i].blue_coins} emotes earned`);
		}
	}
	else {
		page = 'points';
		
		users = client.userDB.array().sort((a,b) => (b.points + 27000 * b.prestige) - (a.points + 27000 * a.prestige)); //Sorts users by the number of points they have gotten	
		
		const userIndex = users.findIndex((u) => u.id === message.author.id) + 1;	
		embed.addField('\u200b', userIndex != -1 ? `You're currently ranked #${userIndex} on the leaderboard!` : "You are currenty unranked on the leaderboard.") //';
	
		if ((num - 1) * 10 > users.length) { num = 1; }
		const t_users = users.slice((num - 1) * 10, num * 10);
		embed.setTitle(`1-Up World Points Leaderboard — #${(num - 1) * 10 + 1} - #${num * 10}`);
		
		for (let i = 0; i < t_users.length; i++) {
			embed.addField(`${((num - 1) * 10) + i + 1} — ${client.developName(message.guild.members.cache.get(t_users[i].id))}`, `${t_users[i].points + t_users[i].prestige * 27000} points earned`);
		}
	}
	
	const back = num > 1 ? num - 1 : 1;
	const next = num * 10 < users.length ? num + 1 : num;
	arrows.addComponents(
			new Discord.MessageButton().setCustomId(`lb ${person.id} ${page} ${back} back ${message.id}`).setLabel('<--').setStyle('SECONDARY'),
			new Discord.MessageButton().setCustomId(`lb ${person.id} ${page} ${next} next ${message.id}`).setLabel('-->').setStyle('SECONDARY')
		);
	
	
	if (just_return)
		return just_return.update({ embeds: [embed], components: [buttons, arrows]});
	else
		return message.channel.send({ embeds: [embed], components: [buttons, arrows]});
};

module.exports.conf = {
  guildOnly: true,
  aliases: ['nlb', 'nleaders', 'nuleader'],
  permLevel: 'User',
};

module.exports.help = {
  name: 'nleaderboard',
  category: 'economy',
  minidesc: 'Ranks users by their amount of starbits/blue coins/# emotes/points',
  description: 'Shows the top 10 users on the server. If a user is mentioned, tells the position of the user on the leaderboard',
  usage: 'leaderboard <@user>',
  details: '<@user> => (Optional) Any valid member of the server',
};