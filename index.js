const Discord = require("discord.js");
const client = new Discord.Client({ disableMentions: 'everyone' });
const Eco = require("quick.eco");
client.eco = new Eco.Manager(); // quick.eco
client.db = Eco.db; // quick.db
client.config = require("./botConfig");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.shop = {
    coal: {
        cost: 100
    },
    iron: {
        cost: 250
    },
    redstone: {
        cost: 350
    },
    gold: {
        cost: 500
    },
    lapis: {
        cost: 650
    },
    diamond: {
        cost: 12500
    },
    netherite: {
        cost: 25000
    },
    elytra: {
        cost: 100000
    },
    totem: {
        cost: 900000
    },
    WoodStack: {
        cost: 500
    },
    CobbleStack: {
        cost: 1000
    },
    DeepslateStack: {
        cost: 1200
    },
    ConcreteStack: {
        cost: 3500
    },
    PearlStack: {
        cost: 35000
    },
    BlazeRodStack: 60000
};
const fs = require("fs");

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(f => {
        if (!f.endsWith(".js")) return;
        const event = require(`./events/${f}`);
        let eventName = f.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(f => {
        if (!f.endsWith(".js")) return;
        let command = require(`./commands/${f}`);
        client.commands.set(command.help.name, command);
        command.help.aliases.forEach(alias => {
            client.aliases.set(alias, command.help.name);
        });
    });
});


client.login(client.config.token);