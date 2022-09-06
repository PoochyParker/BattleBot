module.exports.run = async (client, message, args, level, Discord, eco) => {
  // Get the starbits emoji
  const starbits = client.emojis.cache.get(client.emoji.starbits);
  const bluecoins = client.emojis.cache.get(client.emoji.bluecoins);
  
  const d_star = 5000;
  const d_coin = 5;
  
  let user = client.userDB.observe(message.author.id);
  const now = new Date();
  const today = new Date(
	now.getFullYear(),
	now.getMonth(),
	now.getDate(),
	0, 0, 0);
  
  if (today - user.last_daily < 0) { //Not enough time has passed to do the new daily
  		const tom = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate() + 1,
			0, 0, 0);
  		return message.error('You already collected your daily currencies!', `**${message.member.displayName}**, You can collect your daily starbits ${starbits} and Blue Coins ${bluecoins} again <t:${tom[Symbol.toPrimitive]('number') / 1000}:R>!`)
  }
  
  else {
  		const multi = message.member.roles.cache.has('585533364489158666') ? 2 : 1; //If user has the 'Boost Star' role, rewards are doubled!
		user.starbits += (d_star * multi);  
		user.blue_coins += (d_coin * multi);
		user.last_daily = Date.now();
		
		let stats = client.userStats.observe(message.author.id);
		stats.starbits += (d_star * multi);
		stats.blue_coins += (d_coin * multi);
		
		return message.success('Dailies claimed!', `**${message.member.displayName}**, You collected ${d_star * multi} starbits ${starbits} and ${d_coin * multi} Blue Coins ${bluecoins}.\nYou now have ${user.starbits} starbits ${starbits} and ${user.blue_coins} Blue Coins ${bluecoins}!`);
  }
};

module.exports.conf = {
  guildOnly: true,
  aliases: ['nd', 'nuday'],
  permLevel: 'Mod',
};

module.exports.help = {
  name: 'anotherdaily',
  category: 'economy',
  minidesc: 'Get starbits once a day',
  description: 'Gives you Starbits and Blue Coins every 24 hours',
  usage: 'daily',
};