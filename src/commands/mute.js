const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("mutes user until unmuted"),
  async execute(interaction) {},
};
