module.exports = {
	name: 'punch',
	aliases: [],
	description: 'Punches whoever you tag.',
	args: true,
	usage: '<user>',
	guildOnly: true,
	cooldown: 5,
	execute(msg, args, logger) {
		if (!msg.mentions.users.size) {
			return msg.channel.send('You have to mention a user to punch them!');
		}
		msg.channel.send(`You want to punch ${msg.mentions.users.first()}`);
	},
};