const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const btnTwitter = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

//showing loader 
function loading(){
loader.hidden = false;
quoteContainer.hidden = true;
}
//hiding loader
function complete()
{
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function newQuote(){
    loading();
const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

//check if author is blank replace with "unknown"
if(!quote.author){
    authorText.textContent = "unknown";
}
else{
    authorText.textContent = quote.author;
}

//check quote length and change styling
if(quote.text.length >120)
{
    quoteText.classList.add('long-quote');
}
else{
    quoteText.classList.remove('long-quote');
}
//set quote hide loader
quoteText.textContent = quote.text;
complete();
}
// get quotes from API
//asynch runs independenly while HTML loads, not causing the HTML to halt
async function getQuotes()
{
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
    const response = await fetch(apiUrl);
    // await here sets the response only when something is fetched, it waits until something is fetched
    apiQuotes = await response.json();
    newQuote();
}
    catch(error){
    // catch error here
    }
}

// tweet quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//event listeners

newQuoteBtn.addEventListener('click',newQuote);
btnTwitter.addEventListener('click',tweetQuote);

// on load
getQuotes();
