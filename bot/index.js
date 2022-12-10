const { Client, GatewayIntentBits } = require("discord.js");
const { request } = require("axios");
require("dotenv/config");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log("The bot is ready");
});

client.on("messageCreate", async (message) => {
  const firstSix = message.content.slice(0, 6);
  const prompt = message.content.slice(7, message.content.length);
  if (firstSix === "howzit") {
    if (prompt === "imageboet") {
      message.reply(
        "Howzit mah china?! I'm currently running and working correctly"
      );
    } else {
      message.reply(`Fetching your request for ${prompt}`);
      try {
        const { data } = await request(
          "http://localhost:5000/openai/generateimage",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            data: {
              prompt,
              size: "medium",
            },
          }
        );
        message.reply(data.data);
      } catch (e) {
        message.reply("Sorry there was an error :(");
      }
    }
  }
});

client.login(process.env.TOKEN);
