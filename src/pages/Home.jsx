import { ModeToggle } from '@/components/ModeToggle';
import { Button } from "@/components/ui/button";
import React from "react";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useSelector((state) => state.auth);

    if (isLoggedIn) {
        navigate("/user");
    }

    return (
        <div className="h-full w-full light:bg-primary flex flex-col justify-center items-center gap-6">
            <h1 className="light:text-primary-foreground text-[64px] font-bold">SovchiConnect</h1>
            <p className="text-[#999]">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod labore quasi blanditiis, porro dolor
                mollitia magni adipisci assumenda laboriosam incidunt?
            </p>
            <div className='flex gap-6'>
                <Button> <Link to="/signin">Log In</Link></Button>
                <Button><Link to="/signup">Sign Up</Link></Button>
            </div>
            <ModeToggle/>
        </div>
    );
};

export default Home;
