const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('1v1 mmr leaderboard'),
	async execute(interaction) {
	},
};