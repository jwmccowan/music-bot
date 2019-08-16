const { Command } = require('discord.js-commando');
const { Logger, Reminder } = requireWrapper('utils.js');

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
		Reminder.addReminder('* * * * *', 'It\'s been a minute!', msg.channel);
		Logger.info('Creating reminder.');
		msg.say('Creating reminder.');
	}
};