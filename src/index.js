const {
  Client,
  Collection,
  GatewayIntentBits,
  messageLink,
  Message,
  REST,
  Routes,
  SlashCommandBuilder,
  VoiceChannel,
  Events,
  updateVoiceState,
  Attachment,
  IntentsBitField
} = require("discord.js");

const { joinVoiceChannel } = require("@discordjs/voice");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
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
  console.log(`${client.user.username} is Online!`); 
});

client.on(
  "messageCreate",
  (message) => (
    console.log(),
    console.log("------------------------------------------"),
    console.log(message.author.createdAt),
    console.log(`User: ${message.author.username}#${message.author.discriminator}`),
    console.log(`Message: ${message.content}`),
    console.log(`Attatchments:`),
    console.log(console.log(
      `      ${message.attachments.at(0)?.url},
      ${message.attachments.at(1)?.url},
      ${message.attachments.at(2)?.url},
      ${message.attachments.at(3)?.url},
      ${message.attachments.at(4)?.url},
      ${message.attachments.at(5)?.url},
      ${message.attachments.at(6)?.url},
      ${message.attachments.at(7)?.url},
      ${message.attachments.at(8)?.url},
      ${message.attachments.at(9)?.url}`
      )),
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
      Routes.applicationGuildCommands(clientId, guildId),
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
