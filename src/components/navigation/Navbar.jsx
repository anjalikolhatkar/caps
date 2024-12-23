import React from 'react'
import { BsPersonBoundingBox } from 'react-icons/bs';
import DesktopNav from './DesktopNav';

const Navbar = () => {
  return (
    <div className="absolute top-0 left-0 right-0 bg-secondary px-10 py-4 text-white w-full flex gap-1 items-center">
      <h1 className="text-2xl font-bold w-1/4 whitespace-nowrap">Laundry</h1>
      <DesktopNav className="w-1/2" />
      <BsPersonBoundingBox className="text-3xl hidden md:flex profile" />
    </div>
  )
};

export default Navbar;
