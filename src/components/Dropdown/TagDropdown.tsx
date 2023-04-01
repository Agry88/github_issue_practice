import React from 'react';
import Dropdown from './Dropdown';

type LabelDropdownItem = {
  name: string;
  onClick: () => void;
};

type LabelDropdownProp = {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  labelDropdownItems: LabelDropdownItem[];
};

export default function LabelDropdown({
  isShow, setIsShow, labelDropdownItems,
}: LabelDropdownProp) {
  return (
    <Dropdown isShow={isShow} setIsShow={setIsShow}>
      <Dropdown.List>
        {labelDropdownItems.map(({ name, onClick }) => (
          <Dropdown.Item key={name} onClick={onClick}>
            {name}
          </Dropdown.Item>
        ))}
      </Dropdown.List>
    </Dropdown>
  );
}
