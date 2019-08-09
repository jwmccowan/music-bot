const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const winston = require('winston');

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json()
});

client.once('ready', () => {
	.log(`Bot logged in as ${client.user.tag}`);
});

client.on('message', msg => {
	if (!msg.guild) return;

	if (msg.content === 'Music') {
		msg.channel.send('Bot');
	}
});

client.login(config.token);