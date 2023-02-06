const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roinfo")
    .setDescription("roblox user info"),
  async execute(interaction) {},
};
