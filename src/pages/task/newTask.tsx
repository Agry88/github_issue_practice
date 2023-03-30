import Navbar from '@/components/Navbar';
import TextArea from '@/components/Input/textArea';
import useAccessToken from '@/hooks/useAccessToken';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import TextInput from '@/components/Input/textInput';
import type { Tag } from '@/types/issue';
import TagGroup from '@/components/Tag/TagGroup';
import Label from '../../components/Input/Label';

export default function NewTaskPage() {
  const router = useRouter();
  const accessToken = useAccessToken();
  const [selectedTag, setSelectedTag] = useState<Tag>('Open');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title');
    const comment = formData.get('comment');

    const response = await fetch('/api/createIssue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken,
        title,
        comment,
        label: selectedTag,
      }),
    });

    if (response.status === 201) {
      router.push('/task');
    }
  };

  return (
    <div className="flex flex-col items-center w-screen min-h-screen">
      <Navbar />
      <div className="w-2/3 max-w-4xl mt-10 min-w-fit h-fit">
        <h1 className="mb-10 text-4xl">New Task</h1>
        <form className="w-full" onSubmit={handleSubmit}>

          <div className="mb-4">
            <Label label="Tag" />
            <TagGroup selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
          </div>

          <div className="mb-6">
            <Label label="New Task Title">
              <TextInput id="title" name="title" placeholder="New Issue Title" required />
            </Label>
          </div>
          <div className="mb-6">
            <Label label="New Task Comment">
              <TextArea id="comment" name="comment" rows={5} placeholder="New Issue Comment" required />
            </Label>
          </div>

          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
      </div>
    </div>
  );
}