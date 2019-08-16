const queue = [];
let isPlaying = false;
let repeat = false;
let shuffle = false;
let dispatcher;

module.exports = {
	isPlaying: isPlaying,
	dispatcher: dispatcher,
	addSong: song => queue.push(song),
	getSong: index => queue[index],
	clearQueue: () => queue.length = 0,
	shiftQueue: index => {
		if (index === undefined) {
			return queue.shift();
		}
	},
	queueSize: () => queue.length,
};