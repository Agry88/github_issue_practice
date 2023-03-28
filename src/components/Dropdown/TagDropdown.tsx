import React from 'react';
import Dropdown from './Dropdown';

type TagDropdownItem = {
  name: string;
  onClick: () => void;
};

type TagDropdownProp = {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  tagDropdownItems: TagDropdownItem[];
};

export default function TagDropdown({ isShow, setIsShow, tagDropdownItems }: TagDropdownProp) {
  return (
    <Dropdown isShow={isShow} setIsShow={setIsShow}>
      <Dropdown.List>
        {tagDropdownItems.map(({ name, onClick }) => (
          <Dropdown.Item key={name} onClick={onClick}>
            {name}
          </Dropdown.Item>
        ))}
      </Dropdown.List>
    </Dropdown>
  );
}
