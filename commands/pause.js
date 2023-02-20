const { SlashCommandBuilder } = require("discord.js");
const { getVoiceConnection, AudioPlayerStatus } = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pause Audio"),

  async execute(interaction) {
    if (!interaction.member.voice.channelId) {
      return interaction.reply("not in a channel.");
    }
    const connection = getVoiceConnection(
      interaction.member.voice.channel.guildId
    );
    if (
      !connection ||
      connection.joinConfig.channelId != interaction.member.voice.channelId
    ) {
      return interaction.reply("The bot is not in this channel.");
    }

    if (!AudioPlayerStatus.Paused === "paused") {
      connection.state.subscription.player.pause();
      await interaction.reply("Paused.");
    } else {
      connection.state.subscription.player.unpause();
      await interaction.reply("Unpaused.");
    }
  },
};
