const {
  Client,
  Collection,
  GatewayIntentBits,
  Message,
  REST,
  Routes,
  SlashCommandBuilder,
  VoiceChannel,
  Events,
  Attachment,
  IntentsBitField,
  ActivityType,
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildIntegrations,
  ],
});

const commands = [];

client.commands = new Collection();

require("dotenv").config();
const clientId = process.env.clientid;
const guildId = process.env.guildid;
const ownerId = process.env.ownerid;
const token = process.env.token;

const fs = require("node:fs");
const path = require("node:path");

client.on("ready", () => {
  client.user.setPresence({
    activities: [
      {
        name: `${client.guilds.cache.size} Servers!`,
        type: ActivityType.Watching,
      },
    ],
  });
  client.user.setStatus("idle");
  console.log();
  console.log("------------------------------------------");
  console.log(`${client.user.username} is Online!`);
  console.log(`Servers: ${client.guilds.cache.size}`);
  console.log(
    `Users: ${
      client.guilds.cache.reduce((a, g) => a + g.memberCount, 0) -
      client.guilds.cache.size
    }`
  );
  console.log("------------------------------------------");
  console.log();
});

client.on(
  "messageCreate",
  (message) => (
    console.log(),
    console.log("------------------------------------------"),
    console.log(`Date: ${message.createdAt.toLocaleDateString()}    Time: ${message.createdAt.toLocaleTimeString()}`),
    console.log(`Guild: ${message.guild.name}    ID: ${message.guildId}`),
    console.log(`User: ${message.author.username}#${message.author.discriminator}    ID: ${message.author.id}`),
    console.log(`Message: ${message.content}`),
    console.log("------------------------------------------"),
    console.log()
  )
);

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

const rest = new REST({ version: "10" }).setToken(token);

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId), // Routes.applicationGuildCommands(clientId, guildId) // Routes.applicationCommands(clientId),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
})();

client.login(token);
