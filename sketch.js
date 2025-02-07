// multiple folder draggables
// explanation:

//here we are selecting all the elements with the selector FILE 
const allFolders = document.querySelectorAll(".file");
const loginForm = document.getElementById("login");


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
    //removing folderWidth from the entire window width so we dont end up outside the screen
    const maxX = window.innerWidth - folderWidth - padding;  // Ensure it fits within width and height
    const maxY = window.innerHeight - folderHeight - padding; 

    const randomX = Math.random() * (maxX - padding) + padding;
    const randomY = Math.random() * (maxY - padding) + padding;

    //edit style sheet
    folder.style.left = `${randomX}px`;
    folder.style.top = `${randomY}px`;
}



function makeDraggable(folder){

    let isDragging = false;
    let prevX, prevY;

        //upon clicking the mouse, we know it's dragging, cursor changes, and the x,y coords are updated with the coords of the grab moment
    folder.addEventListener("mousedown", (event) =>{
        isDragging = true;
        folder.style.cursor = "grabbing";
        prevX = event.clientX;
        prevY = event.clientY;

        //keep getting left and top values and tracking movement 
        function onMouseMove(event){
            if (!isDragging) return;
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

function makeInvisible(){
    loginForm.style.visibility = "hidden";
    allFolders.forEach(folder =>{
        folder.style.visibility ="visible";
    })
}; 




