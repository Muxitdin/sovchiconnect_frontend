import { LoginForm } from '@/components/LoginForm';
import React from "react";

const SignIn = () => {
    let loginType = "login";
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <LoginForm loginType={loginType} />
            </div>
        </div>
    );
};

export default SignIn;
