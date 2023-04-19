const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("settings")
    .setDescription("Bot server settings")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    ,
  async execute(interaction) {},
};
