const { Command } = require('discord.js-commando');
const logger = require('../../logger.js');
const reminder = require('../../reminder.js');

module.exports = class SetReminderCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'setreminder',
			aliases: [],
			group: 'general',
			memberName: 'setreminder',
			description: 'Sets reminder for once every minute.',
		    throttling: {
		        usages: 2,
		        duration: 10
		    },
			guildOnly: true,
		});
	}

	async run(msg) {
		reminder.addReminder('* * * * *', 'It\'s been a minute!', msg.channel);
		logger.info('Creating reminder.');
		msg.say('Creating reminder.');
	}
};