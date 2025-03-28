let imgArray = ["gifts/boxingGloves.webp", "gifts/cakeSlice.webp", "gifts/cap.webp", "gifts/doughnut.webp", "gifts/iceCream.webp", "gifts/magicStage.webp", "gifts/rose.webp", "gifts/sausage.webp", "gifts/yacht.webp"];
let numImages = imgArray.length; // Update numImages to match the number of images in imgArray
let imageObjects = [];

function preload() {
  // Load your images into imgArray
  for (let i = 0; i < numImages; i++) {
    imgArray[i] = loadImage(imgArray[i]);  // Replace the file path with the loaded image
  }
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-container');

  // Initialize image objects with the loaded images and add multiple copies of each image
  for (let i = 0; i < numImages; i++) {
    for (let j = 0; j < 8; j++) { // This loop creates 3 copies of each image
      imageObjects.push({
        img: imgArray[i],
        x: random(width),  // Random initial X position
        y: random(height), // Random initial Y position
        speedX: random(-2, 2), // Increased speed in X direction for faster movement
        speedY: random(-2, 2), // Increased speed in Y direction for faster movement
        scale: random(0.3, 0.5)  // Random scaling factor to make the images smaller (between 30% and 50% of original size)
      });
    }
  }
}

function draw() {
background(160, 208, 224,40);
  for (let i = 0; i < imageObjects.length; i++) {
    let imgObj = imageObjects[i];

    // Move the image by its speed
    imgObj.x += imgObj.speedX;
    imgObj.y += imgObj.speedY;

    // Draw the image at its current position with scaling
    image(imgObj.img, imgObj.x, imgObj.y, imgObj.img.width * imgObj.scale, imgObj.img.height * imgObj.scale);

    // Boundary detection to make the image bounce within the canvas
    if (imgObj.x < 0 || imgObj.x > width - imgObj.img.width * imgObj.scale) {
      imgObj.speedX *= -1;  // Reverse the horizontal direction if it hits the left or right boundary
    }

    if (imgObj.y < 0 || imgObj.y > height - imgObj.img.height * imgObj.scale) {
      imgObj.speedY *= -1;  // Reverse the vertical direction if it hits the top or bottom boundary
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
