const reminder = require('../reminder.js');

module.exports = {
	name: 'reminderlist',
	aliases: [],
	description: 'Lists all currently running reminders.',
	args: false,
	guildOnly: true,
	cooldown: 5,
	execute(msg, args, logger) {
		logger.info('Displaying reminder list:\n' + JSON.stringify(reminder.reminderList));
	},
};