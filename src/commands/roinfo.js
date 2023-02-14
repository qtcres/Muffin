const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roinfo")
    .setDescription("roblox user info")
    .addStringOption((option) =>
      option.setName("username").setDescription("username").setRequired(true)
    ),
  async execute(interaction) {
    const usernameoption = interaction.options.getString("username");
    const results = await fetch(
      `https://api.roblox.com/users/get-by-username?username=${usernameoption}`
    ).then((response) => response.json());
    const username = results.Username;
    const userid = results.Id;
    const userinfo = await fetch(
      `https://users.roblox.com/v1/users/${userid}`
    ).then((response) => response.json());
    let about = {};
    if (userinfo.description) {
      about = userinfo.description;
    } else {
      about = " ";
    }
    const displayname = userinfo.displayName;
    const isonline = results.IsOnline;
    const isbanned = userinfo.isBanned;
    const created = userinfo.created;
    console.log(about);
    const userheadshot = await fetch(
      `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userid}&size=352x352&format=Png&isCircular=false`
    ).then((response) => response.json());
    const userUrl = `https://www.roblox.com/users/${userid}/profile`;
    let rap = 0;
    const roproxy = await fetch(
      `https://inventory.roproxy.com/v1/users/${userid}/assets/collectibles?sortOrder=Asc&limit=100`
    ).then((response) => response.json());
    Object.keys(roproxy.data).forEach(function (group) {
      console.log(roproxy.data[1]);
    });
    const roinfoEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(`${username}`)
      .setURL(`${userUrl}`)
      .setAuthor({
        name: `RoInfo`,
        iconURL: `https://raw.githubusercontent.com/Cresfy/Muffin/master/assets/muff.png`,
        url: "https://github.com/Cresfy/Muffin",
      })
      .setDescription(`${about}`)
      .setThumbnail(
        `${JSON.parse(JSON.stringify(userheadshot)).data[0].imageUrl}`
      )
      .addFields(
        {
          name: "Display Name :name_badge:",
          value: `${displayname}`,
        },
        {
          name: "Online :green_circle:",
          value: `${isonline}`,
        },
        {
          name: "Banned :x:",
          value: `${isbanned}`,
        },
        {
          name: "Rap :chart_with_upwards_trend:",
          value: `temp`,
        },
        {
          name: "Created :date:",
          value: `${created}`,
        }
      );

    interaction.reply({
      embeds: [roinfoEmbed],
      ephemeral: true,
    });
  },
};
