const { Command } = require('discord.js-commando');
const logger = require('../../logger.js');
const fetch = require('node-fetch');

module.exports = class KittyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'kitty',
			aliases: ['cat'],
			group: 'general',
			memberName: 'kitty',
			description: 'Sends you a random cat.',
		    throttling: {
		        usages: 2,
		        duration: 10
		    },
			guildOnly: true,
		});
	}

	async run(msg) {
		const  body  = await fetch('https://aws.random.cat/meow').then(response => response.json());
		logger.info(`Sending: ${JSON.stringify(body)}`);
		msg.say(body.file);
	}
};