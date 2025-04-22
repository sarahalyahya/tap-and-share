

//here we are selecting all the elements with the selector FILE 
const allFolders = document.querySelectorAll(".file");

const p5Canvas = document.getElementById("canvas-container");

const loginForm = document.getElementById("login");
const loginButton = document.getElementById("login-btn");



const sideBar = document.getElementById("sidebar");
const sidebarWidth = parseFloat(getComputedStyle(sidebar).width);
const sideBarHeight = parseFloat(getComputedStyle(sidebar).height);

const openWelcomeBtn = document.getElementById("open-welcome-btn");
const welcomeContainer = document.getElementById("welcome-container");
const closeWelcomeBtn = document.getElementById("close-welcome-btn");
let coinInstruction = document.getElementById("coin-instruction");


const openChatBtn = document.getElementById("open-chat-btn");
 const chatBox = document.getElementById("chatBox");
 const chatContainer = document.getElementById("chatContainer");
 const closeChatBtn = document.getElementById("close-chat-btn");
 const sendBtn = document.getElementById("sendBtn");


const currencyContainer = document.getElementById("currency-container");
const coinContainer = document.getElementById("coin-container");
let balanceDisplay = document.getElementById("balance");
const openCurrencyBtn= document.getElementById("open-currency-btn");
const closeCurrencyBtn = document.getElementById("close-currency-btn");
const conversionSelect = document.getElementById("currency-select"); 
const convertCurrencyBtn = document.getElementById("convert-btn"); 
const conversionResult = document.getElementById("result");
const amountInput = document.getElementById("currency-amount");


const glossaryContainer = document.getElementById("glossary-container");
const openGlossaryBtn = document.getElementById("open-glossary-btn");
const closeGlossaryBtn = document.getElementById("close-glossary-btn");

const browserContainer = document.getElementById("browser-container");

const openBrowserBtn = document.getElementById("open-browser-btn");

const endSessionBtn = document.getElementById("end-session-btn");



const followBtn = document.getElementById('follow-btn');
const followSymbol = document.getElementById('follow-symbol');
let followText = document.getElementById('follow-text');
let alertInterval; 
let currentUsername = "";



window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("username-field").focus();
  });
  


function createBalance(){
    console.log(balanceDisplay);
    
    console.log("coin balance: " + coinBalance); 
    balanceDisplay.textContent = coinBalance; 
    
}



//so theyre not active on login screen
let popupsActive = true; 





function makeDraggable(folder){

    let isDragging = false;
    let hasMoved = false;
    let prevX, prevY;

        //upon clicking the mouse, we know it's dragging, cursor changes, and the x,y coords are updated with the coords of the grab moment
    folder.addEventListener("mousedown", (event) =>{
        isDragging = true;
        hasMoved = false;
        folder.style.cursor = "grabbing";
        prevX = event.clientX;
        prevY = event.clientY;

        //keep getting left and top values and tracking movement 
        function onMouseMove(event){
            if (!isDragging) return;

            hasMoved = true;
            const movementX = event.clientX - prevX;
            const movementY = event.clientY - prevY;

            let leftValue = parseInt(window.getComputedStyle(folder).left);
            let topValue = parseInt (window.getComputedStyle(folder).top);

            folder.style.left = `${leftValue + movementX}px`;
            folder.style.top = `${topValue + movementY}px`;

            prevX = event.clientX;
            prevY = event.clientY;
        }
        function onMouseUp(){
        
            isDragging = false; 
            folder.style.cursor = "grab";
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);

        }
        //once we grab, these event listeners are activated
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });
  
    
}

loginButton.addEventListener("click", makeInvisible); 

function makeInvisible(e){

    const usernameInput = document.getElementById("username-field").value.trim();
    currentUsername = usernameInput || "Guest";

    document.getElementById("sidebar-greeting").textContent = `Hello, ${currentUsername}!`;
   e.preventDefault(); 
    loginForm.style.visibility = "hidden";
    sideBar.style.visibility = "visible";
    p5Canvas.style.visibility = "visible";

    makeDraggable(sideBar);
    startTimer(600);
 

    if (!popupsActive){
        popupsActive = true; 
        startVidPopup(); 
        startAdPopup();
    }

}; 






