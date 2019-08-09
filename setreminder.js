const reminder = require('../reminder.js');

module.exports = {
	name: 'setreminder',
	description: 'Sets reminder for once every minute.',
	execute(msg, args, logger) {
		reminder.addReminder('* * * * *', 'It\'s been a minute!', msg.channel);
		logger.info('Creating reminder.');
		msg.channel.send('Creating reminder.');
	},
};