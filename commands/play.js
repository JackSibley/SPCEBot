const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays music from search query"),
  async execute(interaction) {
    await interaction.reply("Pong!");
  },
};
