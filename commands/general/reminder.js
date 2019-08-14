const { Command } = require('discord.js-commando');
const logger = require('../../logger.js');
const reminder = require('../../reminder.js');

module.exports = class ReminderCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'reminder',
			aliases: ['remind'],
			group: 'general',
			memberName: 'reminder',
			description: 'Lists all currently running reminders.',
		    throttling: {
		        usages: 2,
		        duration: 10
		    },
			guildOnly: true,
		});
	}

	async run(msg) {
		logger.info('Displaying reminder list:\n' + JSON.stringify(reminder.reminderList));
	}
};