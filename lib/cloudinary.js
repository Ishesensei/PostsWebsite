import { v2 as cloudinary } from 'cloudinary';

function validateEnvVariable(name) {
  if (!process.env[name]) {
    throw new Error(`${name} is not set`);
  }
}

validateEnvVariable('CLOUDINARY_CLOUD_NAME');
validateEnvVariable('CLOUDINARY_API_KEY');
validateEnvVariable('CLOUDINARY_API_SECRET');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function validateImage(image) {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif'];

  if (!validTypes.includes(image.type)) {
    throw new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.');
  }
}

export async function uploadImage(image) {
  validateImage(image); // Validate before uploading

  try {
    const imageData = await image.arrayBuffer();
    const mime = image.type;
    const encoding = 'base64';
    const base64Data = Buffer.from(imageData).toString('base64');
    const fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;

    console.log('Uploading image:', {
      name: image.name,
      type: image.type,
      size: image.size,
    });

    const result = await cloudinary.uploader.upload(fileUri, {
      folder: 'nextjs-course-IMAGES',
    });

    return result.secure_url; // Or return result for more metadata
  } catch (error) {
    console.error('🎁🎁Error uploading image to Cloudinary:', error);
    throw new Error('Failed to upload image. Please try again.');
  }
}
