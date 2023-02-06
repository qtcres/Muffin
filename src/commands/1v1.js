const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("1v1")
    .setDescription("queues 1v1 matchmaking"),
  async execute(interaction) {},
};
