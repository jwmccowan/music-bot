const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	aliases: ['commands'],
	description: 'List all of my commands or info about a sincle command.',
	args: false,
	usage: '<command name>',
	guildOnly: false,
	cooldown: 5,
	execute(msg, args, logger) {
		const data = [];
		const { commands } = msg.client;

		if (!args.length) {
			data.push('Here\'s a list of all my commands:');
			data.push(commands.map(command => command.name).join(', '));
			data.push(`You can send '${prefix}help <command name>' to get info on a specific command.`);

			return msg.author.send(data, { split: true })
				.then(() => {
					if (msg.channel.type === 'dm') {
						return;
					}
					msg.reply('I\'ve sent you a DM with all of my commands.');
				}).catch(error => {
					logger.error(`Could not send help DM to ${msg.author.tag}.\n`, error);
					msg.reply('It seems I can\'t DM you, do you have DMs disabled?');
				});
		}

		const commandName = args[0].toLowerCase();
		const command = commands.get(commandName) || commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			return msg.reply('That\'s not a valid command.');
		}

		data.push(`**Name:** ${command.name}`);
		if (command.aliases) {
			data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		}
		if (command.description) {
			data.push(`**Description:** ${command.description}`);
		}
		if (command.usage) {
			data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
		}
		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

		msg.channel.send(data, { split: true });
	},
};