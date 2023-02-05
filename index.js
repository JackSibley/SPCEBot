const { Client, Events, GatewayIntentBits } = require("discord.js");
const ytsearch = require("yt-search");
const ytdl = require("ytdl-core");
const dotenv = require("dotenv");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const token = process.env.TOKEN;
const ytKey = process.env.YTKEY;

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on("message", (message) => {
  if (message.content.startsWith("!play")) {
    const query = message.content.split(" ").slice(1).join(" ");
    ytsearch(query, { key: ytKey }, (err, res) => {
      if (err) throw new Error(err);
      const videos = res.videos;
      const url = videos[0].url;
      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel)
        return message.channel.send(
          "You need to be in a voice channel to play music!"
        );
      voiceChannel.join().then((connection) => {
        const stream = ytdl(url, { filter: "audioonly" });
        const dispatcher = connection.play(stream);
        dispatcher.on("finish", () => {
          voiceChannel.leave();
        });
      });
    });
  }
});

client.login(token);
