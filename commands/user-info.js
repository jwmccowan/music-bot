module.exports = {
	name: 'user-info',
	aliases: [],
	description: 'Displays username and id of tagged user.',
	args: false,
	guildOnly: true,
	cooldown: 5,
	execute(msg, args, logger) {
		const user = msg.mentions.users.size ? msg.mentions.users.first() : msg.author;
		msg.channel.send(`Your username: ${user.username}\nYour ID: ${user.id}`);
	},
};