openWelcomeBtn.addEventListener("click", openWelcome);
closeWelcomeBtn.addEventListener("click", closeWelcome);




function openWelcome(){
    welcomeContainer.style.display = "block"
    makeDraggable(welcomeContainer);
    coinInstruction.innerHTML= `The access code has provided you with <strong>${coinBalance} TikTok Coins </strong> for a limited time indicated by the <strong> ⏳Timer </strong> on the bottom right. Spend them wisely.`;
}

function closeWelcome(){
    welcomeContainer.style.display = "none"; 
}
//chat pop up
openChatBtn.addEventListener("click", openChat);
closeChatBtn.addEventListener("click", closeChat);
sendBtn.addEventListener("click", sendMessage);
document.getElementById("userInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        e.preventDefault(); // prevent form submission
        sendMessage();
    }
});




function openChat(){
    chatContainer.style.display = "flex";
    loadMessages();
    makeDraggable(chatContainer);
}

function closeChat(){
    console.log("you're clicking me!");
    chatContainer.style.display = "none"; 
}



async function loadMessages() {
    try {
        chatBox.innerHTML = ""; 
        const response = await fetch("messages.json");
        const messages = await response.json();
        let i = 0;

        function displayNextMessage() {
            if (i < messages.length) {
                const { username, message } = messages[i];
                addMessage(message, username);
                i++;
                setTimeout(displayNextMessage, 2500); //delay between msgs
            }
        }

        displayNextMessage(); // Start displaying messages
    } catch (error) {
        console.error("Error loading messages:", error);
    }
}

function addMessage(text, user, isUser = false) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.textContent = isUser ? `${currentUsername}: ${text}` : `${user}: ${text}`;

    
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
    const input = document.getElementById("userInput");
    const text = input.value.trim();
    if (text) {
        addMessage(text, "You", true);
        input.value = "";
    }
}






function updateCoins(amount){
   coinBalance= Math.max(0, coinBalance+amount);
    balanceDisplay.textContent = coinBalance;
    
   

    if (coinBalance == 0){
       showAlert("Not enough coins!");
    }
}

function showAlert(message) {
    const alertBox = document.getElementById("custom-alert");
    alertBox.textContent = message;
    alertBox.classList.add("show");
  
    setTimeout(() => {
      alertBox.classList.remove("show");
    }, 2000); // stays visible for 2 seconds
  }
  


//Currency convert 
openCurrencyBtn.addEventListener("click", function(){
    makeDraggable(currencyContainer);
    currencyContainer.style.display = "block";

})

closeCurrencyBtn.addEventListener("click",function(){
    currencyContainer.style.display = "none"; 
    amountInput.value="";
    conversionResult.innerHTML="";

})

let coinsToUSD = 0.013;
let USDToCoins = 78;
const tiktokCut = 0.57; 

convertCurrencyBtn.addEventListener("click", function(){
  let userConversionInput = parseFloat(document.getElementById("currency-amount").value);
  let conversionSelectValue = conversionSelect.value;

  
  if (isNaN(userConversionInput) || userConversionInput <= 0) {
    conversionResult.innerHTML = "Please enter a valid amount.";
    return;
}

let result; 
let resultText = "";

  if(conversionSelectValue == "USD-to-coins"){
    result = userConversionInput*USDToCoins;
    let tiktokTakes = result*tiktokCut;
    let creatorGets = result - tiktokTakes; 
    
    resultText = `
                <p><strong>${userConversionInput.toFixed(2)} USD</strong> ≈ <strong>${result.toFixed(3)} Coins</strong></p>
                <p>💰 TikTok Takes: <strong>${tiktokTakes.toFixed(3)} Coins</strong></p>
                <p>🎉 Creator Gets: <strong>${creatorGets.toFixed(3)} Coins</strong></p>
            `;
    
  } else {
    result = userConversionInput*coinsToUSD;
    let tiktokTakes = result*tiktokCut;
    let creatorGets = result - tiktokTakes; 
    resultText = `
    <p><strong>${userConversionInput.toFixed(3)} Coins</strong> ≈ <strong>${result.toFixed(3)} USD</strong></p>
    <p>💰 TikTok Takes: <strong>${tiktokTakes.toFixed(3)} USD</strong></p>
    <p>🎉 Creator Gets: <strong>${creatorGets.toFixed(3)} USD</strong></p>
`;
  
  }
  conversionResult.innerHTML = resultText;
})

