

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
// const browserContainer2 = document.getElementById("b-container");
const openBrowserBtn = document.getElementById("open-browser-btn");
//const closeBrowserBtn = document.getElementById("close-browser-btn");


//random for later, will cause errors when it nears zero i think, so lets have it fixed for now
// let coinBalance = Math.floor(Math.random()*51); 

// let coinBalance = 50;
// balanceDisplay = document.getElementById("balance"); 
// console.log(balanceDisplay);
// balanceDisplay.textContent = coinBalance; 

const followBtn = document.getElementById('follow-btn');
const followSymbol = document.getElementById('follow-symbol');
let followText = document.getElementById('follow-text');
let alertInterval; 

// const infoContainer = document.getElementById('info-container');





function createBalance(){
    console.log(balanceDisplay);
    
    console.log("coin balance: " + coinBalance); 
    balanceDisplay.textContent = coinBalance; 
    
}

// document.addEventListener("DOMContentLoaded", function () {
//     createBalance();
// });

//so theyre not active on login screen
let popupsActive = true; 




// allFolders.forEach(folder => {
//     //randomize the position of each folder -- REVISIT THIS, might want a more orderly start
//     randomizePosition(folder);
//     makeDraggable(folder);
// });

// // in this function, we want to randomize the position of each file object
// function randomizePosition(folder){

//     //to make it dynamic, there's a folderWidth variable which uses a function - just incase i change the width of the img
//     const folderImg = document.querySelector(".folderimg");
//     const folderWidth = folderImg.clientWidth; // Get actual image width
//     const folderHeight = folderImg.clientHeight;
//     const padding = 100;
   
//     const minX = sidebarWidth + padding; // Start after the sidebar
//     const maxX = window.innerWidth - folderWidth - padding; // Keep within screen width

//     const minY = padding; // Prevent going off the top
//     const maxY = window.innerHeight - folderHeight - padding; // Prevent going off the bottom

//     // Generate random X and Y within the allowed space
//     const randomX = Math.random() * (maxX - minX) + minX;
//     const randomY = Math.random() * (maxY - minY) + minY;

//     //edit style sheet
//     folder.style.left = `${randomX}px`;
//     folder.style.top = `${randomY}px`;
// }



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
    console.log(sideBar.offsetWidth); 
   e.preventDefault(); 
    loginForm.style.visibility = "hidden";
    sideBar.style.visibility = "visible";
    p5Canvas.style.visibility = "visible";
    // ();showInfoIcon
    makeDraggable(sideBar);
    startTimer(600);
    //coinContainer.style.visibility = "visible";

    // allFolders.forEach(folder =>{
    //     folder.style.visibility ="visible";
    // })

    if (!popupsActive){
        popupsActive = true; 
        startVidPopup(); 
        startAdPopup();
    }

}; 

// function openFolder(){
//     //const folderName = folder.querySelector(".file-name").textContent;
//     //console.log("clicked!");
//     window.location.href = "videos.html"; // Navigate based on folder name
// }




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
                setTimeout(displayNextMessage, 2500); // Delay of 1 second before the next message
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
    messageElement.textContent = isUser ? `You: ${text}` : `${user}: ${text}`;
    
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
// pop up videos

//video array goes here (when there's multiple links)

const URL = "https://vimeo.com/1074064925/d0a93261e7?ts=0&share=copy"; 


function generateVidPopup(){

    //create pop up element
    const videoPopup = document.createElement("div");
    videoPopup.classList.add("video-popup");

    //choose random vid from array goes here (when there's multiple links)

    //create iframe which goes inside pop up
    const videoIframe = document.createElement("iframe"); 
    //  videoIframe.src = `${ytURL}?autoplay=1&modestbranding=1&showinfo=0&controls=0`;
    videoIframe.src = URL;
    // videoIframe.width = "200"; 
    // videoIframe.height = "560";
    videoIframe.allow = "autoplay; encrypted-media";


    //close btn
    const videoPopupClose = document.createElement("button");
    videoPopupClose.classList.add("close-btn"); 
    videoPopupClose.setAttribute("id","popup-close-btn");
    videoPopupClose.textContent = "X";
    videoPopupClose.onclick = () => videoPopup.remove();

    //donate button, needs to be gift specific later aaaaaAAA
    const videoGiftButton = document.createElement("button");
    videoGiftButton.classList.add("gift-button");
    videoGiftButton.textContent = "Gift";
    videoGiftButton.addEventListener("click",() => updateCoins(-5));
    

   
    videoPopup.appendChild(videoIframe); 
    videoPopup.appendChild(videoPopupClose);
    videoPopup.appendChild(videoGiftButton);
    document.body.appendChild(videoPopup); 

  PopupPosition(videoPopup);  

}



//every 10 seconds rn
function startVidPopup(){
    setInterval(generateVidPopup, (Math.random()*50000)); 
}

function startAdPopup(){
    setInterval(generateAdPopup, (Math.random()*50000));
    console.log("yeah I'm here");
}

