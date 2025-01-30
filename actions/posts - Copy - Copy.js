'use server';
import { redirect } from 'next/navigation';
import { storePost } from '@/lib/posts';
import { uploadImage } from '@/lib/cloudinary';

export async function createPost(prevData, formData) {
  const title = formData.get('title');
  const image = formData.get('image');
  const content = formData.get('content');

  let errors = [];

  if (!title || title.trim().length === 0) {
    errors.push('Title is required.');
  }
  if (!content || content.trim().length === 0) {
    errors.push('Content is required.');
  }
  if (!image || image.size === 0) {
    errors.push('image is required.');
  }
  if (errors.length > 0) {
    return { errors };
  }
  let imageUrl;
  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
console.log('✌️error --->', error);
    throw new Error("Couldn't upload image.");
  }

  await storePost({
    imageUrl,
    title,
    content,
    userId: 1,
  });

  redirect('/feed');
}
