import React, { useState } from 'react';
import Card from './index';

type DropDownProp = {
  isDropdownShow: boolean;
  setisDropdownShow: React.Dispatch<React.SetStateAction<boolean>>;
};

function DropDownList({ isDropdownShow, setisDropdownShow }: DropDownProp) {
  return (
    <div onMouseLeave={() => setisDropdownShow(false)} className={`${isDropdownShow ? 'absolute' : 'hidden'} z-10 text-base list-none bg-white rounded-lg shadow w-44`}>
      <ul className="py-2">
        <li>
          <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Open</span>
        </li>
        <li>
          <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">In process</span>
        </li>
        <li>
          <span className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Closed</span>
        </li>
      </ul>
    </div>
  );
}

type CardProps = {
  classNames?: String
};

export default function IssueCard({ classNames }: CardProps) {
  const [isDropdownShow, setisDropdownShow] = useState<boolean>(false);

  return (
    <Card classNames={`${classNames ?? ''}h-40 bg-blue-50`}>

      <div className="flex flex-row justify-between w-full">
        <div className="bg-gray-200">
          tag here
        </div>

        <div>
          <button onClick={() => setisDropdownShow(true)} className="inline-block text-gray-500 hover:text-gray-50 hover:bg-gray-500 rounded-lg text-sm p-1.5" type="button">
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" /></svg>
          </button>
          <DropDownList isDropdownShow={isDropdownShow} setisDropdownShow={setisDropdownShow} />
        </div>
      </div>

      <div className="w-full h-full">
        <div className="flex flex-row">
          <div>circle</div>
          <span className="ml-2">Title</span>
        </div>

        <div className="w-full h-full">
          <span>body here</span>
        </div>
      </div>

    </Card>
  );
}
