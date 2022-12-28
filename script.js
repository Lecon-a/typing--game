// all quotes here
const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
    'But if we hope for that we see not, then do we with patience wait for it',
    'Trust ye in the LORD for ever: for in the LORD JEHOVAH is everlasting strength.',
    'In whose hand is the soul of every living thing, and the breath of all mankind.'
];

// store the list of words and the index of the word the player is currently typing
let words = [];
let wordIndex = 0;
// the starting time
let startTime = Date.now();
// page elements
const quoteElement = document.querySelector('.display--quote');
const messageElement = document.querySelector('.result');
const typedValueElement = document.querySelector('.user--input');
const resultBlock = document.querySelector('.result--block');
const prevScore = document.querySelector('.previous--score');

document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem("Typing_Speed_Score")) {
        prevScore.innerHTML = 0;
    } else {
        prevScore.innerHTML = localStorage.getItem("Typing_Speed_Score");
    }
})

document.querySelector('.start')
    .addEventListener('click', () => {
        typedValueElement.disabled = false;
        // get a random quote
        const quoteIndex = Math.floor(Math.random() * quotes.length);
        const quote = quotes[quoteIndex];
        // put the quote into an array of words
        words = quote.split(' ');
        // reset the wordIndex for tracking
        wordIndex = 0;

        // Update User Interface
        // Create an array of span elements so we can set a class
        const spanWords = words.map(word => `<span>${word} </span>`);
        // Convert into string and set as innerHTML on quote display
        quoteElement.innerHTML = spanWords.join('');
        // Highlight the first word
        quoteElement.childNodes[0].className = 'highlight';
        // Clear any prior messages
        messageElement.innerText = '';
        
        // Setup the textbox
        // Clear the textbox
        typedValueElement.value = '';
        // set focus
        typedValueElement.focus();
        // set the event handler

        // Start the timer
        startTime = new Date().getTime();
    })

// at the end of script.js
typedValueElement.addEventListener('input', () => {
    // Get the current word
    const currentWord = words[wordIndex];
    // get the current value
    const typedValue = typedValueElement.value;

    if (typedValue === currentWord && wordIndex === words.length - 1) {
        // end of sentence
        // Display success
        resultBlock.style.display = "block";
        typedValueElement.disabled = true;
        const elapsedTime = new Date().getTime() - startTime;
        const convertNanosecond = elapsedTime / 1000;
        const message = `CONGRATULATIONS! You finished in ${convertNanosecond} seconds.`;
        messageElement.innerText = message;
        if (!localStorage.getItem("Typing_Speed_Score") || localStorage.getItem("Typing_Speed_Score") > convertNanosecond) {
            localStorage.setItem("Typing_Speed_Score", convertNanosecond);
            prevScore.innerHTML = localStorage.getItem("Typing_Speed_Score");
        }
    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
        // end of word
        // clear the typedValueElement for the new word
        typedValueElement.value = '';
        // move to the next word
        wordIndex++;
        // reset the class name for all elements in quote
        for (const wordElement of quoteElement.childNodes) {
            wordElement.className = '';
        }
        // highlight the new word
        quoteElement.childNodes[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
        // currently correct
        // highlight the next word
        typedValueElement.className = '';
    } else {
        // error state
        typedValueElement.className = 'error';
    }
});

document.querySelector(".close").addEventListener("click", () => {
    resultBlock.style.display = "none";
})
