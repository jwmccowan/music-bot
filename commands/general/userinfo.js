const { Command } = require('discord.js-commando');
const { Logger } = requireWrapper('utils.js');

module.exports = class UserInfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'user-info',
			aliases: [],
			group: 'general',
			memberName: 'user-info',
			description: 'Displays username and user id of given user.',
		    throttling: {
		        usages: 2,
		        duration: 10
		    },
			guildOnly: true,
			args: [
				{
					key: 'user',
					prompt: 'What user would you like info about?',
					type: 'string',
					validate: user => user.length > 0 && user.length < 50 && user[0] === "@"
				}
			],
		});
	}

	async run(msg) {
		const tag = msg.mentions.users.size ? msg.mentions.users.first() : msg.author;
		msg.say(`Your username: ${tag.username}\nYour ID: ${tag.id}`);
	}
};