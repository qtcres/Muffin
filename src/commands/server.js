const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Provides information about the server."),
  async execute(interaction) {
    const Guild = interaction.guild
    const Owner = await interaction.guild.fetchOwner()
    const serverinfoEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setThumbnail(`${Guild.iconURL({ format: "jpg", size: 4096 })}`)
      .setAuthor({
        name: `ServerInfo`,
        iconURL: `https://raw.githubusercontent.com/qtcres/Muffin/master/assets/0d1f9df50edf673f46132da4f60af6e2.png`,
        url: "https://github.com/qtcres/Muffin",
      })
      .addFields(
        {
          name: "Name :name_badge:",
          value: `${Guild.name}`,
        },
        {
          name: "Description :information_source:",
          value: `${Guild.description}`,
        },
        {
          name: "ID :receipt:",
          value: `${Guild.id}`,
        },
        {
          name: "Boosts :gem:",
          value: `${Guild.premiumSubscriptionCount}`,
        },
        {
          name: "Members :bust_in_silhouette:",
          value: `${Guild.memberCount}`,
        },
        {
          name: "Max Members :busts_in_silhouette:",
          value: `${Guild.maximumMembers}`,
        },
        {
          name: "Owner :detective:",
          value: `${Owner}`, // `${Owner.user.username}#${Owner.user.discriminator}`
        },
        {
          name: "Created :date:",
          value: `${Guild.createdAt}`,
        },
      )
    interaction.reply({
      embeds: [serverinfoEmbed],
      ephemeral: true
    })
  },
};
