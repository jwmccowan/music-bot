const { Command } = require('discord.js-commando');

const { youtubeapi } = requireWrapper('config.json');
const { Logger, MusicController } = requireWrapper('utils.js');

const YouTube = require('discord-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube(youtubeapi);

function matchYoutubeUrl(queryString) {
	return queryString.match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/)
}

function playSong(msg) {
	const streamOptions = { seek: 0, volume: 1 };
	const song = MusicController.getSong(0);
	song.voiceChannel.join()
	  .then(connection => {
	    const stream = ytdl(song.url, { filter : 'audioonly' });
	    const dispatcher = connection.playStream(stream, streamOptions)
	    	.on('start', () => {
	    		MusicController.isPlaying = true;
	    		MusicController.dispatcher = dispatcher;
				return msg.say(`:musical_note: Now playing: ${song.title} :musical_note:`);
			})
			.on('end', () => {
				// here we do playlist shifting
				MusicController.shiftQueue();
				Logger.info('Song ended');
				if (MusicController.queueSize() === 0) {
					MusicController.isPlaying = false;
					song.voiceChannel.leave();
				} else {
					return playSong(msg);
				}
			})
			.on('error', error => {
				Logger.error(`Error playing stream: ${error}`);
				msg.say('Cannot play this song, sorry..');
			});
	  })
	  .catch(Logger.error);
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
					key: 'query',
					prompt: 'What song would you like to play?',
					type: 'string',
					validate: query => query.length > 0 && query.length < 240
				}
			],
		});
	}

	async run(msg, { query }) {
		try {
			const voiceChannel = msg.member.voiceChannel;
			if (!voiceChannel) {
				return msg.say('Please join a voice channel and try again.');
			}

			let video;

			if (matchYoutubeUrl(query)) {
				query = query
					.replace(/(>|<)/gi, '')
					.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
				const id = query[2].split(/[^0-9a-z_\-]/i)[0];

				try {
					video = await youtube.getVideo(query);
				} catch (error) {
					return msg.say('Could not find song');
				}
			}
			// https://www.youtube.com/watch?v=5NPBIwQyPWE
			

			const song = {
				url: video.url,
				title: video.title,
				voiceChannel: voiceChannel,
			}

			MusicController.addSong(song);

			if (MusicController.isPlaying === false) {
				return playSong(msg);
			} else {
				return msg.say(`${song.title} added to queue.`);
			}

			if (matchYoutubeUrl(song)) {
			}
		} catch(error) {
			Logger.error(`${error}`);
			return msg.say('Something went wrong, please try again later.');
		}
	}
};