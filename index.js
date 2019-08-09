const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const logger = require('./logger.js');

client.once('ready', () => {
	logger.info(`Bot logged in as ${client.user.tag}`);
});

client.on('message', msg => {
	if (!msg.guild) return;

    logger.info(`Message Received: ${msg}`);

	if (msg.content === 'Music') {
        logger.info('Sending message "Bot" back.')
		msg.channel.send('Bot');
	}
});




client.login(config.token);