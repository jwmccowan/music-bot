const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const fs = require('fs');

const { prefix, token } = require('./config.json');
const logger = require('./logger.js');

//	Create a collection of command objects from the command files in ./commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

//	Notify once logged in
client.once('ready', () => {
	logger.info(`Bot logged in as ${client.user.tag}`);
});

//	Read command and run appropriate execute, or log error appropriately
client.on('message', msg => {
	if (!msg.content.startsWith(prefix) || msg.author.bot) {
		return;
	}

	const args = msg.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	logger.info(`Received command: ${commandName}`);

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) {
		return;
	}

	if (command.guildOnly && msg.channel.type !== 'text') {
		return msg.reply('I can\'t execute that command in a DM!');
	}

	if (command.args && !args.length) {
		let reply = 'You didn\t send any arguments.';
		if (command.usage) {
			reply += `\nThe correct usage is \`${prefix}${command.name} ${command.usage}\``;
		}
		return msg.reply(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(msg.author.id)) {
		const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return msg.reply(`Please wait ${timeLeft} seconds until using the \`${commandName}\` command.`);
		}
	}
	timestamps.set(msg.author.id, now);
	setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

	try {
		command.execute(msg, args, logger);
	}
	catch (err) {
		logger.error(`There was an error trying to execute ${commandName}\n`,err);
		msg.reply(`There was an error trying to execute ${commandName}`);
	}
});

client.login(token);