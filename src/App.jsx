import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider } from "./components/ThemeProvider";
import { useDispatch, useSelector } from "react-redux";
import { authStart, authSuccess } from "./redux/slice/authSlice";
import service from "./config/service";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import UserLayout from "./pages/user/UserLayout";
import UserDashboard from "./pages/user/UserDashboard";
import UserProfile from "./pages/user/UserProfile";
import "./App.css";
import Verification from "./pages/Verification";
import { deleteAllCookies, getCookie } from "./config/CookiesService";
import Messenger from './pages/user/Messenger';

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (getCookie("token")) {
            async function getCurrentAuthFunction() {
                dispatch(authStart());
                try {
                    const data = await service.getAuth();
                    dispatch(authSuccess({ data: data.data }));
                } catch (error) {
                    console.log(error);
                    deleteAllCookies();
                    navigate("/signin");
                }
            }
            getCurrentAuthFunction();
        }
    }, []);

    return (
        <div className="h-screen w-screen">
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/verification" element={<Verification />} />

                    <Route path="user" element={<UserLayout />}>
                        <Route path="dashboard" element={<UserDashboard />} />
                        <Route path="profile" element={<UserProfile />} />
                        <Route path="messenger" element={<Messenger />} />
                    </Route>
                </Routes>
            </ThemeProvider>
        </div>
    );
}

export default App;
