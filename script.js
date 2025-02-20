// Get elements
const uploadInput = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const cropBtn = document.getElementById("crop-btn");
const resizeBtn = document.getElementById("resize-btn");
const filterBtn = document.getElementById("filter-btn");
const ctx = canvas.getContext("2d");

let img = new Image();

// Handle image upload
uploadInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }
});

// Handle image loading
img.onload = () => {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
};

// Crop image (simple rectangular crop)
cropBtn.addEventListener("click", () => {
  const croppedCanvas = document.createElement("canvas");
  const croppedCtx = croppedCanvas.getContext("2d");
  const cropWidth = img.width / 2; // Crop half of the width
  const cropHeight = img.height / 2; // Crop half of the height
  croppedCanvas.width = cropWidth;
  croppedCanvas.height = cropHeight;
  croppedCtx.drawImage(img, 0, 0, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
  ctx.drawImage(croppedCanvas, 0, 0); // Draw cropped image
});

// Resize image (50% resize for demonstration)
resizeBtn.addEventListener("click", () => {
  const resizedWidth = img.width * 0.5;
  const resizedHeight = img.height * 0.5;
  canvas.width = resizedWidth;
  canvas.height = resizedHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, resizedWidth, resizedHeight);
});

// Apply a simple grayscale filter
filterBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
  ctx.filter = "grayscale(100%)";
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  ctx.filter = "none"; // Reset filter for future actions
});
