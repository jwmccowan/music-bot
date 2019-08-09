const schedule = require('node-schedule');

const reminderList = [];

// load reminders from db


module.exports = {
	reminderList: reminderList,
	addReminder: function(cronExpression, message, channel) {
		reminderList.push({ cronExpression: cronExpression, message: message, channel: channel });
		schedule.scheduleJob(cronExpression, () => {
			this.sendReminder(channel, message);
		});
	},

	sendReminder: function(channel, message) {
		channel.send(message);
	},
};