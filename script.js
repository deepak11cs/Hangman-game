const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random()*words.length)];

const correctLetters = [];
const wrongLetters = [];


// Show the hidden word
function displayWord(){
    wordEl.innerHTML = `
        ${selectedWord
            .split('')
            .map(letter=> `
                <span class="letter">
                    ${correctLetters.includes(letter)? letter: ''}
                </span>
            `).join('')
        }
    `;

    const innerWord = wordEl.innerText.replace(/\n/g,'');
    if(innerWord === selectedWord){
        finalMessage.innerText = 'Congratulations! You Won!';
        popup.style.display = "flex";
    }
}

// Update the wrong letters
function updateWrongLetttersEl(){
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length>0?'<p>Wrong</p>': ''}
        ${wrongLetters.map(letter=>`<span>${letter}</span>`)}
    `;

    figureParts.forEach((part,index)=>{
        const errors = wrongLetters.length;
        if(index < errors){
            part.style.display = 'block';
        }
        else{
            part.style.display = 'none';
        }
    });
    // Check if lost
    if(wrongLetters.length === figureParts.length){
        finalMessage.innerText = "Unfortunately you lost.";
        popup.style.display = 'flex';
    }
}

// Show Notification
function showNotification(){
    notification.classList.add('show');
    setTimeout(()=>{
        notification.classList.remove('show');
    },2000);
}

// Set meta tags
function setMeta() {
    var link = document.createElement('meta');  
    link.setAttribute('property', 'og:title');  
    link.content = 'Echo Dot (4th Gen, 2020 release) | Smart speaker with Alexa | Charcoal';  
    document.getElementsByTagName('head')[0].appendChild(link);
   ```
        <meta property="og:title" content="Echo Dot (4th Gen, 2020 release) | Smart speaker with Alexa | Charcoal"/>
        <meta property="og:image" content="https://images-na.ssl-images-amazon.com/images/I/41T6qPHm7hL._SR600%2c315_PIWhiteStrip%2cBottomLeft%2c0%2c35_PIStarRatingFOURANDHALF%2cBottomLeft%2c360%2c-6_SR600%2c315_ZA453%252C155%2c445%2c290%2c400%2c400%2cAmazonEmberBold%2c12%2c4%2c0%2c0%2c5_SCLZZZZZZZ_FMpng_BG255%2c255%2c255.jpg"/>
        <meta property="og:description" content="Echo Dot (4th Gen, 2020 release) | Smart speaker with Alexa | Charcoal"/>   ```
   return true;
}

// Keydown letter press
window.addEventListener('keydown',e=>{
    if(e.keyCode>=65 && e.keyCode <=90){
        const letter = e.key;
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();
            }
            else{
                showNotification();
            }
        }
        else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updateWrongLetttersEl();
            }
            else{
                showNotification();
            }
        }
    }
   
});

// Play again button event listener
playAgainBtn.addEventListener('click',()=>{
    
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord = words[Math.floor(Math.random()*words.length)];
    displayWord();
    updateWrongLetttersEl();
    popup.style.display = 'none';
});



displayWord();
