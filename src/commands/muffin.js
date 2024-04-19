const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("muffin")
    .setDescription("Mufiin Info"),
  async execute(interaction) {
    const muffinEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Muffin")
      .setURL("https://github.com/qtcres/Muffin")
      .setAuthor({
        name: "github.com/qtcres",
        iconURL: "https://avatars.githubusercontent.com/u/101119130?v=4",
        url: "https://github.com/qtcres/Muffin",
      })
      .setDescription("Fully open source discord bot made with JavaScript!")
      .setThumbnail(
        "https://raw.githubusercontent.com/qtcres/Muffin/master/assets/0d1f9df50edf673f46132da4f60af6e2.png"
      )
      .addFields(
        {
          name: "Features",
          value:
            "Moderation, Music, Polls, Fully customizable level system, 1v1 with mmr system and leaderboards.",
        },
        { name: "\u200B", value: "\u200B" },
        {
          name: "Command List:",
          value:
            "/muffin\n/settings\n/latency\n/clear [amount]\n/play [SongName]\n/user\n/server\n/poll\n/level\n/roinfo\n/1v1\n/mmr\n/leaderboard",
          inline: true,
        }
      );

    interaction.reply({
      embeds: [muffinEmbed],
      ephemeral: true,
    });
  },
};
