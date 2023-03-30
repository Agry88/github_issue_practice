import React from 'react';
import { Tag } from '@/types/issue';

type Props = {
  selectedTag: Tag;
  setSelectedTag: (tag: Tag) => void;
};

export default function TagGroup({ selectedTag, setSelectedTag }: Props) {
  const tagArray: Tag[] = ['Open', 'In Progress', 'Done'];

  return (
    <div className="w-1/4 max-w-xl mb-4">
      <div className="inline-flex rounded-md shadow-sm" role="group">
        {tagArray.map((name) => (
          <button
            type="button"
            key={name}
            onClick={() => setSelectedTag(name)}
            className={`px-2 py md:px-4 md:py-2 ${selectedTag === name ? 'bg-gray-900 text-white' : 'bg-transparent'} text-xs sm:text-sm font-medium border border-gray-900 first:rounded-l-lg last:rounded-r-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white`}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
