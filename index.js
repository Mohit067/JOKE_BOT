const TelegramBot =  require('node-telegram-bot-api');

const dotenv = require('dotenv');
const { default: axios, options } = require('axios');
dotenv.config();

// // console.log(process.env.TELEGRAM_TOKEN); // Check if TELEGRAM_TOKEN is present here

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

bot.onText(/Hii/i, (option) => {
    console.log("message received on the bot", option);

    bot.sendMessage(option.chat.id, "hello i am bot, How may i help you ?");
});

// Handle other messages
bot.on('message', (msg) => {
    if (msg.text !== "/Hindijoke" && !/Hii/i.test(msg.text) && msg.text !== "/Englishjoke") {
        bot.sendMessage(msg.chat.id, "If you want to listen to a Hindi joke then please write /Hindijoke if you want to listen to an English joke then please write /Englishjoke");
    }
});

bot.onText(/\/Hindijoke/, async (msg) => {
    try {
        const response = await axios.get('https://joke-api-1-2okz.onrender.com/jokes/random');
        console.log(response)
        let joke = response.data.joke;
        bot.sendMessage(msg.chat.id, joke);
    } catch (error) {
        console.error("Error getting joke:", error);
        bot.sendMessage(msg.chat.id, "Kuch error hui, baad mein try karo");
    }
});


// Handle /joke
bot.onText(/\/Englishjoke/, async (msg) => {
    try {
        const response = await axios.get('https://official-joke-api.appspot.com/random_joke'); // english
        console.log(response)
        const setup = response.data.setup;
        const punchline = response.data.punchline;
        bot.sendMessage(msg.chat.id, `${setup}\n\n${punchline}`);
    } catch (error) {
        bot.sendMessage(msg.chat.id, "Sorry, I couldn't fetch a joke right now.");
    }
});
