const { Command } = require('discord.js-commando');

const { youtubeapi } = requireWrapper('config.json');
const { Logger, MusicController } = requireWrapper('utils.js');

const YouTube = require('discord-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube(youtubeapi);

module.exports = class PauseCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'pause',
			aliases: [],
			group: 'music',
			memberName: 'pause',
			description: 'Pauses currently playing song.',
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
				return msg.say('Join a voice channel to pause.');
			}
			const song = MusicController.getSong(0);
			if (!song || typeof MusicController.dispatcher === undefined) {
				return msg.say('Nothing is currently playing tho!');
			}
			if (song.voiceChannel.channelId === voiceChannel.channelId) {
				MusicController.dispatcher.pause();
			} else {
				msg.say(`I'm currently playing in ${voiceChannel.name}.  Please join me there before attempting to stifle my creativity.`);
			}
		} catch (error) {
			Logger.error(`${error}`);
		}
	}
}