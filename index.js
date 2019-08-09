const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const logger = require('./logger.js');

client.once('ready', () => {
	logger.info(`Bot logged in as ${client.user.tag}`);
});

client.on('message', msg => {
	if (!msg.guild) return;

    var prefix = config.prefix;
    if (msg.content.substring(0, prefix.length) !== prefix) return;

    logger.info(`Message Received: ${msg}`);
    var content = msg.content.substring(prefix.length);
    switch(content)
    {
        case 'Music':
            logger.info('Sending message: "Bot"');
            msg.channel.send('Bot');
            break;
        case 'Reminder':
            logger.info('Sending message: "Bot"');
            msg.channel.send('Bot');
            break;
        default:
            logger.info('Unrecognized Command');
            msg.channel.send('Unrecognized Command ya dummy');
    }
});




client.login(config.token);