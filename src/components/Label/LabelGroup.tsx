import React from 'react';
import { Label } from '@/types/issue';

type Props = {
  selectedLabel: Label;
  setSelectedLabel: (label: Label) => void;
};

export default function LabelGroup({ selectedLabel, setSelectedLabel }: Props) {
  const labelArray: Label[] = ['Open', 'In Progress', 'Done'];

  return (
    <div className="w-1/4 max-w-xl mb-4">
      <div className="inline-flex rounded-md shadow-sm" role="group">
        {labelArray.map((label) => (
          <button
            type="button"
            key={label}
            onClick={() => setSelectedLabel(label)}
            className={`px-2 py md:px-4 md:py-2 ${selectedLabel === label ? 'bg-gray-900 text-white' : 'bg-transparent'} text-xs sm:text-sm font-medium border border-gray-900 first:rounded-l-lg last:rounded-r-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
