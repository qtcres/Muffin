const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('latency')
		.setDescription('Replies with latency'),
	async execute(interaction) {
		interaction.reply({
            content: `${interaction.createdTimestamp - Date.now()}ms`,
            ephemeral: true
        });
	},
};