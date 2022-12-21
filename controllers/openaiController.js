const { Configuration, OpenAIApi } = require('openai');
var fs = require('fs');

const configuration = new Configuration({
  apiKey: 'API_KEY',
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
  // const { prompt, size } = req.body;
  const { origImage, alteredImage, prompt, size } = req.body;
  const imageSize =
    size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';

    
  try {
            // Random Image genaration
    // const response = await openai.createImage({
    //   prompt:"umbrealla",
    //   n: 1,
    //   size: imageSize,
    // });
    // const imageUrl = response.data.data[0].url;

          // Masked image generation
    const response = await openai.createImageEdit({
      
      image:origImage, // uploded image
      mask:alteredImage, // mask
      // image: fs.createReadStream("./images/orig.png"),
      // mask: fs.createReadStream("./images/mask.png"),
      prompt, // prompt
      n: 1,
      size: imageSize,
  });
    const image_url = response.data.data[0].url;
    


    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: 'The image could not be generated',
    });
  }
};

module.exports = { generateImage };