//open + close glossary
openGlossaryBtn.addEventListener("click", function() {
    glossaryContainer.style.display = "block";
    makeDraggable(glossaryContainer); 
})

closeGlossaryBtn.addEventListener("click", function(){
    glossaryContainer.style.display = "none";
})

openBrowserBtn.addEventListener("click", function(){
    console.log("browser here");
    browserContainer.style.display = "flex";
    startFloatingAlerts();
     
})



const iframes = document.querySelectorAll('iframe');

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                const iframe = entry.target;
                if (entry.isIntersecting) {
                    // Play the video when in view
                    const src = iframe.getAttribute('data-src');
                    iframe.src = src;  // Set the src to the actual URL to start playing
                } else {
                    // Pause the video when out of view
                    const iframeWindow = iframe.contentWindow;
                    iframeWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                }
            });
        }, { threshold: 0.5 }); // 50% of the iframe must be in view

        // Observe all iframe elements
        iframes.forEach(iframe => {
            observer.observe(iframe);
        });

    const scrollUpBtn = document.getElementById("feed-scroll-up");
    const scrollDownBtn = document.getElementById("feed-scroll-down");
    const feed = document.getElementById('feed');
    const postHeight = document.querySelector('.post').offsetHeight;
    console.log(scrollUpBtn, scrollDownBtn); // should not be null

        function scrollUp() {
            
            feed.scrollBy({ top: -592, behavior: 'smooth' });
            console.log("we here?")
        }

        function scrollDown() {
            console.log("we here");
            if (followBtn.classList.contains('followed')) {
                followBtn.classList.remove('followed');  // Reset to initial state
                followSymbol.textContent = '+';  // Reset the symbol back to "+"
            }
            feed.scrollBy({ top: 592, behavior: 'smooth' });

        }

    scrollDownBtn.addEventListener("click", scrollDown);
    scrollUpBtn.addEventListener('click', scrollUp);

    document.querySelectorAll(".gift").forEach(gift => {
        gift.addEventListener("click", () => {
          gift.style.transform = "scale(2)";
          setTimeout(() => gift.style.transform = "scale(1)", 300);
        });
      });

let coinBalance = Math.floor(Math.random() * 2000) + 400; // Initial random balance
balanceDisplay.textContent = coinBalance; // Display initial balance

function updateBalance(giftValue) {
    if (coinBalance >= giftValue) {
        coinBalance -= giftValue; // Deduct gift value from balance
        console.log("deducting!")
        balanceDisplay.textContent = coinBalance; // Update balance display
        return true;
    } else {
        showAlert("Insufficient coins ❕");
        return false;
     // Show warning if balance is too low
    }
}

// Attach click event to each gift
document.querySelectorAll(".gift").forEach(item => {
    item.addEventListener("click", function() {
        let giftValue = parseInt(this.getAttribute("data-value")); // Get gift value
        const animatedGiftImage = document.createElement('img');
        animatedGiftImage.src = this.querySelector('.gift-img').src; // Get the gift image source
        animatedGiftImage.classList.add('animated-gift');
        // updateBalance(giftValue);
        if (updateBalance(giftValue)) {
        document.body.appendChild(animatedGiftImage);
        animatedGiftImage.addEventListener('animationend', () => {
        animatedGiftImage.remove();
        console.log("clicking");
        
    });
}
});
});




const likeButton = document.querySelector('.like-btn');

likeButton.addEventListener('click', function() {
  likeButton.classList.add('clicked');

  // Remove the class after the animation is done to reset the effect
  setTimeout(function() {
    likeButton.classList.remove('clicked');
  }, 1000); // Timing should match the explosion animation duration
});

