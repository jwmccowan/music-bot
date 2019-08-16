const { Command } = require('discord.js-commando');

const { youtubeapi } = requireWrapper('config.json');
const { Logger, MusicController } = requireWrapper('utils.js');

const YouTube = require('discord-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube(youtubeapi);

module.exports = class ResumeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'resume',
			aliases: [],
			group: 'music',
			memberName: 'resume',
			description: 'Resumes currently playing song.',
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
				return msg.say('Join a voice channel to resume.');
			}
			const song = MusicController.getSong(0);
			if (!song || typeof MusicController.dispatcher === undefined) {
				return msg.say('Nothing is currently playing tho!');
			}
			if (song.voiceChannel.id === voiceChannel.id) {
				MusicController.dispatcher.resume();
			} else {
				msg.say(`I'm currently playing in ${voiceChannel.name}.  Please join me there before attempting to resume playback.`);
			}
		} catch (error) {
			Logger.error(`${error}`);
		}
	}
}