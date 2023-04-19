const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clears x amount of messages")
    .addStringOption((option) =>
      option
        .setName("amount")
        .setDescription("Amount of messages")
        .setRequired(true)
    ),
  async execute(interaction) {
    let amountstring = interaction.options.getString("amount");
    let amount = parseInt(amountstring);
    let amountdecimal = Math.abs(Math.floor(amount / 99) - amount / 99);
    if (amount > 1000) {
      interaction.reply("amount must be <= 1000");
    } else if (amount > 99) {
      let amountmultiplier = Math.floor(amount / 99);
      for (var i = 0; i < amountmultiplier; i++) {
        (function (i) {
          setTimeout(function () {
            interaction.channel.bulkDelete(99, true);
          }, 2000 * i);
        })(i);
      }
      if (amountdecimal > 0) {
        let amountfix = Math.floor(amountdecimal * 99);
        interaction.channel.bulkDelete(amountfix, true);
      }
      interaction.reply(`deleted ${amount} messages`);
    } else {
      interaction.channel.bulkDelete(parseInt(amount), true);
      interaction.reply(`deleted ${amount} messages`);
    }
  },
};
