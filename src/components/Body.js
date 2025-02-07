import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Body = () => {
  return (
    <div 
      className="grid grid-flow-col grid-cols-[225px_minmax(900px,_1fr)_100px]" 
      aria-label="Main content layout"
    >
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default memo(Body);
