const Discord = require('discord.js');

let charEmotes = new Map([
        ['Mario', '891878777376878637'],
        ['Luigi', '891878779931226152'],
        ['Peach', '891878777448185956'],
        ['Daisy', '891878777389449267'],
        ['Toad', '891878777553059882'],
        ['Yoshi', '891878777544646707'],
        ['Bowser', '891878777280405564'],
        ['DK', '891878777318178836'],
        ['Wario', '891878777381093386'],
        ['Waluigi', '891878777016172565'],
        ['Goomba', '891878777313980436'],
        ['Koopa', '891878777284612156'],
        ['Bowser Jr.', '891878777255231519'],
        ['Diddy', '891878777066508411'],
        ['Dixie', '891878777146200075'],
        ['Cranky', '891878777255235614'],
        ['Toadette', '891878777632747601'],
        ['Toadsworth', '891878777070698537'],
        ['Petey', '891878779893448744'],
        ['Bobomb', '891878777238487040'],
        ['Boo', '891878777255239750'],
        ['E. Gadd', '891878777259454524'],
        ['Kamek', '891878776957468683'],
        ['Luma', '891878777276207125'],
        ['Funky', '891878777305583616'],
        ['Rosalina', '891878777410441216'],
		['Pauline', '891878777364295690'],
		['Birdo', '891878777066487870'],
        ['King Boo', '891878777355923496'],
        ['K. Rool', '891878777494323200'],
        ['Metal Mario', '891878777469157377'],
        ['Pink Gold Peach', '891878777305595904'],
        ['Vampire Wario', '891878777473343488'],
        ['Dry Bowser', '891878777292996619'],
        ['Pyoro', '891878777389461504'],
        ['Pianta', '891878777087467581'],
        ['BROS', '891878776957456445'],
        ['Marty', '891883508254007317'],
        ['Bayonetta', '891888190284247060'],
		['Garfield', '894691837258911854'],
		['aerith', '894691837284069476'],
    ]);

    const levelUpEmojis = [
    	'891851922615701565', // Start
      '751523400681259110', // Shroom
      '751523400782053567', // Shell
      '751523400421474516', // Flower
      '751523400803024927', // Leaf
      '754054543238627389', // Bell
      '751523400173879486', // Feather
      '754044526166933654', // Egg
      '754129851245658112', // Starbit
      '751523400538783775', // Moon
      '754060026146193419', // Shine
      '754044526460665856', // Special
      '893392833925505075', // 1-Up
    ];
    
    const levelUpEmojis8Bit = [
        '891851922615701565', // Start
        '893516899550367804', // Mushroom
        '893516899315494912', // Shell
        '893516899378421771', // Flower
        '893516899428728862', // Leaf
        '893516899365826641', // Bell
        '893516899416154122', // Feather
        '893516899307122708', // Egg
        '893516899541975050', // Starbit
        '893516899315482674', // Moon
        '893516899449704518', // Shine
        '893516899323875338', // Special
        '893516899495866440', // Prestige
    ];

    const excessiveCharacterArray = ['Mario', 'Luigi', 'Peach', 'Daisy', 'Toad', 'Yoshi', 'Bowser', 'DK', 'Wario', 'Waluigi', 'Goomba', 'Koopa', 'Bowser Jr.', 'Diddy', 'Dixie', 'Cranky', 'Toadette', 'Toadsworth', 'Petey', 'Bobomb', 'Boo', 'E. Gadd', 'Kamek', 'Luma', 'Funky', 'Rosalina', 'Birdo', 'Pauline', 'King Boo', 'K. Rool', 'Metal Mario', 'Pink Gold Peach', 'Dry Bowser', 'Vampire Wario', 'Pyoro', 'Pianta', 'BROS', 'Bayonetta', 'Marty', 'Garfield', 'aerith'];


