const twilio = require('twilio');
const playwright = require('playwright');
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
require('dotenv').config();


const { chromium } = require('playwright');




async function checkAvailablity() {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();


    for (let attempt = 0; attempt < 3; attempt++) {
        try {
            await page.goto('https://in.bookmyshow.com/buytickets/the-greatest-of-all-time-chennai/movie-chen-ET00401439-MT/20240905', { waitUntil: 'networkidle' });
            console.log("Page loaded successfully");
            break;  // Exit the loop if successful
        } catch (error) {
            console.error(`Attempt ${attempt + 1} failed:`, error);
            if (attempt === 2) {
                throw error;  
            }
        }
    }

    const theatreName = await page.evaluate(() => document.querySelector('a.showtime-pill[data-venue-code="CBMC"][data-showtime-filter-index="morning"]'));
    
    if(theatreName){
        sendWhatsappMessage1();
        await browser.close();
    }else{
        sendWhatsappMessage2();
        await browser.close();
    }
    
};


 function sendWhatsappMessage1(){
client.messages
    .create({
        body: 'VR mall la ticket irku da bnda..sekrom paru..',
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+919884163253'
    })
    .then(message => console.log(message.sid))
}
function sendWhatsappMessage2(){
    client.messages
        .create({
            body: 'VR mall la ticket ilaaa..',
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+919884163253'
        })
        .then(message => console.log(message.sid))
    }

setInterval(checkAvailablity,6000)