//randomize
function PopupPosition(popup){
    const padding = 20;
    const maxX = window.innerWidth - popup.clientWidth - padding;
    const maxY = window.innerHeight - popup.clientHeight - padding;

    const randomX = Math.random() * (maxX - sidebarWidth) +sidebarWidth; 
    const randomY = Math.random() * maxY; 

    popup.style.left = `${randomX}px`;
    popup.style.top = `${randomY}px`;

}

const adImgs = ["assets/ads/cakemarketing.png", "assets/ads/reducedPriceBoxing!.png"]

//pop up ads
function generateAdPopup(){

    //create pop up element
    const adPopup = document.createElement("div");
    adPopup.classList.add("ad-popup");

    //choose random vid from array goes here (when there's multiple links)

    //create iframe which goes inside pop up
    const adImg = document.createElement("img"); 
    adImg.src = adImgs[Math.floor(Math.random() * 2)]


    //close btn
    const adPopupClose = document.createElement("button");
    adPopupClose.classList.add("close-btn"); 
    adPopupClose.setAttribute("id","popup-close-btn");
    adPopupClose.textContent = "X";
    adPopupClose.onclick = () => adPopup.remove();

    //donate button, needs to be gift specific later aaaaaAAA
    

   
    adPopup.appendChild(adImg); 
    adPopup.appendChild(adPopupClose);
    document.body.appendChild(adPopup); 

  PopupPosition(adPopup);  

}


function updateCoins(amount){
   coinBalance= Math.max(0, coinBalance+amount);
    balanceDisplay.textContent = coinBalance;
    
   
//stylizing an alert will def be better (so make one)
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
  


//Currency convert (double check the math)
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
    //conversionResult.innerHTML = `${userConversionInput} USD ≈ ${result.toFixed(2)} TikTok Coins`;
    
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
     //setInterval(createFloatingAlert, 3000);
    // resumeVimeoVideos();
    // openChat();
    
})

// closeBrowserBtn.addEventListener("click", function(){
//     browserContainer.style.display = "none";
//     console.log("hiding");
// })

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

let coinBalance = Math.floor(Math.random() * 2000) + 200; // Initial random balance
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
     // Show warning if balance is too low, STYLE THIS WARNING! 
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

// // Balance update function
// function updateBalance(giftValue) {
//     if (coinBalance >= giftValue) {
//         // Deduct gift value from balance
//         coinBalance -= giftValue;
//         balanceDisplay.textContent = coinBalance; // Update balance display
//         return true; // Indicate that the balance was updated and animation should proceed
//     } else {
//         alert("Insufficient funds!");
//         showWarning(); // Show warning message if balance is too low
//         return false; // Indicate that there are insufficient funds
//     }
// }

// // Function to show warning for insufficient funds
// function showWarning() {
//     const warningMessage = document.createElement('div');
//     warningMessage.textContent = "Insufficient funds! Please add more coins.";
//     warningMessage.classList.add('warning-message');
    
//     // Append to body and remove after 3 seconds
//     document.body.appendChild(warningMessage);
//     setTimeout(() => warningMessage.remove(), 3000);
// }

// // Attach click event to each gift
// document.querySelectorAll(".gift").forEach(item => {
//     item.addEventListener("click", function() {
//         let giftValue = parseInt(this.getAttribute("data-value")); // Get gift value
        
//         // Check if the balance is sufficient before showing the animation
//         if (updateBalance(giftValue)) {
//             const animatedGiftImage = document.createElement('img');
//             animatedGiftImage.src = this.querySelector('.gift-img').src; // Get the gift image source
//             animatedGiftImage.classList.add('animated-gift');

//             // Append the image to the body (above the iframe)
//             document.body.appendChild(animatedGiftImage);

//             // Handle animation end and remove image after the animation
//             animatedGiftImage.addEventListener('animationend', () => {
//                 animatedGiftImage.remove();
//             });
//         }
//     });
// });


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




// 

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
        
        if (remainingTime <= 0) {
            clearInterval(timerInterval); // Stop the timer when it reaches 0
            redirectToLogin(); // Redirect to login screen when the timer ends
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
    hideInfoIcon();

 
    // Hide all elements
    // const browserContainer = document.getElementById("browser-container");
    // const chatContainer = document.getElementById("chatContainer");
    // const currencyContainer = document.getElementById("currency-container");
    // const glossaryContainer = document.getElementById("glossary-container");
    // const sideBar = document.getElementById("sidebar");
    // const loginForm = document.getElementById("login");

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
        followSymbol.textContent = '+';  // Change back to "+" if unfollowed
        
    } else {
        followBtn.classList.add('followed');
        followText.textContent = 'Following';
        followSymbol.textContent = '✔';  // Change to checkmark when followed
    }
});

// function showInfoIcon(){
//   infoContainer.style.display = 'flex'; 
// }

// function hideInfoIcon(){
//     infoContainer.style.display = 'none';
// }