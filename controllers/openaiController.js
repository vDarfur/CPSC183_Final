const { Configuration, OpenAIApi } = require('openai');
var fs = require('fs');

const configuration = new Configuration({
  apiKey: 'API_KEY',
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
  const { image , size } = req.body;
  const buffer = [image];
  buffer.name = "image.jpeg";
  const imageSize =
    size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';

    
  try {
    console.log(buffer);
    const response = await openai.createImageVariation({
      image,
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
