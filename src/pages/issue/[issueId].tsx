import Navbar from '@/components/Navbar';
import TextArea from '@/components/Input/textArea';
import useAccessToken from '@/hooks/useAccessToken';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import TextInput from '@/components/Input/textInput';
import { Issue, type Label } from '@/types/issue';
import LabelGroup from '@/components/Label/LabelGroup';
import fineOneIssue from '@/helpers/findOneIssue';
import LabelComponent from '../../components/Input/InputLabel';

export default function EditIssuePage() {
  const router = useRouter();
  const accessToken = useAccessToken();
  const [issue, setIssue] = useState<Issue>();
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

    if (title === null || comment === null) {
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
    <div className="flex flex-col items-center w-screen min-h-screen">
      <Navbar />
      <div className="w-2/3 max-w-4xl mt-10 min-w-fit h-fit">
        <h1 className="mb-10 text-4xl">Update Issue</h1>
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
              <LabelComponent label="New Issue Title">
                <TextInput id="title" name="title" placeholder={issue.title} required />
              </LabelComponent>
            </div>
            <div className="mb-6">
              <LabelComponent label="New Issue Comment">
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
  );
}
