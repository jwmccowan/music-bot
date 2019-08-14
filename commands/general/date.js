const { Command } = require('discord.js-commando');
const logger = require('../../logger.js');

module.exports = class DateCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'date',
			aliases: ['time'],
			group: 'general',
			memberName: 'date',
			description: 'Says the date on the server!',
		    throttling: {
		        usages: 2,
		        duration: 5
		    },
			guildOnly: true,
		});
	}

	async run(msg) {
		const now = new Date();
		msg.reply(`It is currently ${now} in New York.`);
	}
};