const alertMessages = [
    "💰 USE your balance to gift the streamer!",
    "💰 USE your balance to gift the streamer!",
    "🌹 Maybe a rose?",
    " 🤑Careful...don't spend it all!",
    "💬 Say 'Hello' in the chat",
    "🤑 No money? No problem! You can always ❤️ it",
    "⚡ Viral Moment Incoming!",
    "🫣 There's only a few of us here", 
    "🔍 Confused about a term? Check the glossary!",
    "💸 How much is it all worth? Check the currency exchange!",
    "⛵ Can you afford the yacht?",
    "🎉 Support our creative streamer!"
];

function createFloatingAlert() {
    let alert = document.createElement("div");
    alert.className = "floating-alert";
    alert.innerText = alertMessages[Math.floor(Math.random() * alertMessages.length)];
    document.body.appendChild(alert);
    alert.style.left = Math.random() * window.innerWidth + "px";
    alert.style.top = Math.random() * window.innerHeight + "px";
    setTimeout(() => alert.remove(), 3000);
}

function startFloatingAlerts(){
    if(!alertInterval){
        alertInterval = setInterval(createFloatingAlert,3000);
    }
}

function stopFloatingAlerts(){
    if(alertInterval){
        clearInterval(alertInterval);
        alertInterval = null;
    }
}




// Function to create the timer overlay in the bottom-left corner
function createTimerOverlay() {
    const overlay = document.createElement("div");
    overlay.id = "timer-overlay";  // Give it an ID for styling and control
    document.body.appendChild(overlay);  // Append it to the body
    return overlay;
}

