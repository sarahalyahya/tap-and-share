// const container = document.querySelector(".file");
// let isDragging = false;
// function onMouseDrag({ movementX, movementY }) {
//     isDragging = true;
//     container.style.cursor = "grabbing";
//     let getContainerStyle = window.getComputedStyle(container);
//     let leftValue = parseInt(getContainerStyle.left);
//     let topValue = parseInt(getContainerStyle.top);
//     container.style.left = `${leftValue + movementX}px`;
//     container.style.top = `${topValue + movementY}px`;
// }
// container.addEventListener("mousedown", () => {
//     container.addEventListener("mousemove", onMouseDrag);
// });
// document.addEventListener("mouseup", () => {
//     container.removeEventListener("mousemove", onMouseDrag);
// });


const container = document.querySelector(".file");

let isDragging = false; // Track dragging state

container.addEventListener("mousedown", (event) => {
    isDragging = true;
    container.style.cursor = "grabbing"; // Change cursor on drag

    let prevX = event.clientX;
    let prevY = event.clientY;

    function onMouseMove(event) {
        if (!isDragging) return;

        let movementX = event.clientX - prevX;
        let movementY = event.clientY - prevY;
        
        let leftValue = parseInt(window.getComputedStyle(container).left);
        let topValue = parseInt(window.getComputedStyle(container).top);

        container.style.left = `${leftValue + movementX}px`;
        container.style.top = `${topValue + movementY}px`;

        prevX = event.clientX;
        prevY = event.clientY;
    }

    function onMouseUp() {
        isDragging = false;
        container.style.cursor = "grab"; // Reset cursor
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
});
