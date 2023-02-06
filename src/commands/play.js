const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('plays song')
		.addStringOption(option =>
			option
			  .setName("song")
			  .setDescription("song name")
			  .setRequired(true)
		  ),
	async execute(interaction) {
	},
};