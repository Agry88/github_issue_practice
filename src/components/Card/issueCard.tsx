import React, { useState } from 'react';
import { Issue, Label } from '@/types/issue';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Card from './index';
import Dropdown from '../Dropdown/Dropdown';

type CardProps = {
  issue: Issue
  classNames?: String
  handleChangeIssueLabel: (issueNumber: number, newLabel: Label) => Promise<void>
  handleCloseIssue: (issueNumber: number) => Promise<void>
};

const dropdownItem: Label[] = [
  'Open',
  'In Progress',
  'Done',
];

export default function IssueCard({
  issue, classNames, handleChangeIssueLabel, handleCloseIssue,
}: CardProps) {
  const [isLabelDropdownShow, setisLabelDropdownShow] = useState<boolean>(false);
  const [isOptionDropdownShow, setIsOptionDropdownShow] = useState<boolean>(false);
  const router = useRouter();

  return (
    <Card classNames={`${classNames ?? ''}w-full h-fit bg-blue-50 transition-all shadow-lg hover:shadow-2xl`}>

      <div className="flex flex-row justify-between w-full h-fit">
        <div className="relative">
          <button
            onClick={() => setisLabelDropdownShow(true)}
            className="w-20 inline-block text-gray-500 hover:text-gray-50 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm p-1.5 min-w-fit whitespace-nowrap"
            type="button"
          >
            {issue.label}
          </button>
          <Dropdown isShow={isLabelDropdownShow} setIsShow={setisLabelDropdownShow}>
            <Dropdown.List>
              {dropdownItem.map((item) => (
                <Dropdown.Item
                  key={item}
                  onClick={() => handleChangeIssueLabel(issue.issueId, item)}
                >
                  {item}
                </Dropdown.Item>
              ))}
            </Dropdown.List>
          </Dropdown>
        </div>

        <div>
          <button onClick={() => setIsOptionDropdownShow(true)} className="inline-block text-gray-500 hover:text-gray-50 hover:bg-gray-300 rounded-lg text-sm p-1.5" type="button">
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" /></svg>
          </button>
          <Dropdown isShow={isOptionDropdownShow} setIsShow={setIsOptionDropdownShow}>
            <Dropdown.List>
              <Dropdown.Item onClick={() => router.push(`/issue/${issue.issueId}`)}>
                Edit
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleCloseIssue(issue.issueId)}>
                Delete
              </Dropdown.Item>
            </Dropdown.List>
          </Dropdown>
        </div>
      </div>

      <div className="w-full h-full">
        <div className="flex flex-row items-center">
          <div className="w-10 h-10 overflow-hidden bg-gray-200 rounded-full">
            <Image src={issue.creatorAvatar} alt={issue.creatorName} width={50} height={50} />
          </div>

          <span className="ml-2 font-sans text-xl font-semibold tracking-normal text-left">
            {issue.title}
          </span>
        </div>

        <div className="w-full h-full">
          <span className="font-sans text-base font-semibold tracking-normal text-left break-all">
            {issue.body.length > 30 ? `${issue.body.substring(0, 30)}...` : issue.body}
          </span>
        </div>
      </div>

    </Card>
  );
}
