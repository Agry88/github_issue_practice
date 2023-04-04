import TextArea from '@/components/Input/textArea';
import useAccessToken from '@/hooks/useAccessToken';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import TextInput from '@/components/Input/textInput';
import { Issue, type Label } from '@/types/issue';
import LabelGroup from '@/components/Label/LabelGroup';
import fineOneIssue from '@/helpers/findOneIssue';
import { AlertContext } from '@/provider/alertProvider';
import Head from 'next/head';
import LabelComponent from '../../components/Input/InputLabel';

export default function EditIssuePage() {
  const router = useRouter();
  const accessToken = useAccessToken();
  const [issue, setIssue] = useState<Issue>();
  const { show } = useContext(AlertContext);
  const { issueId } = router.query;

  useEffect(() => {
    const fetchIssueContent = async () => {
      const issueContent = await fineOneIssue(Number(issueId));
      setIssue(issueContent);
    };
    if (Number.isNaN(Number(issueId)) && issueId !== undefined) {
      router.push('/issue');
      return;
    }
    if (issueId !== undefined) {
      fetchIssueContent();
    }
  }, [issueId, router]);

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

    const response = await fetch('/api/updateIssue', {
      method: 'PATCH',
      body: JSON.stringify({
        accessToken,
        issueId,
        title,
        comment,
        label: issue?.label,
      }),
    });

    if (response.status === 200) {
      router.push('/issue');
    }
  };

  return (
    <>
      <Head>
        <title>Github Issue Practice - UpdateIssue</title>
      </Head>
      <div className="flex flex-col items-center w-screen min-h-screen">
        <div className="w-2/3 max-w-4xl mt-4 min-w-fit h-fit">
          <h1 className="mb-4 text-4xl">Update Issue</h1>
          {issue !== undefined ? (
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="mb-4">
                <LabelComponent label="Label" />
                <LabelGroup
                  selectedLabel={issue.label}
                  setSelectedLabel={(label: Label) => setIssue({ ...issue, label })}
                />
              </div>

              <div className="mb-6">
                <LabelComponent label="New Issue Title" description="Can't be empty">
                  <TextInput id="title" name="title" placeholder={issue.title} required />
                </LabelComponent>
              </div>
              <div className="mb-6">
                <LabelComponent label="New Issue Comment" description="Length Can't less than 30">
                  <TextArea id="comment" name="comment" rows={5} placeholder={issue.body} required />
                </LabelComponent>
              </div>

              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </>
  );
}
