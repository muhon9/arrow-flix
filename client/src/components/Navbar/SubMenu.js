import React, { useState } from 'react';
import { AiFillDashboard } from 'react-icons/ai';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

export default function SubMenu({ item }) {
  const [subnav, setSubnav] = useState(true);
  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <NavLink
        className={(navData) =>
          navData.isActive
            ? 'flex items-center justify-between bg-red-800 w-full px-4 py-2 border-l-4 border-red-800'
            : 'flex items-center justify-between w-full px-4 py-2 border-l-4 border-transparent hover:border-l-4 hover:border-red-800'
        }
        to={`${item.path}`}
        onClick={item.submenu && showSubnav}
      >
        <div className="flex items-center">
          <div className="mr-2">
            <AiFillDashboard />
          </div>
          <div> {item.name}</div>
        </div>
        {item.submenu && (
          <div className="">{subnav ? <FaAngleUp /> : <FaAngleDown />}</div>
        )}
      </NavLink>
      {subnav &&
        item.submenu &&
        item.submenu.map((sub, index) => {
          return (
            <NavLink
              to={`${sub.path}`}
              className={(navData) =>
                navData.isActive
                  ? 'block pl-10 bg-red-800 w-full px-4 py-2 border-l-4 border-red-800'
                  : 'block pl-10 bg-slate-900 w-full px-4 py-2 border-l-4 border-transparent hover:border-l-4 hover:border-red-800'
              }
              key={index}
            >
              {sub.name}
            </NavLink>
          );
        })}
    </>
  );
}
