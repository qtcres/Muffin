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
    let results = await fetch(
      `https://users.roproxy.com/v1/usernames/users`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'usernames': [usernameoption] })
      }
    ).then((response) => response.json());
    results = results.data[0]
    const username = results.name;
    const userid = results.id;
    const userinfo = await fetch(
      `https://users.roproxy.com/v1/users/${userid}`, 
    ).then((response) => response.json());
    const friends = await fetch(
      `https://friends.roproxy.com/v1/users/${userid}/friends/count`,
    ).then((response) => response.json());
    console.log(friends.count)
    let about = {};
    if (userinfo.description) {
      about = userinfo.description;
    } else {
      about = " ";
    }
    const displayname = userinfo.displayName;
    const isbanned = userinfo.isBanned;
    const created = userinfo.created;
    const userheadshot = await fetch(
      `https://thumbnails.roproxy.com/v1/users/avatar-headshot?userIds=${userid}&size=352x352&format=Png&isCircular=false`
    ).then((response) => response.json());
    const userUrl = `https://www.roblox.com/users/${userid}/profile`;
    let rap = 0;
    const roproxy = await fetch(
      `https://inventory.roproxy.com/v1/users/${userid}/assets/collectibles?sortOrder=Asc&limit=100`
    ).then((response) => response.json());
    const roinfoEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(`${username}`)
      .setURL(`${userUrl}`)
      .setAuthor({
        name: `RoInfo`,
        iconURL: `https://raw.githubusercontent.com/qtcres/Muffin/master/assets/0d1f9df50edf673f46132da4f60af6e2.png`,
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
          name: "Banned :x:",
          value: `${isbanned}`,
        },
        {
          name: "Friends :people_hugging:",
          value: `${friends.count}`,
        },
        {
          name: "Created :date:",
          value: `${created}`,
        }
      );

    interaction.reply({
      embeds: [roinfoEmbed],
      ephemeral: false,
    });
  },
};
