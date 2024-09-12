'use client';

import { useFormStatus } from 'react-dom';

export default function FormSubmit() {
  const status = useFormStatus();
  return status.pending ? (
    <p>Creating Posts</p>
  ) : (
    <>
      <button type="reset">Reset</button>
      <button>Create Post</button>
    </>
  );
}
