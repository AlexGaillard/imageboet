const { Client, GatewayIntentBits } = require("discord.js");
const { request } = require("axios");
const { botReplies, botPrompt } = require("./messaging.js");
const port = process.env.PORT || 3000;
require("dotenv/config");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log("imageBoet is ready");
});

client.on("messageCreate", async (message) => {
  console.log("hit");
  const firstSix = message.content.slice(0, 6);
  const prompt = message.content.slice(7, message.content.length);
  if (firstSix === botPrompt) {
    if (prompt === "imageboet") {
      message.reply(botReplies.status);
    } else {
      message.reply(`${botReplies.fetching} ${prompt}`);
      try {
        const { data } = await request(
          `http://localhost:${port}/openai/generateimage`,
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
        console.log(e);
        message.reply(`${botReplies.error} ${e.response.data.error}`);
      }
    }
  }
});

client.login(process.env.TOKEN);
