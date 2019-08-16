const { Command } = require('discord.js-commando');

const { youtubeapi } = requireWrapper('config.json');
const { Logger, MusicController } = requireWrapper('utils.js');

const YouTube = require('discord-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube(youtubeapi);

module.exports = class SkipCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'skip',
			aliases: [],
			group: 'music',
			memberName: 'skip',
			description: 'Stops playback and ends playlist.',
			throttling: {
				usages: 2,
				duration: 5
			},
			guildOnly: true,
			clientPermissions: ['SPEAK', 'CONNECT'],
		});
	}

	async run(msg) {
		try {
			const voiceChannel = msg.member.voiceChannel;
			if (!voiceChannel) {
				return msg.say('Join a voice channel to skip.');
			}
			const song = MusicController.getSong(0);
			if (!song || typeof MusicController.dispatcher === undefined) {
				return msg.say('Nothing is currently playing tho!');
			}

			if (song.voiceChannel.id === voiceChannel.id) {
				msg.say('Skipping track.');
				MusicController.dispatcher.end();
			} else {
				msg.say(`I'm currently playing in ${voiceChannel.name}.  Please join me there before sicounting my music taste.`);
			}
		} catch (error) {
			Logger.error(`${error}`);
		}
	}
}