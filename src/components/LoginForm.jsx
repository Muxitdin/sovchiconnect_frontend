import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import service from "@/config/service";
import { Toast } from "@/config/sweetAlert";
import { authFailure, authStart, authSuccess } from "../redux/slice/authSlice.js";
import { setCookie } from "@/config/CookiesService.js";

export function LoginForm({ className, loginType, ...props }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.auth);

    if (isLoggedIn) {
        navigate("/user");
    }

    const [newUser, setNewUser] = useState({
        fullname: "",
        email: "",
        password: "",
    });

    const handleCreateNewUser = async (e) => {
        e.preventDefault();
        try {
            const data = await service.authRegister(newUser);
            console.log(data);
            Toast.fire({
                icon: "success",
                title: data?.message,
            });
            navigate("/verification");
        } catch (error) {
            console.log(error);
            Toast.fire({
                icon: "error",
                title: error.response?.data.message || "Something went wrong..",
            });
        }
    };

    const handleLogInUser = async (e) => {
        e.preventDefault();
        const { fullname, ...others } = newUser;
        dispatch(authStart());
        try {
            const data = await service.authLogin(others);
            console.log(data);
            dispatch(authSuccess({ data: data.data }));
            setCookie("token", data.token, 15);
            Toast.fire({
                icon: "success",
                title: data?.message,
            });
            navigate("/user/dashboard");
            // document.location.reload();
        } catch (error) {
            console.log(error);
            dispatch(authFailure(error));
            Toast.fire({
                icon: "error",
                title: error?.response?.data.message || error.message,
            });
        }
    };

    const getInputValue = (e) => {
        console.log(e.target.value);
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">{loginType === "signup" ? "Sign Up" : "Login"}</CardTitle>
                    <CardDescription>
                        Enter your email below to {loginType === "signup" ? "sign up an" : "login to your"} account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={loginType === "signup" ? handleCreateNewUser : handleLogInUser}>
                        <div className="flex flex-col gap-6">
                            {loginType === "signup" ? (
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Full Name</Label>
                                    <Input
                                        onChange={getInputValue}
                                        name="fullname"
                                        value={newUser.fullname}
                                        id="fullname"
                                        type="text"
                                        placeholder="Marcus Aurelius"
                                        required
                                    />
                                </div>
                            ) : null}
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    onChange={getInputValue}
                                    name="email"
                                    value={newUser.email}
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    {loginType === "signup" ? null : (
                                        <a
                                            href="#"
                                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                        >
                                            Forgot your password?
                                        </a>
                                    )}
                                </div>
                                <Input
                                    onChange={getInputValue}
                                    name="password"
                                    value={newUser.password}
                                    id="password"
                                    type="password"
                                    placeholder="New password"
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                {loginType === "signup" ? "Sign Up" : "Login"}
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            {loginType === "signup" ? "Already have an account? " : "Don't have an account yet? "}

                            {loginType === "signup" ? (
                                <Link to="/signin" className="underline underline-offset-4">
                                    Log In
                                </Link>
                            ) : (
                                <Link to="/signup" className="underline underline-offset-4">
                                    Sign up
                                </Link>
                            )}
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
