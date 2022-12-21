  // Messing around with blib creation to shorten URI
// function dataUriToBlob(dataURI) {
//   var byteString = atob(dataURI.split(',')[1]);
//   var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
//   var arrayBuffer = new ArrayBuffer(byteString.length);
//   var _ia = new Uint8Array(arrayBuffer);
//   for (var i = 0; i < byteString.length; i++) {
//       _ia[i] = byteString.charCodeAt(i);
//   }
//   var dataView = new DataView(arrayBuffer);
//   var blob = new Blob([dataView], { type: mimeString });
//   return blob;
// }

// // cross browser cruft
// var get_URL = function () {
//   return window.URL || window.webkitURL || window;
// };

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
  const canvas = document.getElementById('canvas');
  var alteredImage = new Image();
  alteredImage.src = canvas.toDataURL(1); // genereated url representation for requested img, provide num 0..1 for compression when encoding 
  alteredImage.id = "masked_Image"

  // const fs = require('fs');


  // console.log("Orig");
  // console.log(origImage);

  console.log("altered");
  console.log(alteredImage.src);

  // get an URL from the Blob
  // var b = alteredImage.src
  // var blob = dataUriToBlob(b);
  // var url = get_URL().createObjectURL(blob);
  // console.log(url);

  if (prompt === '') {
    alert('Please add some text');
    return;
  }

  // generateImageRequest(origImage.src, alteredImage.src, prompt, size);
  generateImageRequest(alteredImage.src, alteredImage.src, prompt, size);
  // generateImageRequest(origFile, canvas, prompt, size);

}

async function generateImageRequest(origImage, alteredImage,prompt, size) {
  try {
    showSpinner();

    const response = await fetch('/openai/generateimage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        origImage,
        alteredImage,
        prompt,
        size,
      }),
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


