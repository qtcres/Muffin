const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("level")
    .setDescription("Shows your level")
    .addStringOption((option) =>
      option.setName("user").setDescription("users level").setRequired(false)
    ),
  async execute(interaction) {},
};
