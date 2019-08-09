module.exports = {
	name: 'prune',
	aliases: [],
	description: 'Deletes the given amount of messages in the channel.',
	args: true,
	usage: '<num>',
	guildOnly: true,
	cooldown: 5,
	execute(msg, args, logger) {
		const number = parseInt(args[0]) + 1;

		if (isNaN(number)) {
			return msg.reply('You must give a valid number as a parameter');
		}
		else if (number <= 1 || number >= 100) {
			return msg.reply('The number must be between 1 and 99');
		}

		msg.channel.bulkDelete(number, true).catch(err => {
			logger.error('There was an error trying to prune messages in this channel.\n' + err);
			msg.reply('There was an error trying to prune messages in this channel.');
		});
	},
};