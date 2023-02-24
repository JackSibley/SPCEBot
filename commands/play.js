const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const ytdl = require("ytdl-core");
const ffmpeg = require("ffmpeg-static");
const { google } = require("googleapis");
const { youtubeKey, guildId } = require("../config.json");
const {
  AudioPlayerStatus,
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
} = require("@discordjs/voice");

const youtube = google.youtube({
  version: "v3",
  auth: youtubeKey,
});

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays music from search query")
    .addStringOption((option) =>
      option.setName("input").setDescription("Song Title").setRequired(true)
    ),
  async execute(interaction) {
    const searchQuery = interaction.options.getString("input");
    //get voice channel ID
    const voiceChannelId = interaction.guild.members.cache.get(
      interaction.member.user.id
    ).voice.channelId;

    //create audio player
    const player = createAudioPlayer();

    player.on(AudioPlayerStatus.Playing, () => {
      console.log("The audio player has started playing!");
    });

    player.on("error", (error) => {
      console.error(`Error: ${error.message} with resource`);
    });

    //get audio from youtube
    try {
      const searchResults = await youtube.search.list({
        part: "id, snippet",
        q: searchQuery,
        type: "video",
        maxResults: 1,
      });

      if (!searchResults.data.items || searchResults.data.items.length === 0) {
        interaction.reply(
          "Sorry, I could not find any videos with that search query."
        );
        return;
      }

      const videoId = searchResults.data.items[0].id.videoId;
      const videoTitle = searchResults.data.items[0].snippet.title;
      const videoThumbnail =
        searchResults.data.items[0].snippet.thumbnails.default.url;
      console.log(videoThumbnail);
      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

      // Join the voice channel if the user is in one
      if (voiceChannelId) {
        //create the connection to voice channel
        const connection = joinVoiceChannel({
          channelId: voiceChannelId,
          guildId: guildId,
          adapterCreator: interaction.guild.voiceAdapterCreator,
        });

        const stream = ytdl(videoUrl, { filter: "audioonly" });

        //create and play audio
        const resource = createAudioResource(stream);
        player.play(resource);

        const subscription = connection.subscribe(player);

        const embed = new EmbedBuilder()
          .setColor(0x0099ff)
          .setTitle("Now Playing")
          .setDescription(videoTitle)
          .setThumbnail(videoThumbnail);
        interaction.reply({ embeds: [embed] });

        if (subscription) {
          // Unsubscribe after 60 seconds (stop playing audio on the voice connection)
          setTimeout(() => subscription.unsubscribe(), 60_000);
        }
      } else {
        interaction.reply("You need to join a voice channel first!");
      }
    } catch (error) {
      console.error(error);
      interaction.reply(
        "An error occurred while processing your request. Please try again later."
      );
    }
  },
};
