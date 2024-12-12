import React, { useState } from 'react';
import logo from './../assets/freedom.JPG';
import { Link } from 'react-router-dom';

import {
    LayoutDashboard,
    MapIcon,
    Clock3,
    LogOut,
    Calendar 
} from 'lucide-react';

const navLinks = [
    {
        id: 0,
        path: '/dashboard',
        name: "Dashboard",
        icon: LayoutDashboard,
    },
    {
        id: 1,
        path: '/map',
        name: "Map",
        icon: MapIcon,
    },
    {
        id: 2,
        path: '/Charts',
        name: "Charts",
        icon: Clock3,
    },
    {
        id: 3,
        path: '/Table',
        name: "Table",
        icon: Clock3,
    },

  
    {
        id: 5,
        path: '/logout',
        name: "Logout",
        icon: LogOut,
    },
];

const Navigation = () => {
    const [activeNavIndex, setActiveNavIndex] = useState(0);

    return (
        <>
            <div className='px-10 py-12 flex flex-col border border-r-1  lg:w-[16%] min-h-screen relative'>
                <div className='logo-div flex space-x-3 items-center'>
                    <img src={logo} alt="Logo" />
                </div>

                <div className='mt-10 flex flex-col space-y-8'>
                    {navLinks.map((item) => (
                        <Link
                            key={item.id}
                            to={item.path}
                            className={
                                'flex space-x-3 p-2 rounded' + (activeNavIndex === item.id
                                    ? ' bg-[#9A1D20] text-white font-semibold'
                                    : ""
                                )}
                            onClick={() => setActiveNavIndex(item.id)}
                        >
                            <item.icon />
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Navigation;
