const {
  SlashCommandBuilder,
  EmbedBuilder,
  GatewayIntentBits,
  Message,
  Guild,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Provides information about the user.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("user you want to view")
        .setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const badges = []
    if (user.flags.has("ActiveDeveloper")) badges.push("\nActive Developer");
    if (user.flags.has("BotHTTPInteractions")) badges.push("\nHTTP interactions");
    if (user.flags.has("BugHunterLevel1")) badges.push("\nBug Hunter Level 1");
    if (user.flags.has("BugHunterLevel2")) badges.push("\nBug Hunter Level 2");
    if (user.flags.has("CertifiedModerator")) badges.push("\nModerator Programs Alumni");
    if (user.flags.has("HypeSquadOnlineHouse1")) badges.push("\nHypeSquad Bravery");
    if (user.flags.has("HypeSquadOnlineHouse2")) badges.push("\nHypeSquad Brilliance");
    if (user.flags.has("HypeSquadOnlineHouse3")) badges.push("\nHypeSquad Balance");
    if (user.flags.has("Hypesquad")) badges.push("\nHypeSquad Events Member");
    if (user.flags.has("Partner")) badges.push("\nPartner");
    if (user.flags.has("PremiumEarlySupporter")) badges.push("\nEarly Nitro Supporter");
    if (user.flags.has("Quarantined")) badges.push("\nQuarantined");
    if (user.flags.has("Spammer")) badges.push("\nSpammer");
    if (user.flags.has("Staff")) badges.push("\nDiscord Employee");
    if (user.flags.has("TeamPseudoUser")) badges.push("\nTeam User");
    if (user.flags.has("VerifiedBot")) badges.push("\nVerified Bot");
    if (user.flags.has("VerifiedDeveloper")) badges.push("\nVerified Bot Developer");
    if (badges.length === 0) {
      badges.push("NONE");
    }
    const isBot = user.bot;

    const userinfoEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setThumbnail(`${user.displayAvatarURL({ format: "jpg", size: 4096 })}`)
      .setAuthor({
        name: `UserInfo`,
        iconURL: `https://raw.githubusercontent.com/Cresfy/Muffin/master/assets/muff.png`,
        url: "https://github.com/Cresfy/Muffin",
      })
      .addFields(
        {
          name: "User :name_badge:",
          value: `${user}`,
        },
        {
          name: "Badges :shield:",
          value: `${badges}`,
        },
        {
          name: "Bot :robot:",
          value: `${isBot}`,
        },
        {
          name: "Joined :date:",
          value: `${interaction.guild.joinedAt}`,
        },
        {
          name: "Created :date:",
          value: `${user.createdAt}`,
        }
      )
    interaction.reply({
      embeds: [userinfoEmbed],
      ephemeral: false,
    });
  },
};
