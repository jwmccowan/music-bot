const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const winston = require('winston');

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json()
});

client.once('ready', () => {
	.log(`Bot logged in as ${client.user.tag}`);
});

client.on('message', msg => {
	if (!msg.guild) return;

	if (msg.content === 'Music') {
		msg.channel.send('Bot');
	}
});

client.login(config.token);

/*
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'music':
                bot.sendMessage({
                    to: channelID,
                    message: 'Bot!'
                });
            break;
            // Just add any case commands if you want to..
         }
     }
});
*/