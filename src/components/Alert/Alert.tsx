import { AlertContext, AlertType } from '@/provider/alertProvider';
import React, { useContext } from 'react';

function getTypeColors(type: AlertType): {
  bg: string;
  text: string;
  buttonBg: string;
  buttonHover: string;
  border: string;
} {
  switch (type) {
    case 'success':
      return {
        bg: 'bg-green-50',
        text: 'text-green-800',
        buttonBg: 'bg-green-800',
        buttonHover: 'hover:bg-green-700',
        border: 'border-green-300',
      };
    case 'error':
      return {
        bg: 'bg-red-50',
        text: 'text-red-800',
        buttonBg: 'bg-red-800',
        buttonHover: 'hover:bg-red-700',
        border: 'border-red-300',
      };
    default:
      return {
        bg: 'bg-blue-50',
        text: 'text-blue-800',
        buttonBg: 'bg-blue-800',
        buttonHover: 'hover:bg-blue-700',
        border: 'border-blue-300',
      };
  }
}

export default function Alert() {
  const {
    isShow, message, description, type, hide,
  } = useContext(AlertContext);

  const typeColors = getTypeColors(type);

  return (
    <div
      className={`${typeColors.bg} fixed rounded-lg left-full ${isShow ? '-translate-x-full' : null} transition-all duration-500 bottom-[4%] w-1/3 h-fit flex flex-col z-50 shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] p-4 mb-4 ${typeColors.text} border ${typeColors.border} rounded-lg bg-blue-50`}
    >
      <div className="flex items-center">
        <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
        <span className="sr-only">Info</span>
        <h3 className="text-lg font-medium">
          {message}
        </h3>
      </div>
      <div className="mt-2 mb-4 text-sm">
        {description}
      </div>
      <div className="flex">
        <button
          type="button"
          className={`text-white ${typeColors.buttonBg} ${typeColors.buttonHover} focus:ring-4  font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center `}
          onClick={hide}
        >
          <svg aria-hidden="true" className="-ml-0.5 mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM11.4 10l2.83-2.83-1.41-1.41L10 8.59 7.17 5.76 5.76 7.17 8.59 10l-2.83 2.83 1.41 1.41L10 11.41l2.83 2.83 1.41-1.41L11.41 10z" />
          </svg>
          Close
        </button>
      </div>
    </div>
  );
}
