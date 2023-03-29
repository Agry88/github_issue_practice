import Navbar from '@/components/Navbar';
import useAccessToken from '@/hooks/useAccessToken';
import { useRouter } from 'next/router';
import React from 'react';

export default function NewTaskPage() {
  const router = useRouter();
  const accessToken = useAccessToken();

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
      }),
    });

    if (response.status === 201) {
      router.push('/task');
    }
  };

  return (
    <div className="flex flex-col items-center w-screen min-h-screen">
      <Navbar />
      <div className="w-2/3 min-w-fit max-w-4xl h-fit mt-10">
        <h1 className="text-4xl mb-10">New Task</h1>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="title" className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">
              New Task Title
              <input type="text" id="title" name="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="New Issue Title" required />
            </label>
          </div>
          <div className="mb-6">
            <label htmlFor="comment" className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">
              New Task Comment
              <textarea id="comment" name="comment" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="New Issue Contents..." required />
            </label>
          </div>

          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
      </div>
    </div>
  );
}
