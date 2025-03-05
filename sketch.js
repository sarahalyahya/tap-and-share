

//here we are selecting all the elements with the selector FILE 
const allFolders = document.querySelectorAll(".file");

const loginForm = document.getElementById("login");
const loginButton = document.getElementById("login-btn");



const sideBar = document.getElementById("sidebar");
const sidebarWidth = parseFloat(getComputedStyle(sidebar).width);
const sideBarHeight = parseFloat(getComputedStyle(sidebar).height);

const openChatBtn = document.getElementById("open-chat-btn");
const chatBox = document.getElementById("chatBox");
const chatContainer = document.getElementById("chatContainer");
const closeChatBtn = document.getElementById("close-chat-btn");
const sendBtn = document.getElementById("sendBtn");

//random for later, will cause errors when it nears zero i think, so lets have it fixed for now
// let coinBalance = Math.floor(Math.random()*51); 

const coinContainer = document.getElementById("coin-container");
let coinBalance = 50;
balanceDisplay = document.getElementById("balance"); 
balanceDisplay.textContent = coinBalance; 

//so theyre not active on login screen
let popupsActive = false; 




allFolders.forEach(folder => {
    //randomize the position of each folder -- REVISIT THIS, might want a more orderly start
    randomizePosition(folder);
    makeDraggable(folder);
});

// in this function, we want to randomize the position of each file object
function randomizePosition(folder){

    //to make it dynamic, there's a folderWidth variable which uses a function - just incase i change the width of the img
    const folderImg = document.querySelector(".folderimg");
    const folderWidth = folderImg.clientWidth; // Get actual image width
    const folderHeight = folderImg.clientHeight;
    const padding = 100;
   
    const minX = sidebarWidth + padding; // Start after the sidebar
    const maxX = window.innerWidth - folderWidth - padding; // Keep within screen width

    const minY = padding; // Prevent going off the top
    const maxY = window.innerHeight - folderHeight - padding; // Prevent going off the bottom

    // Generate random X and Y within the allowed space
    const randomX = Math.random() * (maxX - minX) + minX;
    const randomY = Math.random() * (maxY - minY) + minY;

    //edit style sheet
    folder.style.left = `${randomX}px`;
    folder.style.top = `${randomY}px`;
}



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
    folder.addEventListener("dblclick", () => {
    if(!isDragging && !hasMoved){
        openFolder(folder);
    }
    
    });
}

loginButton.addEventListener("click", makeInvisible); 

function makeInvisible(){
    console.log(sideBar.offsetWidth); 
    loginForm.style.visibility = "hidden";
    sideBar.style.visibility = "visible";
    coinContainer.style.visibility = "visible";

    allFolders.forEach(folder =>{
        folder.style.visibility ="visible";
    })

    if (!popupsActive){
        popupsActive = true; 
        startVidPopup(); 
    }

}; 

function openFolder(){
    //const folderName = folder.querySelector(".file-name").textContent;
    //console.log("clicked!");
    window.location.href = "videos.html"; // Navigate based on folder name
}





//chat pop up
openChatBtn.addEventListener("click", openChat);
closeChatBtn.addEventListener("click", closeChat);
sendBtn.addEventListener("click", sendMessage);

function openChat(){
    chatContainer.style.display = "flex";
    loadMessages();
}

function closeChat(){
    console.log("you're clicking me!");
    chatContainer.style.display = "none"; 
}




async function loadMessages() {
    try {
        //empty when clicking again
        chatBox.innerHTML = ""; 
        //fetching from json and making object array
        const response = await fetch("messages.json");
        const messages = await response.json();
        let i = 0;

        function displayNextMessage() {
            if (i < messages.length) {
                const { username, message } = messages[i];
                addMessage(message, username);
                i++;
                setTimeout(displayNextMessage, 3000); // delay of 3 seconds before the next message
            }
        }

        displayNextMessage(); // Start displaying messages
    } catch (error) {
        console.error("Error loading messages:", error);
    }
}

function addMessage(text, user, isUser = false) {
    //append msgs to document
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    //if it is current user, send as "You" if not send using the username from json
    messageElement.textContent = isUser ? `You: ${text}` : `${user}: ${text}`;
    //to display the new msg on the html file, otherwise it creates a div but never adds
    chatBox.appendChild(messageElement);
    //always scrolling down to the button so most recent text showing
    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
    
    const input = document.getElementById("userInput");
    const text = input.value.trim();
    if (text) {
        addMessage(text, "You", true);
        //remove what someone types
        input.value = "";
    }
}
// pop up videos

//video array goes here (when there's multiple links)

const ytURL = "https://www.youtube.com/embed/SWcIx33hd-Q?"; 

function generateVidPopup(){

    //create pop up element
    const videoPopup = document.createElement("div");
    videoPopup.classList.add("video-popup");

    //choose random vid from array goes here (when there's multiple links)

    //create iframe which goes inside pop up
    const videoIframe = document.createElement("iframe"); 
    videoIframe.src = `${ytURL}?autoplay=1&modestbranding=1&showinfo=0&controls=0`;
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

  videoPopupPosition(videoPopup);  

}

//every 10 seconds rn
function startVidPopup(){
    setInterval(generateVidPopup, 5000); 
}


//randomize
function videoPopupPosition(popup){
    const padding = 20;
    const maxX = window.innerWidth - popup.clientWidth - padding;
    const maxY = window.innerHeight - popup.clientHeight - padding;

    const randomX = Math.random() * (maxX - sidebarWidth) +sidebarWidth; 
    const randomY = Math.random() * maxY; 

    popup.style.left = `${randomX}px`;
    popup.style.top = `${randomY}px`;

}



function updateCoins(amount){
   coinBalance= Math.max(0, coinBalance+amount);
    balanceDisplay.textContent = coinBalance;
    
   
//stylizing an alert will def be better (so make one)
    if (coinBalance == 0){
        alert("You're out of coins!");
    }
}


