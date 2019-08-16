const { Command } = require('discord.js-commando');
const { Logger, Reminder } = requireWrapper('utils.js');

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
		Logger.info('Displaying reminder list:\n' + JSON.stringify(Reminder.reminderList));
	}
};