const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mmr")
    .setDescription("shows 1v1 mmr")
    .addStringOption((option) =>
      option.setName("user").setDescription("users mmr").setRequired(false)
    ),
  async execute(interaction) {},
};
