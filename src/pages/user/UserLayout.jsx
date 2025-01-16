import Navbar from '@/components/Navbar';
import React from "react";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
    return (
        <div>
            <Navbar />
            <div className='p-4'>
                <Outlet />
            </div>
        </div>
    );
};

export default UserLayout;
