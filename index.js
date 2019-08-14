const { CommandoClient } = require('discord.js-commando');
const path = require('path');

const logger = require('./logger.js');

const { prefix, token, owner } = require('./config.json');

const client = new CommandoClient({
	commandPrefix: prefix,
	owner: owner,
	// invite: 'https://discord.gg/bRCvFy9',
});

client.registry
	.registerDefaultTypes()
	.registerGroups([
		['general', 'General commands'],
		['music', 'Music related commands'],
	])
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
	logger.info(`Logged in as ${client.user.tag}! (${client.user.id})`);
	client.user.setActivity('Listening....');
});

client.on('error', error => logger.error(error));

client.login(token);