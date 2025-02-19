// multiple folder draggables
// explanation:

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
    allFolders.forEach(folder =>{
        folder.style.visibility ="visible";
    })
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


// async function loadMessages() {
//     try {
//         const response = await fetch("messages.json");
//         const messages = await response.json();
//         messages.forEach(({ username, message }) => {
//             addMessage(message, username);
//              new Promise(resolve => setTimeout(resolve, 1000)); // Delay of 1 second per message
//         });
//     } catch (error) {
//         console.error("Error loading messages:", error);
//     }
// }

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
                setTimeout(displayNextMessage, 3000); // Delay of 1 second before the next message
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


