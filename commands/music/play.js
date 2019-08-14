const { Command } = require('discord.js-commando');
const fetch = require('node-fetch');

const { youtubeapi } = require('../../config.json');
const logger = require('../../logger.js');

const YouTube = require('discord-youtube-api');
const ytdl = require('ytdl-core');

const youtube = new YouTube(youtubeapi);

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
		  .catch(logger.error);

		if (matchYoutubeUrl(song)) {
		}
	}
};