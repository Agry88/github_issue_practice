import TextArea from '@/components/Input/textArea';
import useAccessToken from '@/hooks/useAccessToken';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import TextInput from '@/components/Input/textInput';
import type { Label } from '@/types/issue';
import LabelGroup from '@/components/Label/LabelGroup';
import { AlertContext } from '@/provider/alertProvider';
import Head from 'next/head';
import LabelComponent from '../../components/Input/InputLabel';

export default function NewIssuePage() {
  const router = useRouter();
  const accessToken = useAccessToken();
  const [selectedLabel, setSelectedLabel] = useState<Label>('Open');
  const { show } = useContext(AlertContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title');
    const comment = formData.get('comment');

    if (!title || !comment) {
      show('Error', 'Please fill in all the fields', 'error');
      return;
    }

    if (comment.length < 30) {
      show('Error', 'Comment must be at least 30 characters', 'error');
      return;
    }

    const response = await fetch('/api/createIssue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken,
        title,
        comment,
        label: selectedLabel,
      }),
    });

    if (response.status === 201) {
      router.push('/issue');
    }
  };

  return (
    <>
      <Head>
        <title>Github Issue Practice - NewIssue</title>
      </Head>
      <div className="flex flex-col items-center w-screen min-h-screen">
        <div className="w-2/3 max-w-4xl mt-10 min-w-fit h-fit">
          <h1 className="mb-10 text-4xl">New Issue</h1>
          <form className="w-full" onSubmit={handleSubmit}>

            <div className="mb-4">
              <LabelComponent label="Label" />
              <LabelGroup selectedLabel={selectedLabel} setSelectedLabel={setSelectedLabel} />
            </div>

            <div className="mb-6">
              <LabelComponent label="New Issue Title" description="Can't be empty">
                <TextInput id="title" name="title" placeholder="New Issue Title" required />
              </LabelComponent>
            </div>
            <div className="mb-6">
              <LabelComponent label="New Issue Comment" description="Length Can't less than 30">
                <TextArea id="comment" name="comment" rows={5} placeholder="New Issue Comment" required />
              </LabelComponent>
            </div>

            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
