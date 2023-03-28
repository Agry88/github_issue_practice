import React from 'react';
import DropDownList from './DropdownList';
import DropDownItem from './DropdownItem';

export type DropDownProp = {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

export default function Dropdown({ isShow, setIsShow, children }: DropDownProp) {
  const setDropClose = () => setIsShow(false);
  return (
    <div onMouseLeave={setDropClose} className={`${isShow ? 'absolute' : 'hidden'} z-10 text-base list-none bg-white rounded-lg shadow w-44`}>
      {children}
    </div>
  );
}

Dropdown.List = DropDownList;
Dropdown.Item = DropDownItem;
