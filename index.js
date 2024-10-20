const TelegramBot =  require('node-telegram-bot-api');

const dotenv = require('dotenv');
const { default: axios, options } = require('axios');
dotenv.config();

// // console.log(process.env.TELEGRAM_TOKEN); // Check if TELEGRAM_TOKEN is present here

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

// bot.on('message', (option) => {
//     console.log('message received on the bot', option);

//     bot.sendMessage(option.chat.id, 'i am a joke bot i am here for make happy to you plese write /joke')
// })

bot.onText(/\/joke/, async (option) => {
    const reponse = await axios.get('https://official-joke-api.appspot.com/random_joke');

    console.log(reponse.data);

    const setup = reponse.data.setup;
    const punchline = reponse.data.punchline;

    bot.sendMessage(option.chat.id, setup + " , "+ punchline);
})
