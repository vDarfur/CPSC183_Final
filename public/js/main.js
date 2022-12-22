const fileInput = document.querySelector('#image-file');
const canvas = document.querySelector('#canvas');
console.log('canvas');
console.log(canvas);
const ctx = canvas.getContext('2d');

fileInput.addEventListener('change', () => {
  const reader = new FileReader();
  reader.onload = function() {
    const img = new Image();
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      console.log(img.width);
      ctx.drawImage(img, 0, 0);
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(fileInput.files[0]);
});
let isDrawing = false;

canvas.addEventListener('mousedown', (event) => {
  isDrawing = true;
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
});

canvas.addEventListener('mousemove', (event) => {
if (isDrawing) {
// Set the composite operation of the canvas context to "destination-out"
// to clear the pixels from the canvas
  ctx.globalCompositeOperation = "destination-out";
  ctx.lineTo(event.offsetX, event.offsetY);

  ctx.stroke();

  ctx.lineWidth = 50;
  ctx.lineCap = "round";
}
});

canvas.addEventListener('mouseup', () => {
isDrawing = false;
}); 

function onSubmit(e) {
  e.preventDefault();

  document.querySelector('.msg').textContent = '';
  document.querySelector('#image').src = '';

  const prompt = "black middle aged man";
  const size = "middle";

  const origFile = document.getElementById('orig_image');
  var origImage = new Image();
  // origImage.src = origFile.toDataURL(); // genereated url representation for requested img
  // origImage.src = origFile.toDataURL("image/jpeg", 0.5); // genereated url representation for requested img
  origImage.id = "orginal_Image"

  // Get image from canvas

  console.log(canvas);
  const image = new Image();
  image.src = canvas.toDataURL();
  image.id = "image"
  console.log(image.src); 
  if (prompt === '') {
    alert('Please add some text');
    return;
  }
  generateImageRequest(image, size);
}

async function generateImageRequest(image, size) {
  try {
    showSpinner();
    const response = await fetch('/openai/generateimage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        image,
        size: JSON.stringify(size),
      },
    });

    if (!response.ok) {
      removeSpinner();
      console.log(response)
      throw new Error('That image could not be generated');
    }

    const data = await response.json();
    console.log(data);

    const imageUrl = data.data;

    document.querySelector('#image').src = imageUrl;

    removeSpinner();
  } catch (error) {
    document.querySelector('.msg').textContent = error;
  }
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);


