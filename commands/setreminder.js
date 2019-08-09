const reminder = require('../reminder.js');

module.exports = {
	name: 'setreminder',
	aliases: ['sr'],
	description: 'Sets reminder for once every minute.',
	args: false,
	guildOnly: true,
	cooldown: 5,
	execute(msg, args, logger) {
		reminder.addReminder('* * * * *', 'It\'s been a minute!', msg.channel);
		logger.info('Creating reminder.');
		msg.channel.send('Creating reminder.');
	},
};