// Function to start the countdown timer (in seconds)
function startTimer(duration) {
    
    const timerOverlay = createTimerOverlay();
    let remainingTime = duration; // Duration in seconds (e.g., 600 seconds = 10 minutes)
    
    const timerInterval = setInterval(() => {
        const minutes = Math.floor(remainingTime / 60); // Get the minutes
        const seconds = remainingTime % 60; // Get the remaining seconds
        timerOverlay.textContent = `⏳${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

        if (remainingTime <= 60) {
            timerOverlay.style.backgroundColor = "#FF0050";
            timerOverlay.style.color = "white";
            timerOverlay.style.fontWeight = "bold";
            timerOverlay.style.animation = "pulse 1s infinite";
            showAlert("⏰ Time is running out!");
        }
        
        if (remainingTime <= 0) {
            clearInterval(timerInterval); // Stop the timer when it reaches 0
            showSessionEndPanel(); // Redirect to login screen when the timer ends
            stopFloatingAlerts();
            stopVimeoVideos();
        } else {
            remainingTime--; // Decrease the remaining time by 1 second
        }
    }, 1000); // Update every second
}


function clearOldTimer() {
    const oldTimer = document.getElementById("timer-overlay");
    if (oldTimer) {
        oldTimer.remove();  // Remove the old timer if it exists
    }
}

// Function to create the timer overlay
function createTimerOverlay() {
    clearOldTimer();  // First, clear any existing timer overlay
    const overlay = document.createElement("div");
    overlay.id = "timer-overlay";
    document.body.appendChild(overlay);
    return overlay;
}


function stopVimeoVideos() {
    const iframes = document.querySelectorAll('iframe');
    
    iframes.forEach(iframe => {
        // Store the current src
        const iframeSrc = iframe.src;

        // Remove the iframe src to stop the video
        iframe.src = '';

        // Optionally mute the video by adding the muted query parameter
        iframe.src = iframeSrc.split('?')[0] + '?autoplay=0&muted=1'; // Add autoplay=0 to stop and mute it
    });

    // Hide the entire browser container to effectively stop everything
    const browserContainer = document.getElementById("browser-container");
    browserContainer.style.display = "none";
}


function resumeVimeoVideos() {
    const iframes = document.querySelectorAll('iframe');

    iframes.forEach(iframe => {
        // Get the original iframe src from a custom attribute or from the current src URL
        const originalSrc = iframe.getAttribute('data-src') || iframe.src;

        // Restore the original src (without muting or pausing)
        iframe.src = originalSrc;
    });

    // Show the browser container again
    const browserContainer = document.getElementById("browser-container");
    browserContainer.style.display = "flex";
}



// Function to redirect to the login screen after the timer ends
function redirectToLogin() {
    stopVimeoVideos();
    stopFloatingAlerts();
    

 
    // Hide all elements
    

    browserContainer.style.display = "none";
    chatContainer.style.display = "none";
    currencyContainer.style.display = "none";
    glossaryContainer.style.display = "none";
    p5Canvas.style.visibility = "hidden";
    sideBar.style.visibility = "hidden";  // Hide sidebar
    loginForm.style.visibility = "visible";  // Show login form
    console.log("HIDING DONE");
}


// Get the button and symbol elements


// Add an event listener to trigger the animation and symbol change when clicked
followBtn.addEventListener('click', function () {
    // Toggle the "followed" class
    if (followBtn.classList.contains('followed')) {
        followBtn.classList.remove('followed');
        followText.textContent='Follow';
        followSymbol.textContent = '+';  // Change back to "+" if unfollowed
        
    } else {
        followBtn.classList.add('followed');
        followText.textContent = 'Following';
        followSymbol.textContent = '✔';  // Change to checkmark when followed
    }
});


function showSessionEndPanel() {
    console.log("here");
    stopVimeoVideos();
    stopFloatingAlerts();
    const panel = document.getElementById("session-end-panel");
    const messageBox = document.getElementById("session-message");
  
    const message = `While living in the UAE in 2023, I came across a TikTok LIVE stream by a migrant worker from inside the migrant camps that the local government hides. I didn’t record it, and after I left the country, I never found one like it again.\n\nWhen the genocide in Gaza began, I remembered that stream and wondered whether people in Gaza were taking to TikTok LIVE. I don’t remember how I got there, but eventually, I found those streams from Gaza.\n\nI spent hours a day with Abou Yazan, Mahmoud, and Tasnim. They often repeated scripts or spoke in a streaming language I wasn’t familiar with at the time. Sometimes I’d comment, but mostly I just witnessed.\n\nPerhaps they never noticed my presence, but every morning I’d check in, hoping they were still live streaming.\n\nDespite TikTok’s exploitative policies and mechanisms, its LIVE feature became a space for Gazans to broadcast and monetize the spectacle of their suffering.\n\nOn TikTok LIVE, family members divided by displacement checked on each other despite the competitive setting of the platform, and viewers from all over the world took up streaming to translate the words from Gaza for their local audiences.\n\n\n\nThis work is my attempt at translating the inventive and tactical practices of these streamers who navigate systems and platforms built to erase them.`;
    const lines = message.split("\n");

    panel.style.display = "flex";
    messageBox.innerHTML = "";
  
    let lineIndex = 0;
  
    function typeLine() {
      if (lineIndex >= lines.length) {
        setTimeout(() => redirectToLoginFinal(), 150000);
        return;
      }
  
      const line = lines[lineIndex];
      const p = document.createElement("p");
      p.textContent = "";
      messageBox.appendChild(p);
  
      let charIndex = 0;
  
      function typeChar() {
        if (charIndex < line.length) {
          p.textContent += line.charAt(charIndex);
          messageBox.scrollTop = messageBox.scrollHeight;

          charIndex++;
          

          setTimeout(typeChar, 90);
        } else {
          lineIndex++;
          setTimeout(typeLine, line.trim() === "" ? 700 : 300);
        }
      }
  
      typeChar();
    }
  
    setTimeout(() => {
        typeLine();
    }, 500);
  }
  
  
  
  
  
  function redirectToLoginFinal() {
    document.getElementById("session-end-panel").style.display = "none";
    redirectToLogin(); 
  }
  

endSessionBtn.addEventListener("click", () => {
    console.log("heree");
   showSessionEndPanel(); 
  stopVimeoVideos();
  console.log("hereee");
  stopFloatingAlerts();
  console.log("hereeee");
  console.log("hereeee");
    
});
