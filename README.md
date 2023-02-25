# SPCEBot

This is a Discord bot built using Discord.js v14, a powerful library for creating Discord bots using Node.js.

## Features

- **Command handling:** The bot handles various commands that are triggered by user input. The commands are defined in separate files in the `/commands` directory.
- **Event handling:** The bot listens for various Discord events, such as when a user joins the server or sends a message. The event handlers are defined in separate files in the `/events` directory.
- **Dynamic configuration:** The bot's behavior can be configured by editing the `config.json` file. This file contains various settings such as the bot token, the command prefix, and other options.
- **API integration:** The bot integrates with various APIs to provide additional functionality. For example, it uses the OpenWeatherMap API to provide weather information.

## Installation

1.  Clone this repository to your local machine using
2.  Install Node.js and npm (if not already installed).
3.  Run `npm install` to install the required dependencies.
4.  Rename `config.example.json` to `config.json` and fill in the required values.
5.  Rename `.env.example` to `.env` and fill in the required values.
6.  Run`node deploy-commands.js` to attach commands to server.
7.  Start the bot by running `node index.js`.

## Usage

The bot's command prefix is set to `/` by default. To invoke a command, type the prefix followed by the command name and any arguments. For example:

diff

```diff
/play
/play Flume
```

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and create a pull request.

## Credits

This bot was created by [Jack Sibley](https://github.com/JackSibley).
