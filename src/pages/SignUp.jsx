import React from "react";
import { LoginForm } from "@/components/LoginForm";

const SignUp = () => {
    let loginType = "signup"
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <LoginForm loginType={loginType}/>
            </div>
        </div>
    );
};

export default SignUp;
