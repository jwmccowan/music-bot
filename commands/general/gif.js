const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const { Logger } = requireWrapper('utils.js');
const { tenorapikey } = requireWrapper('config.json');
const fetch = require('node-fetch');
const queryString = require ('query-string');

module.exports = class GifCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'gif',
			aliases: [],
			group: 'general',
			memberName: 'gif',
			description: 'Sends a gif related to the query.',
		    throttling: {
		        usages: 2,
		        duration: 10
		    },
			guildOnly: true,
			args: [
				{
					key: 'query',
					prompt: 'What would you like to gif?',
					type: 'string',
					validate: query => query.length > 0 && query.length < 240
				}
			],
		});
	}

	async run(msg, { query }) {
		const queryObject = {};
		queryObject.q = query;
		queryObject.key = tenorapikey;
		queryObject.limit = 1;

		const url = 'https://api.tenor.com/v1/search?' + queryString.stringify(queryObject);
		const response  = await fetch(url).then(response => response.json());
		const gif = response.results[0].media[0].tinygif.url;

		const richEmbed = new RichEmbed()
			.setAuthor('Biff\'s Gifs', 'https://media.giphy.com/media/mhh4VA7LKYL9S/giphy.gif')
			.setColor(0x00AE86)
			.setImage(gif)
			.setTimestamp();
		Logger.info(`Sending: ${gif}`);
		msg.embed(richEmbed);
	}
};