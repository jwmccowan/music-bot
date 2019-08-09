module.exports = {
	name: 'date',
	aliases: ['time'],
	description: 'Says what time it is in Australia!',
	args: false,
	usage: '',
	guildOnly: true,
	cooldown: 5,
	execute(msg, args, logger) {
		const now = new Date();
		msg.reply(`It is currently ${now} in Sydney.`);
	},
};