import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import useIssue from '@/hooks/useIssue';
import IssueCard from '@/components/Card/issueCard';
import Button from '@/components/Button';
import { useRouter } from 'next/router';
import DropdownSearchInput from '@/components/Input/DropdownSearchInput';
import { Label } from '@/types/issue';

export default function Mainpage() {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [selectedLabel, setSelectedLabel] = useState<Label>('All');
  const [searchText, setSearchText] = useState<string>('');
  const {
    issueList,
    isNoMoreIssue,
    isError,
    handleChangeIssueLabel,
    handleCloseIssue,
  } = useIssue(page, selectedLabel, searchText);
  const scrollBarRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setPage(1);
    scrollBarRef.current?.scrollTo(0, 0);
  }, [selectedLabel, searchText]);

  const handleScroll = (e: React.UIEvent<HTMLUListElement>) => {
    const element = e.currentTarget;
    const bottom = element.scrollHeight - element.scrollTop === element.clientHeight;
    if (bottom && !isNoMoreIssue) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <Head>
        <title>Github Issue Practice - Issues</title>
      </Head>
      <main className="flex flex-row justify-center w-full mt-4">

        <div className="flex flex-col w-[50vw] gap-y-4">

          <div>
            <Button classNames="w-fit h-10 bg-slate-200" onClick={() => router.push('/issue/newIssue')}>
              add new Issue
            </Button>
          </div>

          <div className="flex flex-row justify-between">
            <DropdownSearchInput
              selectedLabel={selectedLabel}
              setSelectedLabel={setSelectedLabel}
              setSearchText={setSearchText}
            />
          </div>

          {!isError
            ? (
              <ul
                onScroll={handleScroll}
                ref={scrollBarRef}
                className="flex flex-col items-center w-full min-h-[200px] max-h-[65vh] overflow-y-scroll bg-gray-100 py-10"
              >
                {issueList.map((issue) => (
                  <li key={issue.issueId} className="mt-10 first:mt-0 w-[80%]">
                    <IssueCard
                      issue={issue}
                      handleChangeIssueLabel={handleChangeIssueLabel}
                      handleCloseIssue={handleCloseIssue}
                    />
                  </li>
                ))}
              </ul>
            )
            : (
              <div>
                <h1 className="text-4xl">Some error has occured!</h1>
                <span className="text-2xl">please take a screenshot of console, and notice Agry88 at github, Thx!</span>
              </div>
            )}
        </div>
      </main>
    </>
  );
}