/* eslint-disable no-param-reassign */
module.exports = (client) => {
	
	client.fetchOwner = async () => {
    // Fetch the user object of the owner and return it
    const owner = client.users.cache.get(client.config.ownerID);
    return owner;
  };
  
	//Profile-based functions
	client.createProfEmbed = (person, eco) => {
		const userFromDB = client.userDB.ensure(person.id, { points: 0, rank: person.roles.cache.has('391877990277185556') ? 1 : 0, prestige: 0});
   	 let runningEmote = client.emojis.cache.get('710519845124309394');
   	 const prestige = client.emojis.cache.get('894461229383450624');
    	let color = "#000000";
    	let role = "";

    // Gets emote of character if user has an applicable team role; uses Mario otherwise
    if (person.roles.cache.some((r) => r.name.includes('Team') && excessiveCharacterArray.includes(r.name.substr(r.name.indexOf(' ')+1)))) {
        role = person.roles.cache.find((r) => r.name.includes('Team') && excessiveCharacterArray.includes(r.name.substr(r.name.indexOf(' ')+1)));

	if (person.roles.cache.some((r) => r.name.includes('Garfield')))
	    role = person.roles.cache.find((r) => r.name.includes('Garfield'));
	if (person.roles.cache.some((r) => r.name.includes('aerith')))
	    role = person.roles.cache.find((r) => r.name.includes('aerith'));
	runningEmote = client.emojis.cache.get(charEmotes.get(role.name.substr(role.name.indexOf(' ')+1)));
	color = role.color.toString(16);
    }
    else {
        runningEmote = client.emojis.cache.get('891878777376878637');
	
    }

    const owner = client.users.cache.get(client.config.ownerID);

    const profileEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setFooter(`Created and Maintained by ${owner.tag} | ${client.version}`, client.user.displayAvatarURL())
        .setTimestamp()
        .setTitle(`${client.developName(person)}'s Profile`) //'
        .setThumbnail(person.user.displayAvatarURL());
        
	profileEmbed.addField(`SERVER STATUS`, `${role !== '' ? `${runningEmote} Joined Team ${role.name.substring(5)}!\n` : ''}${client.emojis.cache.get(levelUpEmojis[userFromDB.rank])} Advanced to Rank ${userFromDB.rank}!\n${userFromDB.prestige >= 1 ? `${prestige} Prestiged ${userFromDB.prestige} time${userFromDB.prestige > 1 ? 's' : ''}!\n` : ''}`);
	profileEmbed.addField(`COLLECTABLES`, `${client.emojis.cache.get(client.emoji.bluecoins)} ${userFromDB.blue_coins} Blue Coins collected!\n ${client.emojis.cache.get(client.emoji.starbits)} ${userFromDB.starbits} Starbits earned!\n${client.emojis.cache.get(client.emoji.itembox_ok)} ${client.items.ensure(person.id, []).length} items obtained!`)
	profileEmbed.addField(`OTHER INFO`, `🕐 Joined the server <t:${Math.floor(person.joinedTimestamp / 1000)}:R>!\n ${person.roles.cache.has('585533364489158666') ? `${client.emojis.cache.get(client.emoji.boost_star)} Valued server Boost Star!` : ''}`);


	return profileEmbed;
}

client.createProgEmbed = (person) => {
	 const dot = client.emojis.cache.get('891851922196287529');
    const prestige = client.emojis.cache.get('894461229383450624');

    const levelPoints = [ 0, 10, 150, 500, 1000, 2500, 5000, 7000, 9999, 13000, 17000, 22000, 27000 ];
    const motivationalQuotes = ["Everyone starts somewhere.", "You're making progress already!", "Keep on keeping on.", "That's roughly a third!", "You're doing a great job!", "*Living on a prayer!*", "It's all downhill from here.", "The end is nearly in sight!", "Don't give up now!!!", "You could rank up any time now! Exciting!"]

    const userFromDB = client.userDB.ensure(person.id, { points: 0, rank: person.roles.cache.has('391877990277185556') ? 1 : 0, prestige: 0});
    let runningEmote = client.emojis.cache.get('710519845124309394');
    let color = "#000000";

    // Gets emote of character if user has an applicable team role; uses Mario otherwise
    if (person.roles.cache.some((r) => r.name.includes('Team') && excessiveCharacterArray.includes(r.name.substr(r.name.indexOf(' ')+1)))) {
        let role = person.roles.cache.find((r) => r.name.includes('Team') && excessiveCharacterArray.includes(r.name.substr(r.name.indexOf(' ')+1)));

	if (person.roles.cache.some((r) => r.name.includes('Garfield')))
	    role = person.roles.cache.find((r) => r.name.includes('Garfield'));
	if (person.roles.cache.some((r) => r.name.includes('aerith')))
	    role = person.roles.cache.find((r) => r.name.includes('aerith'));

        runningEmote = client.emojis.cache.get(charEmotes.get(role.name.substr(role.name.indexOf(' ')+1)));
        color = role.color.toString(16);
    }
    else {
        runningEmote = client.emojis.cache.get('891878777376878637');
	//runningEmote = client.emojis.cache.get('887166752872624138');
	console.log(" woated");
    }

    // Determines how far to their next levelup the user has gotten, from 0-9, rounded down
    let roughProgress = Math.floor(((userFromDB.points - levelPoints[userFromDB.rank]) / (levelPoints[userFromDB.rank + 1] - levelPoints[userFromDB.rank])) * 10);
    console.log(roughProgress);

    // Creates "path" of walking emote, start and end destinations, and the rough position they are at
    let progressPath = `${client.emojis.cache.get(levelUpEmojis8Bit[userFromDB.rank])}`;
    if (roughProgress === 0)
	progressPath = `${runningEmote}`;
    for (let i = 1; i <= 9; i++) {
        if (i === roughProgress)
            progressPath += `${runningEmote}`;
        else
            progressPath += `${dot}`;
    }
    progressPath += `${client.emojis.cache.get(levelUpEmojis8Bit[userFromDB.rank + 1])}`;
    progressPath += '⠀';

    const owner = client.users.cache.get(client.config.ownerID);

    const rankEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setFooter(`Created and Maintained by ${owner.tag} | ${client.version}`, client.user.displayAvatarURL())
        .setTimestamp()
        .setTitle(`${client.developName(person)}'s Level Journey!`) //'
        .setThumbnail(person.user.displayAvatarURL({ dynamic: true }))
        .addField(`On the way to level ${userFromDB.rank + 1} | ${prestige} **x ${userFromDB.prestige}**`,`${progressPath}`);
        
    if(roughProgress === 5)
        rankEmbed.addField(`You're halfway there!`, motivationalQuotes[roughProgress]); //'
    else
        rankEmbed.addField(`You're ${roughProgress * 10}% of the way there!`, motivationalQuotes[roughProgress]); //'

        return rankEmbed;
};

	client.createItemsEmbed = (person, page) => {
		let color = "#000000";
		const check = client.emoji.checkMark;
		const ex = client.emoji.redX;

    // Gets emote of character if user has an applicable team role; uses Mario otherwise
    if (person.roles.cache.some((r) => r.name.includes('Team') && excessiveCharacterArray.includes(r.name.substr(r.name.indexOf(' ')+1)))) {
        let role = person.roles.cache.find((r) => r.name.includes('Team') && excessiveCharacterArray.includes(r.name.substr(r.name.indexOf(' ')+1)));

	if (person.roles.cache.some((r) => r.name.includes('Garfield')))
	    role = person.roles.cache.find((r) => r.name.includes('Garfield'));
	if (person.roles.cache.some((r) => r.name.includes('aerith')))
	    role = person.roles.cache.find((r) => r.name.includes('aerith'));
        color = role.color.toString(16);
    }
		const owner = client.users.cache.get(client.config.ownerID);
		
		const items = require('../commands/economy/items.json');
		const page_size = 12;
		const userCollection = client.items.ensure(person.id, []);
		console.log(userCollection);
		
		let cont = "";
		
		for (let i = (page - 1) * page_size; i < ((page - 1) * page_size) + page_size; i++) {
			cont += `${userCollection.includes(`${items[i].name} - ID: ${items[i].id}`) ? check : ex} \`${items[i].id.toString().padStart(3 , '0')}\` : ${items[i].name} \n`;
		}
		
		const itemsEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setFooter(`Created and Maintained by ${owner.tag} | ${client.version}`, client.user.displayAvatarURL())
        .setTimestamp()
        .setTitle(`${client.developName(person)}'s Items — Page ${page} / ${items.length / page_size}`) //'
        .setThumbnail(person.user.displayAvatarURL());
        
   	itemsEmbed.addField(userCollection.length >= 120 ? "You've collected all the items! Impressive!" : `There's still ${120 - userCollection.length} items for you to get!`, cont != '' ? cont: 'fuck');
   //'
   	console.log('anybody hear me?');
   	return itemsEmbed;
	};
	
	client.createEmotesEmbed = (person, page) => {
		let color = "#000000";

    // Gets emote of character if user has an applicable team role; uses Mario otherwise
    if (person.roles.cache.some((r) => r.name.includes('Team') && excessiveCharacterArray.includes(r.name.substr(r.name.indexOf(' ')+1)))) {
        let role = person.roles.cache.find((r) => r.name.includes('Team') && excessiveCharacterArray.includes(r.name.substr(r.name.indexOf(' ')+1)));

	if (person.roles.cache.some((r) => r.name.includes('Garfield')))
	    role = person.roles.cache.find((r) => r.name.includes('Garfield'));
	if (person.roles.cache.some((r) => r.name.includes('aerith')))
	    role = person.roles.cache.find((r) => r.name.includes('aerith'));

        runningEmote = client.emojis.cache.get(charEmotes.get(role.name.substr(role.name.indexOf(' ')+1)));
        color = role.color.toString(16);
    }
		const owner = client.users.cache.get(client.config.ownerID);
		const u_emotes = client.userEmotes.ensure(person.id, []).sort((a,b) => b.copies - a.copies).splice((page - 1) * 12, page * 12);
		
		const emotesEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setFooter(`Created and Maintained by ${owner.tag} | ${client.version}`, client.user.displayAvatarURL())
        .setTimestamp()
        .setTitle(`${client.developName(person)}'s Emotes — Page ${page} / ${Math.ceil(client.userEmotes.ensure(person.id, []).length / 12)}`) //'
        .setThumbnail(person.user.displayAvatarURL());
      
      let line1 = "";
      let line2 = "";
      for (let i = 0; i < u_emotes.length; i++) {
      	let emote = client.emotes.get(u_emotes[i].id);
      	if (i % 2 == 0)
      		line1 += `• **${emote.alt_name != [] ? emote.alt_name[0] : emote.name}**  ${client.emojis.cache.get(emote.id)} [Lv. ${u_emotes[i].copies}]\n`
      	else 
      		line2 += `• **${emote.alt_name != [] ? emote.alt_name[0] : emote.name}**  ${client.emojis.cache.get(emote.id)} [Lv. ${u_emotes[i].copies}]\n`
   	}
   	
   	if (u_emotes.length == 0) {
   		emotesEmbed.addField('\u200b', "You haven't collected any emotes yet. Use the `.pull` command and start collecting!");
   	}
   	else {
   		emotesEmbed.addField('\u200b', line1 + " ", true);
   		if (line2 != "")
   			emotesEmbed.addField('\u200b', line2 + " ", true);
   	}
   
   	return emotesEmbed;
	};
	
	//Returns the name of the supplied person with their title and attached emote, if they exist
  client.developName = (person) => {
  		try {
  		let title = client.userDB.has(person.id, "att_title") ? `${client.userDB.get(person.id).att_title} ` : '';
  		let emote = client.userDB.has(person.id, "att_emote") ? ` ${client.emojis.cache.get(client.userDB.get(person.id).att_emote)}` : '';
  		
  		return `${title}${person.displayName}${emote}`; }
  		catch(e) { return ('User left the server.'); }
  }

  client.getSettings = (guild) => {
    // Ensure the default settings exist
    client.settings.ensure('default', client.config.defaultSettings);

    // If no guild is provided, get the default settings
    if (!guild) {
      return client.settings.get('default');
    }

    // Get the settings for the provided guild
    // If a guild is not provided, an empty object is used
    const guildConf = client.settings.get(guild.id) || {};
    // Return the default settings joined by the guild settings
    return ({ ...client.settings.get('default'), ...guildConf });
  };
  
  client.stripEmote = (emote) => {
  		return emote.split(':')[2].slice(0,-1);
  }

  client.permLevel = (message) => {
    // Set the initial perm name and perm level to User and 0 respectively
    let permName = 'User';
    let permlvl = 0;
    // Find the order of the permLevels
    const permOrder = client.config.permLevels.slice(0)
      .sort((p, c) => (p.level < c.level ? 1 : -1));

    // While permOrder exists
    while (permOrder.length) {
      // Remove the first element from the permOrder array and return it
      const currentlvl = permOrder.shift();

      // If the user passes the check for that level, set the permName and permLevel to the level passed
      if (currentlvl.check(client, message)) {
        permName = currentlvl.name;
        permlvl = currentlvl.level;
        break;
      }
    }
    // Return an array of the perm name and perm level
    return [permName, permlvl];
  };

  client.clean = async (clientParam, text) => {
    // If the text provided is of type Promise, await it
    // This negates the 'Pending<Promise>' text returned when a promise is provided
    if (text && text.constructor.name === 'Promise') {
      text = await text;
    }
    // If the text is not a string, convert it to one
    if (typeof text !== 'string') {
      // eslint-disable-next-line global-require
      text = require('util').inspect(text, { depth: 1 });
    }

    // Replace elements in the text string that could interfere with Discord markdown, @ing unnecessarily, or protecting the token
    text = text
      .replace(/`/g, `\`${String.fromCharCode(8203)}`)
      .replace(/@/g, `@${String.fromCharCode(8203)}`)
      .replace(clientParam.token, 'mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0');

    // Return the text
    return text;
  };

  

  //Sends out the Question of the Day from THE LIST
  client.sendOutQuestion = async () => {
	var fs = require('fs');

	let questions = fs.readFileSync('/home/pi/BattleBot/commands/moderation/questions.txt').toString().split("\n");
	let spQuestions = fs.readFileSync('/home/pi/BattleBot/commands/moderation/questions_special.txt').toString().split("\n");
	const role = client.guilds.cache.get('355119082808541184').roles.cache.find((r) => r.name === 'Question of the Day');

	if (spQuestions.length > 2 || questions.length > 1) {
		let parts = (spQuestions.length > 2) ? spQuestions[2].split('-') : ['1999', '00', '01'];
		const today = new Date();
		const spDate = new Date(parts[0], parts[1] - 1, parts[2]); 

		if (spQuestions.length > 2 && today.getDate() == spDate.getDate()) {
			const channel = client.guilds.cache.get('355119082808541184').channels.cache.get(spQuestions[1]);
			fs.writeFileSync('/home/pi/BattleBot/commands/moderation/questions_special.txt', spQuestions.slice(3).join('\n'));
			fs.appendFileSync('/home/pi/BattleBot/commands/moderation/questions_archive.txt', `\n${spQuestions[0]}`);
			channel.send(`Hey <@&${role.id}>!\n${spQuestions[0]}`);
		}
		else {
			const channel = client.guilds.cache.get('355119082808541184').channels.cache.get(questions[1]);
			fs.writeFileSync('/home/pi/BattleBot/commands/moderation/questions.txt', questions.slice(2).join('\n'));
			fs.appendFileSync('/home/pi/BattleBot/commands/moderation/questions_archive.txt', `\n${questions[0]}`);
			channel.send(`Hey <@&${role.id}>!\n${questions[0]}`);
		}

		
	}

	//Post how many questions are left
	client.guilds.cache.get('355119082808541184').channels.cache.get('357328011889999873').send(`There is ${Math.floor(questions.length / 2) - 1} questions left in the queue. Tomorrow's question is:\n> ${(questions.length > 3) ? questions[2] : "None."}`);
  }; //'

  //Ends all current timeout/interval functions
  client.clearAllTimers = async () => {
	  for (var i = setTimeout(function() {}, 0); i > 0; i--) {
	  	clearInterval(i);
	   	clearTimeout(i);
	  }
  };

  client.startTwitterFeed = () => {
    const stream = client.twitter.stream('statuses/filter', { follow: client.config.followedTwitterUsers.join(',') })
      .on('start', () => {
        console.log('Started Twitter Feed Stream');
      })
      .on('data', (tweet) => {
        if (!tweet.user || tweet.in_reply_to_status_id !== null) {
          return;
        }

        if (client.config.affiliateUsers.includes(tweet.user.id_str)) {
          if (tweet.hasOwnProperty('retweeted_status')) {
		  client.twitterHookAffiliate.send({content: `http://twitter.com/${tweet.retweeted_status.user.screen_name}/status/${tweet.retweeted_status.id_str}`, username: tweet.user.name, avatarURL: `${tweet.user.profile_image_url_https}` })
	  } else {
		  client.twitterHookAffiliate.send({content: `http://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`, username: tweet.user.name, avatarURL: `${tweet.user.profile_image_url_https}` });}
        } else if (client.config.officialUsers.includes(tweet.user.id_str)) {
          client.twitterHookOfficial.send({content: `http://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`, username: tweet.user.name, avatarURL: `${tweet.user.profile_image_url_https}` });
        } else if (tweet.user.id_str == '306490355') {
	  client.twitterHookOfficial.send({content: `http://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`, username: tweet.user.name, avatarURL: `${tweet.user.profile_image_url_https}`, threadId: '888559682036305942' });
	}
      })
      .on('error', (error) => console.error(error))
      .on('end', () => {
        console.log('Ended Twitter Feed Stream');
        // Wait 10 seconds, then restart the twitter feed
        //setTimeout(() => {
        //  client.startTwitterFeed();
        //}, 10000);
	return stream;
      });
  };

/*  client.startTwitterFeed = (oldStream) => {
    try {
	process.nextTick(() => oldStream.destroy());
    }
    finally {
	    const stream = client.twitter.stream('statuses/filter', { follow: client.config.followedTwitterUsers.join(',') })
	      .on('start', () => {
		console.log('Started Twitter Feed Stream');
	      })
	      .on('data', (tweet) => {
		if (!tweet.user || tweet.in_reply_to_status_id !== null) {
		  return;
		}

		if (client.config.affiliateUsers.includes(tweet.user.id_str)) {
		  if (tweet.hasOwnProperty('retweeted_status') {
		  client.twitterHookAffiliate.send({content: `http://twitter.com/${tweet.user.screen_name}/status/${retweeted_status.id_str}`, username: tweet.user.name, avatarURL: `${tweet.user.profile_image_url_https}` })
		  } else {
		  client.twitterHookAffiliate.send({content: `http://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`, username: tweet.user.name, avatarURL: `${tweet.user.profile_image_url_https}` });}
		} else if (client.config.officialUsers.includes(tweet.user.id_str)) {
		  client.twitterHookOfficial.send({content: `http://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`, username: tweet.user.name, avatarURL: `${tweet.user.profile_image_url_https}` });
		}
	      })
	      .on('error', (error) => console.error(error))
	      .on('end', () => {
		console.log('Ended Twitter Feed Stream');
		// Wait 10 seconds, then restart the twitter feed
		//setTimeout(() => {
		//  client.startTwitterFeed();
		//}, 10000);
		return stream;
	      });
    }
  };*/

  // Extend the String prototype to provide String.toProperCase() to make formatting easier
  // Basically sets stuff like 'donkey kong' to 'Donkey Kong'
  Object.defineProperty(String.prototype, 'toProperCase', { // eslint-disable-line no-extend-native
    value() {
      return this.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    },
  });
};
