// eslint-disable-next-line no-unused-vars
module.exports.run = (client, message, args, level) => {
  return message.channel.send(`<@${message.author.id}> currently has ${Math.round((Math.random() * 50000))} ${client.emoji.apple} Applez Points`);
};

module.exports.conf = {
  guildOnly: true,
  aliases: [],
  permLevel: 'User',
  args: 0,
};

module.exports.help = {
  name: 'applezpoints',
  category: 'misc',
  minidesc: '?',
  description: '???',
  usage: '.applezpoints',
};