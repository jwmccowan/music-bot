const { Command } = require('discord.js-commando');
const logger = require('../../logger.js');
const fetch = require('node-fetch');

const { youtubeapi } = require('../../config.json');
const YouTube = require('discord-youtube-api');
const youtube = new YouTube(youtubeapi);
const ytdl = require('ytdl-core');

const { inspect } = require('util');

function matchYoutubeUrl(queryString) {
	return queryString.match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/)
}

module.exports = class PlayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'play',
			aliases: ['p', 'add'],
			group: 'music',
			memberName: 'play',
			description: 'Plays a youtube link given, or searches for the song.',
			throttling: {
				usages: 2,
				duration: 5
			},
			guildOnly: true,
			clientPermissions: ['SPEAK', 'CONNECT'],
			args: [
				{
					key: 'song',
					prompt: 'What song would you like to play?',
					type: 'string',
					validate: song => song.length > 0 && song.length < 240
				}
			],
		});
	}

	async run(msg, { song }) {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) {
			return msg.say('Please join a voice channel and try again.');
		}
		const video = await youtube.getVideo("https://www.youtube.com/watch?v=5NPBIwQyPWE");
		msg.say(`Alright, we'll play ${song}!`);

		const streamOptions = { seek: 0, volume: 1 };
		voiceChannel.join()
		  .then(connection => {
		    const stream = ytdl(video.url, { filter : 'audioonly' });
		    const dispatcher = connection.playStream(stream, streamOptions)
		    	.on('start', () => {
					return msg.say(`:musical_note: Now playing: ${video.title} :musical_note:`);
				})
				.on('finish', () => {
					return voiceChannel.leave();
				})
				.on('error', error => {
					logger.error(`Error playing stream: ${error}`);
					msg.say('Cannot play this song, sorry..');
				});
		  })
		  .catch(console.error);

		/*voiceChannel.join()
			.then(connection => {
				logger.info('Joined voice channel.');
				const streamOptions = { volume: 1, quality: 'highestaudio', highWaterMark: 1024 * 1024 * 10, filter: 'audioonly' }
				const dispatcher = connection;
				const stream = ytdl(video.url, streamOptions);
				dispatcher.playStream(stream)
					.on('start', () => {
						return message.say(
							`:musical_note: Now playing: ${video.title} :musical_note:`
						);
					})
					.on('finish', () => {
						return voiceChannel.leave();
					})
					.on('error', error => {
						logger.error(`Error playing stream: ${error}`);
						msg.say('Cannot play this song, sorry..');
					});

			})
			.catch(error => logger.error(`Error playing stream: ${error}`));
		logger.info(`Playing: ${inspect(video)}`);*/

		if (matchYoutubeUrl(song)) {
		}
	}
};