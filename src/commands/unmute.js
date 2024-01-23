const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("if user is muted it will unmute them"),
  async execute(interaction) {},
};
